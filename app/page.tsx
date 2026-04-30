import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="nav" role="banner">
        <div className="nav-inner">
          <Link href="/" className="wordmark" aria-label="Dr. Victoria Falkenberg — Startseite">
            Victoria Falkenberg
          </Link>
          <Link href="/kontakt" className="btn-primary">Kontakt</Link>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-h1">
        <div className="hero-inner">
          <div className="hero-text">
            <p className="eyebrow">
              Fachärztin für Gynäkologie &amp; Geburtshilfe, Expertin für Frauengesundheit
            </p>
            <h1 id="hero-h1" className="hero-name">Dr. med. Victoria Falkenberg</h1>
            <p className="hero-intro">
              Hallo und herzlich Willkommen auf meiner Homepage! Mein Name ist Victoria Falkenberg und
              ich bin Fachärztin für Gynäkologie und Geburtshilfe in Süddeutschland. Seit über 26 Jahren
              begleite ich Frauen durch alle Phasen ihres Lebens — von der ersten Vorsorge bis zur
              Wechseljahresberatung — und engagiere mich darüber hinaus in der Aufklärung rund um
              Frauengesundheit.
            </p>
            <a href="#ueber-mich" className="btn-light">Über Mich</a>

            <div className="socials" aria-label="Soziale Netzwerke">
              <a
                href="https://www.instagram.com/dr_victoria_falkenberg/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61571015507247"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-portrait" role="img" aria-label="Portrait Dr. Victoria Falkenberg">
            <div className="ph">Portrait · Platzhalter</div>
          </div>
        </div>
      </section>

      <section className="section" id="ueber-mich" aria-labelledby="b1-h2">
        <div className="row">
          <div className="row-image tone-sand ratio-16-9" role="img" aria-label="Praxis-Setting (Platzhalter)">
            <div className="ph-label">Praxis · Platzhalter</div>
          </div>
          <div className="row-text">
            <h2 id="b1-h2">Ärztin aus Überzeugung</h2>
            <p>
              Neben meiner täglichen Arbeit in der Praxis liegt mir die fachliche Aufklärung zum Thema
              Frauengesundheit besonders am Herzen. Als Mutter und Ärztin weiß ich, wie viele Frauen mit
              Beschwerden zu mir kommen, über die zu Hause selten gesprochen wird: Themen rund um die
              Intimgesundheit, den Zyklus, hormonelle Veränderungen oder die Wechseljahre.
            </p>
            <p>
              Schon früh in meiner Laufbahn habe ich beobachtet, wie viele Patientinnen über Jahre mit
              denselben Beschwerden zu mir kommen — wiederkehrende Infektionen, ein gestörtes
              Wohlbefinden im Intimbereich, Beschwerden, für die es im Praxisalltag selten eine schnelle
              Antwort gibt. Diese Erfahrung hat meine Schwerpunkte geprägt.
            </p>
            <p>
              Mich interessiert besonders die Schnittstelle zwischen klassischer Schulmedizin und einer
              ganzheitlichen Sicht auf den weiblichen Körper → ein Bereich, in dem in den letzten Jahren
              viel Bewegung entstanden ist und in dem fundierte, seriöse Information leider nach wie vor
              Mangelware ist.
            </p>
          </div>
        </div>
      </section>

      <section className="section warm" aria-labelledby="b2-h2">
        <div className="pull">
          <h2 id="b2-h2">Warum Frauengesundheit?</h2>
          <p>
            Weil dieser Bereich so vielschichtig ist und sich stetig weiterentwickelt — neue Studien,
            neue Erkenntnisse, neue Behandlungsansätze. Und gleichzeitig Themen, über die noch immer
            zu wenig offen gesprochen wird. Genau das motiviert mich jeden Tag.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="b3-h2">
        <div className="row reverse">
          <div className="row-image tone-sage" role="img" aria-label="Aufklärungsarbeit (Platzhalter)">
            <div className="ph-label">Editorial · Platzhalter</div>
          </div>
          <div className="row-text">
            <h2 id="b3-h2">Aufklärung als Herzensthema</h2>
            <p>
              Neben meiner Arbeit in der Praxis begleite ich seit einigen Jahren auch redaktionelle
              Projekte und gebe meine Expertise in Form von Fachbeiträgen, Interviews und
              Stellungnahmen weiter. Ein Schwerpunkt ist mir dabei besonders wichtig: die Aufklärung
              rund um Intimgesundheit und das vaginale Mikrobiom — Themen, über die viele Frauen nicht
              offen sprechen, obwohl sie das tägliche Wohlbefinden massiv prägen können.
            </p>
            <p>
              Wiederkehrende Infektionen, eine aus dem Gleichgewicht geratene Scheidenflora, Beschwerden
              im Intimbereich: All das gehört zu den häufigsten Gründen, weshalb Frauen meine Praxis
              aufsuchen.
            </p>
            <p className="q">Wo sehe ich meine Verantwortung als Ärztin?</p>
            <p>
              Genauso zentral ist für mich die fachliche Einordnung moderner Ansätze zur Unterstützung
              der Vaginalflora. Der Markt ist groß, viele Versprechen halten einer wissenschaftlichen
              Prüfung nicht stand → hier sehe ich mich in der Verantwortung. Ich prüfe Inhaltsstoffe,
              sichte die aktuelle Studienlage rund um Probiotika, Laktobazillen und Mikrobiom-Forschung
              und ordne sie ein, damit du als Frau eine informierte Entscheidung für deine Gesundheit
              treffen kannst.
            </p>
          </div>
        </div>
      </section>

      <section className="cta" id="kontakt-cta" aria-labelledby="cta-h2">
        <div className="cta-inner">
          <h2 id="cta-h2">Zusammenarbeit</h2>
          <p>
            Du möchtest mich als medizinische Expertin für ein Magazin, eine Stellungnahme oder ein
            Interview gewinnen? Melde dich gerne!
          </p>
          <Link href="/kontakt" className="btn-light">Kontakt</Link>
        </div>
      </section>

      <footer>
        <Link href="/" className="wordmark">Victoria Falkenberg</Link>
        <p className="copy">© 2026 Dr. med. Victoria Falkenberg</p>
        <p className="credit">Homepage Umsetzung — Web by Markus Gauer</p>
      </footer>
    </>
  );
}
