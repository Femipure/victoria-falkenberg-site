# Dr. med. Victoria Falkenberg — Next.js Site

Statische Marketing-Site mit App Router (Next.js 14, React 18, TypeScript).
Routen:

| Pfad             | Datei                          |
| ---------------- | ------------------------------ |
| `/`              | `app/page.tsx`                 |
| `/kontakt`       | `app/kontakt/page.tsx`         |
| `/kontakt/danke` | `app/kontakt/danke/page.tsx`   |

## Lokale Entwicklung

```bash
npm install
npm run dev          # http://localhost:3000
```

## Produktion

```bash
npm run build
npm start
```

`npm install` und `npm run build` müssen ohne Fehler durchlaufen, bevor du auf
GitHub pushst.

## Deployment auf Vercel (manueller Workflow)

1. Lege auf GitHub ein leeres Repository an (z. B. `victoria-falkenberg`).
2. Lade alle Dateien aus diesem Ordner ins Repo (Drag & Drop im GitHub-UI
   oder per `git`).
3. Öffne <https://vercel.com/new> → **Import Git Repository** → wähle das Repo.
4. Vercel erkennt Next.js automatisch — alle Default-Werte stehen lassen
   (Build: `next build`, Output: `.next`).
5. **Deploy** klicken. Nach 1–2 Minuten ist die Seite live.

Eine `vercel.json` ist nicht nötig — Next.js wird von Vercel nativ erkannt.

## Kontaktformular

Das Formular leitet aktuell rein clientseitig auf `/kontakt/danke` weiter
(Prototyp). Für produktiven Versand:

- Eine API-Route unter `app/api/contact/route.ts` anlegen (POST), oder
- einen Drittanbieter wie Resend / Formspree / Vercel Forms anbinden.

## Dateien zum Hochladen auf GitHub

```
.gitignore
README.md
package.json
tsconfig.json
next.config.js
next-env.d.ts
app/globals.css
app/layout.tsx
app/page.tsx
app/kontakt/page.tsx
app/kontakt/ContactForm.tsx
app/kontakt/danke/page.tsx
```

**Nicht** hochladen: `node_modules/`, `.next/`, `.vercel/` — diese werden
durch `.gitignore` ausgeschlossen.
