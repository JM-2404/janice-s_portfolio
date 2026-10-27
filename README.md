# EZER — content-driven portfolio

EZER is a Next.js portfolio for photography, design, technology, writing, spoken word, and event hosting.

## Content-first editing

Add or edit portfolio entries in `data/`. The section layouts read these data files; adding an entry does not require editing a React component.

- `data/profile.ts` — identity, hero rotation, About copy, brands, contact links, and CTA
- `data/photography.ts` — collections and Pixieset gallery links
- `data/design.ts` — design case studies and Behance/Canva/Figma links
- `data/projects.ts` — technology projects, stack, GitHub, and demo links
- `data/writing.ts` — featured articles, excerpts, dates, read time, Substack links, optional full text
- `data/spokenword.ts` — spoken-word pieces, excerpts, performance details, video/social links
- `data/events.ts` — hosting and public-speaking experiences, roles, dates, galleries, testimonials
- `data/types.ts` — shared TypeScript schemas used by the data files

### Adding photography

1. Upload your image files to the repository under `public/images/photography/` (create the folder if needed).
2. Add an object to `data/photography.ts`.
3. Set `coverImage` to a public path such as `/images/photography/portrait-session-cover.jpg`.
4. Add the Pixieset gallery URL in `galleryLink` and choose one of the supported categories: `Portraits`, `Events`, `Nature`, or `Creative Concepts`.

The image file itself must be uploaded to the repository or another publicly accessible image host; adding a path alone does not upload the image.

### Adding another item

Add an object to the matching data file with a unique `slug`. Use a cover path under `public/` (for example, `/images/design/project-cover.jpg`) and only add real links and details. The portfolio card links to a reusable detail page at `/work/<slug>`.

### Substack feed

The site includes a server-side RSS reader at `/api/substack`. Set the environment variable `SUBSTACK_FEED_URL` to the verified RSS feed URL for the Potter's Piece publication in your deployment environment. The site displays recent posts when the feed is reachable, and falls back to the manually curated entries in `data/writing.ts` if the feed is unavailable or not configured. This avoids guessing a feed URL from the profile URL.

## Development

```bash
npm install
npm run dev
``

To verify a production build locally:

```bash
npm run build
``

## Design intent

The visual direction is editorial and premium: black night-sky hero, subtle star field, restrained gold with careful royal-blue use, and alternating dark/light sections. The persistent EZER wordmark and capsule-style navigation remain visible while scrolling.


## Image folders

Portfolio image directories are prepared under `public/images/`:

- `public/images/oh woww.jpg` — cinematic hero portrait
- `public/images/about-photo.jpg` — About portrait
- `public/images/photography/` — photography collection covers and galleries
- `public/images/design/` — design case-study images
- `public/images/spokenword/` — performance images
- `public/images/events/` — event galleries
- `public/images/projects/` — technology project covers
- `public/images/profile/` — profile-related images

Upload your actual image files using those paths. Keep the exact filenames for the two main portraits unless you also update the corresponding values in `data/profile.ts`. Images are not automatically uploaded from your computer; they must be added to the repository or another public image host.

## Contact form setup (Formspree)

The contact form uses a Formspree endpoint. To enable submissions:

1. Create a form in your Formspree account and set its recipient to `janicedogbe85@gmail.com`.
2. Copy the form ID from Formspree.
3. In your Vercel project, open **Settings → Environment Variables** and add `NEXT_PUBLIC_FORMSPREE_ID` with that form ID (not the full URL).
4. Apply it to Production (and Preview if you want preview forms to work), save, then redeploy.

Until that ID is configured, the form will show a setup message rather than pretending a message was sent.

## Substack feed setup

Set `SUBSTACK_FEED_URL` in the deployment environment to the actual RSS feed URL for your Substack publication. The profile URL alone is not necessarily the RSS URL. Without this setting, manually curated entries in `data/writing.ts` still work, but automatic recent articles will not load.
