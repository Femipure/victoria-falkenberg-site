/** @type {import('next').NextConfig} */

/* Advertorial-Landing-Pages.
 * Die HTML-Dateien liegen unter public/lp/<slug>/index.html und werden per
 * Script aus Shopify erzeugt:
 *     python3 marketing/tracking/build_lp.py --all --domain victoriafalkenberg
 * Die Rewrites geben ihnen eine redaktionell wirkende URL, ohne dass die
 * Dateien verschoben werden muessen.
 */
const LANDING_PAGES = ['5-warnzeichen', 'frauen-ab-45', 'tausende-frauen'];

const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return LANDING_PAGES.flatMap((slug) => [
      // Oeffentliche URL: /ratgeber/<slug>
      { source: `/ratgeber/${slug}`, destination: `/lp/${slug}/index.html` },
      // Direktzugriff /lp/<slug> ohne Trailing-Slash ebenfalls bedienen
      { source: `/lp/${slug}`, destination: `/lp/${slug}/index.html` },
    ]);
  },
};

module.exports = nextConfig;
