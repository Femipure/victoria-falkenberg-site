import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontakt — Dr. med. Victoria Falkenberg",
  description:
    "Kontaktanfragen für Magazine, Interviews und fachliche Stellungnahmen rund um Frauengesundheit.",
};

export default function KontaktPage() {
  return (
    <>
      <header className="nav" role="banner">
        <div className="nav-inner">
          <Link href="/" className="wordmark" aria-label="Dr. Victoria Falkenberg — Startseite">
            Victoria Falkenberg
          </Link>
          <Link href="/" className="btn-primary">Startseite</Link>
        </div>
      </header>

      <section className="header-band" aria-labelledby="kontakt-h1">
        <div className="inner">
          <h1 id="kontakt-h1">Zusammenarbeit</h1>
          <p>
            Du möchtest mich als medizinische Expertin für ein Magazin, ein Interview oder eine
            fachliche Stellungnahme gewinnen? Melde dich gerne!
          </p>
        </div>
      </section>

      <section className="form-section">
        <div className="form-card">
          <h2>Reiche Deine Anfrage ein</h2>
          <p className="lede">
            Ich prüfe deine Anfrage sorgfältig und melde mich ehestmöglich bei dir.
          </p>
          <ContactForm />
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
