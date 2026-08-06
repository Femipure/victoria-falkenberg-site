/* ============================================================================
 * femiPure · Cross-Domain Attribution + Pixel Loader
 * ----------------------------------------------------------------------------
 * EIN File für ALLE Persona-Domains (victoriafalkenberg.de, isabellahenning.de,
 * frauen-gesundheits-check.de …) und ALLE Landing Pages darauf.
 *
 * Einbinden mit genau einer Zeile im <head> jeder Seite:
 *     <script src="/tracking.js" data-lp="vf-tausende-frauen" data-page="FK"></script>
 *
 * Zwei Ebenen, bewusst getrennt:
 *   EBENE 1 (läuft IMMER, ohne Consent) — Parameter aus der URL lesen und beim
 *           Klick an femipure.de-Links anhängen. Setzt KEINE Cookies, schreibt
 *           per Default nichts in Storage. Reiner Transport.
 *   EBENE 2 (läuft NUR nach Consent) — Meta-Pixel + TriplePixel laden.
 *           Aufruf durch das Consent-Banner:  window.fpTracking.grantConsent()
 *
 * Deshalb funktioniert die Attribution auch, wenn der User Cookies ablehnt.
 * ========================================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- CONFIG */
  var CONFIG = {
    /* PIXEL-SCHALTER · AN seit 2026-07-21 (Entscheidung des Betreibers).
       false stellt die Pixel sofort wieder ab: grantConsent() wird dann
       wirkungslos, auch wenn ein Banner es ruft. EBENE 1 (Parameter-Weitergabe)
       laeuft unabhaengig davon weiter und braucht keine Cookies. */
    PIXELS_ENABLED: true,

    /* AUTO_GRANT laedt die Pixel sofort beim Seitenaufruf, ohne auf eine
       Einwilligung zu warten. Noetig, weil auf diesen Domains noch kein
       Consent-Banner existiert, das grantConsent() rufen koennte.

       ACHTUNG – das ist der rechtlich heikle Teil, bewusst als eigener
       Schalter, damit er auffaellt und einzeln zurueckgedreht werden kann:
       Es werden Marketing-Cookies ohne Einwilligung gesetzt, und die
       Datenschutzerklaerung nennt die Dienste noch nicht.
       Sobald ein Banner steht: hier auf false, und das Banner ruft
       window.fpTracking.grantConsent() im Zustimmungs-Callback. */
    AUTO_GRANT: true,

    META_PIXEL_ID: '996794228712538',    // femipure.de Shop-Pixel — bewusst dasselbe

    /* Triple Whale identifiziert den Shop ueber die myshopify-Domain. Verifiziert
       am 2026-07-21 aus window.TriplePixelData auf femipure.de (TripleName). */
    TRIPLE_PIXEL_TOKEN: '071zuf-tj.myshopify.com',
    SHOP_HOST_RE: /(^|\.)femipure\.de$/i,
    USE_SESSION_STORAGE: true,           // false = rein in-memory (0 Storage, 0 Consent-Frage)
    STORAGE_KEY: 'fp_attr_v1',
    DEBUG: /[?&]fp_debug=1/.test(location.search)
  };

  /* Triple Whale leitet die Kampagne/Ad-Set/Ad-Hierarchie aus den UTM-Parametern
     der Session ab (nicht primaer aus dem fbclid). Fehlt beim Domain-Sprung auch
     nur eine Ebene, kann TW die Order nicht ins Ad-Set einsortieren -> sie landet
     als lose Zeile / (not set). Deshalb reichen wir NICHT mehr nur eine feste
     Liste durch, sondern JEDEN eingehenden Query-Parameter (ausser den internen
     unten) - so kommt der komplette Meta-Query-String lueckenlos an femipure.de
     an, inkl. Ebenen, die wir nicht namentlich kennen. */
  var BLOCK = ['fp_debug', 'fp_lp', 'fp_page'];   // intern bzw. seiten-spezifisch behandelt

  /* ----------------------------------------------------------------- UTILS */
  function log() {
    if (CONFIG.DEBUG && window.console) console.log.apply(console, ['[fp-tracking]'].concat([].slice.call(arguments)));
  }

  function readCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  /* Wo dieses Script eingebunden wurde – liefert data-lp / data-page */
  function scriptAttrs() {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (/tracking\.js/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    return {
      lp: s && s.getAttribute('data-lp') || null,
      page: s && s.getAttribute('data-page') || null
    };
  }

  /* --------------------------------------------------- EBENE 1: PARAM-STORE */
  var store = {};

  function loadStore() {
    if (!CONFIG.USE_SESSION_STORAGE) return {};
    try { return JSON.parse(sessionStorage.getItem(CONFIG.STORAGE_KEY) || '{}'); }
    catch (e) { return {}; }
  }

  function saveStore() {
    if (!CONFIG.USE_SESSION_STORAGE) return;
    try { sessionStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  /* Ein '#' im Kampagnennamen (z.B. utm_campaign=FK_#NK6) ist fuer den Browser
     das Fragment-Zeichen: alles ab dem '#' – inklusive fbclid und utm_content –
     faellt in location.hash statt in location.search und ist damit fuer die
     Attribution verloren. Symptom in Triple Whale: (not set) plus Sales, die der
     falschen Ad zugeschlagen werden, weil alle #-Kampagnen zu 'FK_' kollabieren.

     Diese Funktion setzt den zerbrochenen Query-String wieder zusammen. Sie
     greift NUR, wenn der Hash wie abgeschnittene Attribution-Parameter aussieht
     (enthaelt fbclid/gclid/ttclid/utm_/tw_) – ein echter Sprungmarken-Anker wie
     #product-card bleibt unangetastet. Im heilen Fall (kein Fragment) ist sie
     ein No-Op. Mehrere '#' werden korrekt behandelt, weil sie beim
     Wieder-Zusammensetzen zu Literalen im Parameter-Wert werden. */
  function recoveredParams() {
    var hash = location.hash;
    if (hash.length > 1 &&
        /(?:^|&)(fbclid|gclid|ttclid|utm_[a-z]+|tw_[a-z]+)=/.test(hash.slice(1))) {
      var rebuilt = location.search.slice(1) + '#' + hash.slice(1);
      log('URL am # zerbrochen – rekonstruiere:', rebuilt);
      return new URLSearchParams(rebuilt);
    }
    return new URLSearchParams(location.search);
  }

  function captureParams() {
    store = loadStore();

    var qs = recoveredParams();
    qs.forEach(function (v, k) {     // JEDEN Param uebernehmen (letzter Klick gewinnt)
      if (v && BLOCK.indexOf(k) === -1) store[k] = v;
    });

    /* fp_lp / fp_page beschreiben, auf WELCHER Seite der User gerade ist –
       nicht, woher der Klick kam. Sie duerfen deshalb NIE aus der Session
       geerbt werden: sonst traegt ein Wechsel von Advertorial A nach B immer
       noch A's Kennung, und der Verkauf wird der falschen LP gutgeschrieben.
       Reihenfolge: URL-Param dieser Seite > data-Attribut dieser Seite. */
    var attrs = scriptAttrs();
    var urlLp = qs.get('fp_lp'), urlPage = qs.get('fp_page');
    if (urlLp || attrs.lp) store.fp_lp = urlLp || attrs.lp;
    if (urlPage || attrs.page) store.fp_page = urlPage || attrs.page;

    saveStore();
    log('captured', store);
  }

  /* ------------------------------------------- EBENE 1: LINK-DEKORATION ⭐ */
  /* Das Herzstück. Hängt beim Klick alle Params an jeden femipure.de-Link.
     Läuft in der Capture-Phase, damit wir vor jedem anderen Handler dran sind. */
  function decorate(a) {
    var dest;
    try { dest = new URL(a.href, location.href); } catch (e) { return null; }
    if (!CONFIG.SHOP_HOST_RE.test(dest.hostname)) return null;

    Object.keys(store).forEach(function (k) {
      if (!dest.searchParams.has(k)) dest.searchParams.set(k, store[k]);
    });

    /* Meta-Cookies dieser Domain als Rohwerte mitgeben.
       Wichtig als Fallback: falls der fbclid fehlt (z. B. zweiter Besuch),
       kann femipure.de daraus trotzdem die Klick-Identität rekonstruieren. */
    var fbc = readCookie('_fbc'), fbp = readCookie('_fbp');
    if (fbc && !dest.searchParams.has('fbc')) dest.searchParams.set('fbc', fbc);
    if (fbp && !dest.searchParams.has('fbp')) dest.searchParams.set('fbp', fbp);

    a.href = dest.toString();
    return dest;
  }

  function onClick(e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var dest = decorate(a);
    if (!dest) return;

    log('decorated ->', dest.toString());
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'LP_CTA_Click', {
        lp: store.fp_lp || null,
        page: store.fp_page || null,
        dest: dest.pathname
      });
    }
  }

  /* Zusätzlich: bereits im DOM stehende Links direkt dekorieren.
     Fängt Fälle ab, in denen der Browser den Klick nicht über uns routet
     (Mittelklick, "Link in neuem Tab öffnen", Rechtsklick → Adresse kopieren). */
  function decorateAllNow() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) decorate(links[i]);
    log('pre-decorated', links.length, 'links');
  }

  /* ------------------------------------------------ EBENE 2: PIXEL (Consent) */
  var pixelsLoaded = false;

  function loadMetaPixel() {
    if (!CONFIG.META_PIXEL_ID) return;
    /* Offizieller Meta base code */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', CONFIG.META_PIXEL_ID);
    window.fbq('track', 'PageView');
    log('meta pixel init', CONFIG.META_PIXEL_ID);
  }

  /* TriplePixel auf der Landing Page ABGESCHALTET (2026-07-26). WARUM:
     Triple Whale identifiziert Besucher ueber eine ID im localStorage – und
     localStorage ist pro Domain getrennt. Gemessen am 2026-07-26:
        victoriafalkenberg.de -> tw-id ms1l36az_0.l02er3ufuu
        femipure.de           -> tw-id ms1l3njf_0.n1p0h9hiibk  (voellig andere)
     Der LP-Pixel meldet also eine Session mit einer ID, die es auf femipure.de
     nicht gibt. Beim Klick in den Shop bekommt derselbe Besucher dort eine neue
     ID. Triple Whale sieht zwei unverbundene Besucher und kann die LP-Session
     (mit der Ad-Info) nicht mit der Shop-Session (mit der Order) verketten ->
     die Order landet in (not set). TW's Cross-Domain-Verkettung braucht eine
     Klick-ID in der URL, die nur das offizielle headless-Snippet mitgibt; unser
     nachgebauter Loader kann das prinzipiell nicht.

     Die Order-Attribution laeuft ohne diesen Pixel sauber: der native
     TriplePixel auf femipure.de liest die durchgereichten utm/fbclid aus der
     Shop-URL (der Fragment-Fix sorgt fuer einen intakten fbclid). DAS ist der
     korrekte Weg fuer Advertorial-Funnels.

     Wieder-Aktivieren nur mit dem offiziellen TW-Snippet fuer eigene/headless
     Domains (Settings -> Pixel) statt unserem Nachbau. */
  function loadTriplePixel() {
    log('TriplePixel auf LP bewusst deaktiviert – Attribution laeuft ueber den Shop-Pixel');
  }

  /* Scroll-Tiefe als Engagement-Signal – nur wenn Pixel geladen ist.
     ACHTUNG: manche Advertorials brechen auf Shopify per Vollbild-Overlay aus
     dem Theme aus (position:fixed; inset:0; overflow-y:auto). Dann scrollt NICHT
     das Fenster, sondern dieser Container – ein window-Listener feuert dort nie.
     Deshalb wird der echte Scroll-Container gesucht. */
  function scrollContainer() {
    var els = document.querySelectorAll('body > div, body > main');
    for (var i = 0; i < els.length; i++) {
      var cs = getComputedStyle(els[i]);
      if (cs.position === 'fixed' &&
          (cs.overflowY === 'auto' || cs.overflowY === 'scroll') &&
          els[i].scrollHeight > els[i].clientHeight + 50) {
        return els[i];
      }
    }
    return null;
  }

  function trackScrollDepth() {
    var fired = {};
    var box = scrollContainer();
    var target = box || window;
    log('scroll-container:', box ? '#' + box.id : 'window');

    function check() {
      var pct = box
        ? (box.scrollTop + box.clientHeight) / box.scrollHeight * 100
        : (document.documentElement.scrollTop + window.innerHeight) /
          document.documentElement.scrollHeight * 100;

      [50, 75].forEach(function (mark) {
        if (pct >= mark && !fired[mark]) {
          fired[mark] = true;
          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'LP_Scroll_' + mark, { lp: store.fp_lp || null });
          }
        }
      });
      if (fired[50] && fired[75]) target.removeEventListener('scroll', check);
    }
    target.addEventListener('scroll', check, { passive: true });
  }

  function grantConsent() {
    if (!CONFIG.PIXELS_ENABLED) {
      log('grantConsent ignoriert – PIXELS_ENABLED ist false');
      return;
    }
    if (pixelsLoaded) return;
    pixelsLoaded = true;
    loadMetaPixel();
    loadTriplePixel();
    trackScrollDepth();
  }

  /* -------------------------------------------------------------- BOOTSTRAP */
  captureParams();

  document.addEventListener('click', onClick, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decorateAllNow);
  } else {
    decorateAllNow();
  }
  /* Nachladende Inhalte (React-Rerender, Lazy-Sections) erneut abdecken */
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { decorateAllNow(); });
    document.addEventListener('DOMContentLoaded', function () {
      mo.observe(document.body, { childList: true, subtree: true });
    });
  }

  /* Öffentliche API – das Consent-Banner ruft grantConsent() auf */
  window.fpTracking = {
    grantConsent: grantConsent,
    getParams: function () { return JSON.parse(JSON.stringify(store)); },
    decorateAll: decorateAllNow,
    config: CONFIG
  };

  /* Ohne Consent-Banner ruft niemand grantConsent() – deshalb hier direkt,
     wenn AUTO_GRANT gesetzt ist. Sobald ein Banner steht: AUTO_GRANT auf false
     und im Zustimmungs-Callback des Banners aufrufen:
         window.fpTracking.grantConsent();                                    */
  if (CONFIG.AUTO_GRANT) grantConsent();
})();
