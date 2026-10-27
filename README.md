# Janice NutiFafa Middleton-Dogbe — Portfolio

A cinematic, dark editorial personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion and GSAP/ScrollTrigger.

## Run locally

1. Install Node.js 20.9 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Create a form at [Formspree](https://formspree.io/), then set `NEXT_PUBLIC_FORMSPREE_ID=your_real_form_id` in `.env.local`.
6. Run `npm run dev` and open `http://localhost:3000`.
7. Run `npm run build` before deployment.

## Deploy to Vercel

Import this project into Vercel, connect the Git repository, and add `NEXT_PUBLIC_FORMSPREE_ID` under Project Settings → Environment Variables. Redeploy after adding the variable.

## Before publishing — replace editable slots

- Replace design visual placeholders with actual project covers and link each card to the relevant Behance, Canva, Figma or Drive URL.
- Add original photographs to the photography gallery and link each image to its relevant gallery or post.
- Verify the technology project summaries, stack, repository URLs and live demo URLs. The current GitHub links point to the profile, not assumed repository URLs.
- Add real Substack article links. The writing section intentionally does not invent post titles, excerpts, dates or reading times. A live RSS/API integration can be added once the preferred feed format is confirmed.
- Replace the clearly labelled original poetry line if you prefer to feature a published excerpt; add performance video URLs and real event credits.
- Add verified hosting engagements, event images and testimonials only with permission.
- Update `metadataBase` in `app/layout.tsx` to the final production domain.
- Consider adding a real portrait, favicon, OG image, analytics and a privacy notice for the contact form.

## Design notes

- Responsive single-page information architecture with mobile navigation.
- Motion respects `prefers-reduced-motion`.
- Contact form posts directly to Formspree once configured. No messages are stored by this website.
- Placeholder art is generated in CSS, not stock photography; replace it with your own work before launch.
