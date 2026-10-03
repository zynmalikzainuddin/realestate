# Pentora Calicut — Sandalwood Plantation Website

A static, single-page website for Pentora Calicut's Sandalwood Plantation group farming project in Pulpally, Wayanad.

## Run locally

```bash
npm start
```

The server listens on `0.0.0.0:3000` (or `PORT=<port> npm start`). The production-safe static build copies the site into `dist/` with `npm run build`.

## Replace before launch

Replace every image marked with `data-placeholder="replace-with-project-photo"` or the text `replace-with-project-photo` in `index.html`. The temporary Unsplash URLs are visual placeholders only. Use Pentora-owned or properly licensed images for plantation rows, saplings, sandalwood heartwood, oil, powder, incense, Wayanad hills, drone views, caretakers and family planting moments. Keep the descriptive `alt` text accurate.

## Verify before launch

- Plot price, EMI tenure, payment terms and any missed-payment or exit terms.
- Land ownership, allocation, title, agreement and participation wording.
- Host plant specification, care schedule and project update rhythm.
- Harvest permissions, Forest Department process and sale pathway in Kerala.
- Security coverage, patrol, CCTV and operating arrangements.
- Wayanad/Pulpally climate or suitability statements and any statistics.
- All testimonial names, quotes and permissions.
- Final map coordinates/embed and approved brochure PDF endpoint.
- Connect the enquiry form to an approved CRM, email or WhatsApp workflow.
- Replace `your-domain.example` in `index.html`, `robots.txt` and `sitemap.xml` with the final approved HTTPS domain.

## Compliance note

This page does not promise returns. Figures are illustrative where labelled. Keep the footer disclaimer and the sentence “Returns are not guaranteed. Please read all documents before investing.” visible in the final experience.

## Main files

- `index.html` — semantic page, SEO metadata, JSON-LD and content.
- `styles.css` — white/green design system, responsive layout and motion rules.
- `script.js` — navigation, reveal motion, counters, calculator, estimator, gallery, FAQ and form validation.
- `manus-routes.json` — route manifest for `/`.
- `server.mjs` — dependency-free static server.
