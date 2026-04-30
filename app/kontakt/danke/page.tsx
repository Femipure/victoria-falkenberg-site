import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke für deine Kontaktanfrage — Dr. med. Victoria Falkenberg",
  description: "Vielen Dank für deine Nachricht — ich melde mich ehestmöglich bei dir.",
};

export default function DankePage() {
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

      <main className="thanks" aria-labelledby="danke-h1">
        <div className="thanks-inner">
          <h1 id="danke-h1">Danke für deine Kontaktanfrage</h1>
          <div
            className="thanks-image"
            role="img"
            aria-label="Dr. Falkenberg prüft Unterlagen"
          >
            <img src="/images/danke.png" alt="" />
          </div>
          <p className="thanks-sub">
            Ich prüfe deine Anfrage und melde mich ehestmöglich bei dir.
          </p>
          <div className="thanks-actions">
            <Link href="/" className="btn-ghost">Zurück zur Startseite</Link>
          </div>
        </div>
      </main>

      <footer>
        <Link href="/" className="wordmark">Victoria Falkenberg</Link>
        <p className="copy">© 2026 Dr. med. Victoria Falkenberg</p>
        <p className="credit">Homepage Umsetzung — Web by Markus Gauer</p>
      </footer>
    </>
  );
}
