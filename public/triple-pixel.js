/* ============================================================================
 * Triple Whale · TriplePixel fuer die Persona-Landing-Pages
 * ----------------------------------------------------------------------------
 * WOHER: Triple Whale hostet den Pixel nicht oeffentlich. Auf femipure.de wird
 * er als inline Snippet aus dem Shopify-App-Block "triple_pixel_snippet"
 * ausgeliefert (bewusst obfuskiert, Endpunkte getarnt als
 * api.config-security.com). Es gibt keine Script-URL, die man einbinden
 * koennte - deshalb liegt der Loader hier als Datei.
 *
 * Der Loader selbst ist plattform-unabhaengig: er liest alles aus
 * window.TriplePixelData. Nur dieses Objekt ist unten angepasst.
 *
 * TripleName  = die myshopify-Domain, ueber die Triple Whale den Shop kennt.
 *               Verifiziert am 2026-07-21 aus window.TriplePixelData auf
 *               femipure.de.
 * isHeadless  = true, weil dies NICHT der Shopify-Storefront ist.
 * plat        = bleibt SHOPIFY: das Backend ist Shopify, TW ordnet die Events
 *               diesem Shop zu. Ein abweichender Wert riskiert, dass die
 *               Events verworfen werden.
 *
 * PFLEGE: Bei einem TW-Versionssprung (ver) kann dieser Loader veralten.
 * Dann neu aus dem Quelltext von femipure.de ziehen - der Block steht dort
 * zwischen den Markern "TriplePixel :: start" und "TriplePixel :: end".
 * ========================================================================= */

window.TriplePixelData = {
  TripleName: "071zuf-tj.myshopify.com",
  ver: "2.16",
  plat: "SHOPIFY",
  isHeadless: true,
  src: "LANDING_PAGE",
  product: { id: "", name: "", price: "", variant: "", av: {} },
  search: "",
  collection: "",
  cart: "",
  template: "landing",
  curr: "EUR"
},
function(W,H,A,L,E,_,B,N){function O(U,T,P,H,R){void 0===R&&(R=!1),H=new XMLHttpRequest,P?(H.open("POST",U,!0),H.setRequestHeader("Content-Type","text/plain")):H.open("GET",U,!0),H.send(JSON.stringify(P||{})),H.onreadystatechange=function(){4===H.readyState&&200===H.status?(R=H.responseText,U.includes("/first")?eval(R):P||(N[B]=R)):(299<H.status||H.status<200)&&T&&!R&&(R=!0,O(U,T-1,P))}}if(N=window,!N[H+"sn"]){N[H+"sn"]=1,L=function(){return Date.now().toString(36)+"_"+Math.random().toString(36)};try{A.setItem(H,1+(0|A.getItem(H)||0)),(E=JSON.parse(A.getItem(H+"U")||"[]")).push({u:location.href,r:document.referrer,t:Date.now(),id:L()}),A.setItem(H+"U",JSON.stringify(E))}catch(e){}var i,m,p;A.getItem('"!nC`')||(_=A,A=N,A[H]||(E=A[H]=function(t,e,i){return void 0===i&&(i=[]),"State"==t?E.s:(W=L(),(E._q=E._q||[]).push([W,t,e].concat(i)),W)},E.s="Installed",E._q=[],E.ch=W,B="configSecurityConfModel",N[B]=1,O("https://conf.config-security.com/model",5),i=L(),m=A[atob("c2NyZWVu")],_.setItem("di_pmt_wt",i),p={id:i,action:"profile",avatar:_.getItem("auth-security_rand_salt_"),time:m[atob("d2lkdGg=")]+":"+m[atob("aGVpZ2h0")],host:A.TriplePixelData.TripleName,plat:A.TriplePixelData.plat,url:window.location.href.slice(0,500),ref:document.referrer,ver:A.TriplePixelData.ver},O("https://api.config-security.com/event",5,p),O("https://api.config-security.com/first?host=".concat(p.host,"&plat=").concat(p.plat),5)))}}("","TriplePixel",localStorage);