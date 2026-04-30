"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // In a real deploy, send the form data to an API route or service here.
    router.push("/kontakt/danke");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field full">
        <label htmlFor="name">Vor- und Nachname</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="email">E-Mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field">
        <label htmlFor="company">Unternehmen / Magazin</label>
        <input id="company" name="company" type="text" autoComplete="organization" />
      </div>

      <div className="field full">
        <label htmlFor="message">Nachricht</label>
        <textarea id="message" name="message" rows={6} required />
      </div>

      <div className="actions">
        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? "Wird gesendet …" : "Anfrage absenden"}
        </button>
      </div>
    </form>
  );
}
