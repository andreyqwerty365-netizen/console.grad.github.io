# Build the first ConsoleGrad landing page

This ExecPlan is a living document. The sections Progress, Surprises & Discoveries, Decision Log, and Outcomes & Retrospective must be kept up to date as work proceeds.

This document must be maintained in accordance with `.agent/PLANS.md`.

## Purpose / Big Picture

After this change, the project will have a real landing page for the ConsoleGrad business instead of an empty folder. A visitor will be able to open one HTML file locally and see a polished gaming-themed page that explains the offer, shows packages, highlights the custom PS Lounge software, presents a completed case, includes reviews, and gives direct contact paths. The result matters because the founders need a public-facing sales asset that looks credible before advertising or sending traffic to it.

## Progress

- [x] (2026-04-11 10:32Z) Created the initial ExecPlan for the landing page.
- [x] (2026-04-11 10:35Z) Read `C:\Users\andre\Downloads\Telegram Desktop\План развития и продвижения.txt` and extracted the main positioning, package structure, and sales arguments.
- [x] (2026-04-11 10:36Z) Extracted slide text from `C:\Users\andre\Downloads\Telegram Desktop\Презентация PS-lounge.pptx`.
- [x] (2026-04-11 10:36Z) Extracted slide text from `C:\Users\andre\Downloads\KonsolGrad (2).pptx`.
- [x] (2026-04-11 10:49Z) Built the first static landing implementation in `index.html`, `styles.css`, and `script.js`.
- [x] (2026-04-11 10:52Z) Validated that the page is served locally without a build step via `python -m http.server 4173` and returns HTTP 200 for `/index.html`.
- [x] (2026-04-11 10:54Z) Updated `agents.md` so the repository guide matches the new static landing stack and local run command.
- [x] (2026-04-11 10:55Z) Updated this ExecPlan with implementation results and acceptance evidence.
- [ ] Build a second landing iteration focused on conversion: audience segments, interactive brief calculator, and FAQ.
- [x] (2026-04-11 11:05Z) Built a second landing iteration focused on conversion: audience segments, interactive brief calculator, and FAQ.
- [x] (2026-04-11 11:07Z) Validated the new interactive components with local HTTP serving and source inspection.
- [x] (2026-04-11 11:42Z) Refined the public-facing structure: clearer top navigation, removed the internal-looking launch badge, improved contact language, and added hover explanations for project priorities.
- [x] (2026-04-11 11:42Z) Added a staged “how the project is assembled” animation block that cycles from an empty room to a ready gaming zone.
- [x] (2026-04-11 11:43Z) Revalidated `/index.html` over local HTTP and rebuilt `share/consolegrad-landing.zip` from the latest landing files.
- [x] (2026-04-17 00:00Z) Upgraded the landing from a visual-only brief calculator to a real lead-capture flow with client-side validation, configurable endpoint submission, and Telegram fallback.
- [x] (2026-04-17 00:00Z) Added a configurable analytics layer, SEO metadata, `robots.txt`, `sitemap.xml`, and `favicon.svg` for the published static site.
- [x] (2026-04-17 00:00Z) Reworked the case and PS Lounge sections to remove unverified business claims and frame the software block as a demonstration interface rather than live public metrics.
- [x] (2026-04-17 00:00Z) Generated lightweight WebP derivatives for the case gallery and video posters, then revalidated local HTTP delivery for the landing, legal pages, SEO files, and new media assets.
- [x] (2026-04-17 00:00Z) Reframed the commercial copy to cover a wider set of venues beyond cafes and lounges, including hotels, SPA, cinemas, private clinics, detailing, and automotive service spaces.
- [x] (2026-04-17 00:00Z) Renamed the middle package from “Лаунж” to “Оптимум” in the public-facing landing copy so the offer reads as a broader B2B package rather than a venue-specific format.
- [x] (2026-04-17 00:00Z) Added a dedicated `pslounge.html` product page that explains the current PS Lounge functionality from the second version as a standalone software capability, not just a visual demo block.
- [x] (2026-04-17 00:00Z) Reworked the application flow wording from “бриф” to “заявка / стартовый план”, simplified the Telegram redirect path, aligned the PS Lounge demo timings to a coherent static snapshot, and updated the legal texts with cookie/localStorage language.
- [x] (2026-09-20 13:35Z) Backed up and consolidated the project in `D:\Проекты\Сайт\Сайт`, archived old `share` exports, and corrected project paths.
- [x] (2026-09-20 13:40Z) Added an Nginx Docker deployment contract for Amvera and repeatable static-site smoke tests.
- [x] (2026-09-20 13:45Z) Ran desktop and mobile browser checks, fixed legal-page heading semantics, and documented remaining improvements.
- [ ] Connect the GitHub `main` branch to Amvera, verify the temporary HTTPS domain, then update absolute site URLs.

## Surprises & Discoveries

- Observation: The project root started empty, so there is no existing application stack, asset pipeline, or test runner to extend.
  Evidence: Initial directory listing showed only `.agent`, `.codex`, and `agents.md`.

- Observation: The business materials already contain enough strong structure for the landing page: three product packages, a real differentiator (PS Lounge), a six-seat case, and direct phone contacts.
  Evidence: `План развития и продвижения.txt` and `KonsolGrad (2).pptx` both describe the “Старт / Лаунж / Флагман” packaging and the role of the custom software.

- Observation: The PS Lounge slides are strong proof for a “software advantage” section, but the wording around accounts and game libraries should not be leaned on too hard in the public page.
  Evidence: The strategy text explicitly warns about legal and trust risks around commercial use of game accounts and subscriptions.

- Observation: The desktop Playwright integration could not be used for local visual validation in this session because it attempted to create files in `C:\Windows\system32`.
  Evidence: Playwright returned `EPERM: operation not permitted, mkdir 'C:\\Windows\\system32\\.playwright-mcp'`.

- Observation: A client-side project brief works well for this repository because it adds interactive value without forcing an early backend decision.
  Evidence: The second iteration was implemented entirely inside `index.html`, `styles.css`, and `script.js`, and `/index.html` still serves successfully over local HTTP.

- Observation: The environment does not include `ffmpeg` or ImageMagick, so video bitrate reduction could not be performed locally in the same way as image optimization.
  Evidence: `where.exe ffmpeg` and `where.exe magick` both returned no matches during implementation.

- Observation: Pillow is available in the local Python environment, which made it possible to generate practical WebP replacements for the heavy PNG case assets without adding a build step to the repo.
  Evidence: Importing `PIL` succeeded and the generated files in `assets/cases/spa-lounge/*.webp` are an order of magnitude smaller than the original PNG files.

- Observation: The PS Lounge product story had grown beyond what fits cleanly inside one block of the landing.
  Evidence: The user supplied a separate `Изменение.docx` describing reporting, payments, PIN protection, journal export, recovery, and state-resilience features that were only partially visible in the main page preview.

- Observation: The old mid-tier package name “Лаунж” started to narrow the perceived target market too much once the site expanded toward hotels, SPA, cinemas, clinics, detailing, and automotive waiting zones.
  Evidence: The user explicitly called out that the package naming and venue list made the business sound too tied to lounges and bars.

## Decision Log

- Decision: Build the first version as a static page with `index.html`, `styles.css`, and `script.js`.
  Rationale: The repository has no framework yet, and a static implementation is the fastest path to a visible, editable, and locally testable result.
  Date/Author: 2026-04-11 / Codex

- Decision: Use a dark neon aesthetic with electric blue, violet, and acid-yellow accents, but keep the structure sales-oriented rather than “gamer chaos”.
  Rationale: The user asked for a gaming and cyberpunk mood, while the business still needs to look credible to B2B buyers such as lounge bars, malls, and clubs.
  Date/Author: 2026-04-11 / Codex

- Decision: Include the custom PS Lounge software as a dedicated product block, not as a tiny feature mention.
  Rationale: The supplied materials show that this software is the main differentiator versus ordinary “equipment installers”.
  Date/Author: 2026-04-11 / Codex

- Decision: Keep the first release dependency-light and framework-free, even though the design is visually ambitious.
  Rationale: A static implementation reduces setup friction, lets the founders open the page immediately, and still leaves room for a later migration to a richer stack if needed.
  Date/Author: 2026-04-11 / Codex

- Decision: Implement lead capture with a configurable external endpoint and a Telegram share fallback instead of hard-coding a third-party form service.
  Rationale: The repository still has no backend or secrets, and the user did not provide service credentials. A configurable endpoint keeps the static architecture intact while the fallback preserves a working user path today.
  Date/Author: 2026-04-17 / Codex

- Decision: Use the current GitHub Pages origin `https://andreyqwerty365-netizen.github.io/` for canonical and sitemap URLs until a custom domain is connected.
  Rationale: A canonical URL, sitemap, and Open Graph metadata are useful now, and the current published origin is the only verified absolute site URL available in the repository context.
  Date/Author: 2026-04-17 / Codex

- Decision: Keep the PS Lounge preview on the landing as a coherent static product snapshot rather than a live clock-driven widget.
  Rationale: A fixed snapshot avoids time inconsistencies between the visible “current time” and the displayed remaining session durations, which confused the user and weakened trust in the demo.
  Date/Author: 2026-04-17 / Codex

- Decision: Add a separate PS Lounge details page instead of overloading the landing with every software feature.
  Rationale: The software now has enough operational depth that it deserves a dedicated page for owners and operators who want to understand reports, payments, PIN protection, journal tracking, and local reliability in detail.
  Date/Author: 2026-04-17 / Codex

## Outcomes & Retrospective

The landing page milestone is complete. The repository now contains a full first-screen-to-contact static site for ConsoleGrad, built from the supplied business context rather than generic placeholder copy. The page presents the business as a turnkey gaming-zone operator, introduces the three service packages, explains the delivery process, highlights a six-seat case, gives PS Lounge its own differentiator block, and ends with direct founder contacts.

The main gap is proof material. The page currently uses stylized visual blocks instead of real project photos, and the “reviews” section uses polished commercial wording rather than attributed testimonials. The next high-value iteration should replace those parts with real photos, real review text, and messenger links or a lead form.

This plan is now continuing into a second iteration that improves conversion before media replacement: better audience targeting on-page, a structured project brief section, and answers to common objections.

The second iteration is now complete. The page not only looks like a brand card, but also helps a prospect self-identify, explore a fitting package, and remove early objections before calling.

A follow-up refinement pass is also complete. The navigation and contact layer now read more like a public website and less like an internal prototype, the project brief explains priority choices in-context, and the landing includes a visual staged build story that demonstrates how an empty room becomes a launch-ready gaming zone.

The commercial-readiness pass is now also complete inside the limits of a static repository. The landing can now accept a real brief submission path, emits structured analytics events when IDs are configured, has a full static SEO shell, and avoids presenting unverified “live business metrics” as fact. The remaining gap is operational rather than front-end: a real production endpoint and analytics IDs still need to be supplied by the site owner.

The next refinement pass is now also complete. The public offer is broader and less venue-specific, the mid-tier package reads more commercially, the PS Lounge demo snapshot is internally consistent, the main CTA language is aligned around a “стартовый план” and “заявка”, and the software itself now has a dedicated supporting page for deeper product explanation. The remaining practical gap is still the same operational one: if the owners want automatic lead intake instead of a Telegram handoff, they still need a real external endpoint or messaging username that can be wired into the published static flow.

## Context and Orientation

The repository root is `C:\Users\andre\OneDrive\Рабочий стол\Проекты\Сайт`. Right now it contains project guidance files but no application code. The page will therefore be introduced from scratch.

The most important business context comes from three files outside the repository:

- `C:\Users\andre\Downloads\Telegram Desktop\План развития и продвижения.txt` explains how the business should be packaged and sold. It names three service packages: “Старт”, “Лаунж”, and “Флагман”. It also explains that the business should be presented as a full turnkey launch, not just “selling consoles”.
- `C:\Users\andre\Downloads\Telegram Desktop\Презентация PS-lounge.pptx` describes PS Lounge, the custom local software for tracking gaming sessions, statuses, timing, and reports.
- `C:\Users\andre\Downloads\KonsolGrad (2).pptx` describes the ConsoleGrad company offer, the types of venues, example economics for a six-seat zone, extra formats like simulators and VR, and direct contact names and phone numbers.

In this repository, “landing page” means a single-page website that a visitor can scroll from top to bottom. “Static page” means it opens directly in a browser without a build tool or a server requirement. “Interactive effects” means motion driven by CSS and small JavaScript behaviors such as hover movement, animated counters, decorative particles, or scroll reveals.

## Plan of Work

Create `index.html` as the single page entry point. It will contain seven major content areas plus the footer: hero, trust and metrics, service packages, implementation process, completed case, software advantage, reviews, and contacts. Each section will use copy derived from the supplied materials, rewritten into concise landing language.

Create `styles.css` to define the visual system. This file will establish the dark gaming palette, neon accent colors, custom typography, layout grid, cards, glowing borders, animated backgrounds, responsive behavior, and the “DualSense-like” decorative object in the hero section. The page must work on desktop and mobile widths.

Create `script.js` for motion and interaction. It will power scroll reveal classes, subtle parallax or tilt for key cards, live number counters if used, and a lightweight particle or beam background for atmosphere. The script must not require any external library.

Keep the content B2B-safe. Avoid promising legal rights around game subscriptions or commercial licensing. Focus instead on equipment selection, design, installation, launch, service, and the PS Lounge operational software.

For the second iteration, extend the static page instead of changing the stack. Add a “who this is for” section based on the business segments in the strategy document, an interactive brief builder that helps a prospect understand which package fits their venue, and an FAQ section that removes obvious buying friction. Keep the interactions client-side only so there is still no backend requirement.

## Concrete Steps

From the repository root `C:\Users\andre\OneDrive\Рабочий стол\Проекты\Сайт`, create three files:

    index.html
    styles.css
    script.js

Open `index.html` in a browser after implementation. If a local static server is available later, it can also be served, but the first version should not depend on that.

Expected local verification flow:

    1. Open index.html.
    2. Confirm the hero section loads with animated background, large headline, and a dynamic controller-inspired centerpiece.
    3. Scroll through packages, case, software, reviews, and contacts.
    4. Hover cards and confirm motion effects respond.
    5. Resize the viewport and confirm the layout remains readable on mobile width.

## Validation and Acceptance

Acceptance is behavioral:

The page is successful when a user can open `index.html` and immediately understand what ConsoleGrad does, who it serves, why it is different, what packages exist, how the process works, what has already been built, what the PS Lounge software adds, what clients say, and how to contact the founders.

Run no build command, because the first version is intentionally framework-free. Validate by opening the page and checking:

- the page renders without missing script errors;
- sections appear in the intended order;
- hover and reveal animations run;
- contacts are visible and actionable;
- the page remains usable on a narrow viewport.

Validation evidence captured during implementation:

    Working directory: C:\Users\andre\OneDrive\Рабочий стол\Проекты\Сайт
    Command: python -m http.server 4173
    Verification command: Invoke-WebRequest -Uri 'http://127.0.0.1:4173/index.html'

    Expected result:
    StatusCode        : 200
    StatusDescription : OK

Second-iteration verification:

    Verification command: Invoke-WebRequest -Uri 'http://127.0.0.1:4173/index.html'

    Expected result:
    StatusCode : 200
    HasBrief   : True
    HasFaq     : True

## Idempotence and Recovery

The implementation is additive. Re-running the work simply overwrites the same three landing files. There is no database, migration, or destructive step. If a styling or script change breaks the page, the safe recovery path is to edit only `styles.css` or `script.js` and reload the page locally.

## Artifacts and Notes

Important source facts that must shape the landing copy:

    - ConsoleGrad sells turnkey gaming zones, not just equipment.
    - The main packages are “Старт”, “Оптимум”, and “Флагман”.
    - A real sample configuration is a six-seat console zone with possible simulator and Nintendo Switch expansion.
    - PS Lounge is a local browser-based admin tool for session timing, station statuses, and reports.
    - The presentation includes these contacts: Иван — 8 (993) 336-06-88, Данила — 8 (977) 866-27-24.

## Interfaces and Dependencies

Use plain HTML, CSS, and vanilla JavaScript only.

At the end of implementation, these files must exist:

    index.html
    styles.css
    script.js

`index.html` must load `styles.css` and `script.js` from the same directory.

Revision note: 2026-04-11. Created the initial plan after researching the supplied business files so implementation can proceed from a self-contained document.

Revision note: 2026-04-11. Updated the plan after implementation to record the completed static landing, local HTTP validation, and the current limitations around missing real media and testimonials.

Revision note: 2026-04-11. Extended the plan to cover a second conversion-focused landing iteration without introducing a framework or backend.

Revision note: 2026-04-11. Marked the second conversion-focused iteration complete after adding audience targeting, a package recommendation brief, and FAQ validation.

Revision note: 2026-04-11. Updated the plan after a structural refinement pass that improved navigation clarity, removed internal-only header language, added public-facing contact/channel framing, and introduced the staged room-build animation block.

Revision note: 2026-04-17. Updated the plan after a commercial-readiness pass that added lead submission behavior, analytics instrumentation hooks, SEO metadata and support files, lighter image assets, and more trust-safe content framing.

Revision note: 2026-04-17. Updated the plan after a product-explanation and offer-broadening pass that added a standalone PS Lounge page, widened the venue framing, renamed the middle package to “Оптимум”, aligned the PS Lounge snapshot timings, simplified the Telegram handoff, and expanded the legal texts with cookie/localStorage language.

Revision note: 2026-04-17. Updated the plan after a UX-alignment pass that switched the hero controller to a more realistic DualSense asset, compacted the application form, disabled submit until consent is checked, reduced duplicate messaging in the hero/metrics layer, simplified PS Lounge asset presentation, and added a desktop-safe fallback for the contact call CTA.

Revision note: 2026-04-17. Updated the plan after a PS Lounge presentation pass that tightened station card proportions, moved the product CTA below the demo block, removed duplicate text from the temporary logo lockup, and expanded the standalone PS Lounge page with extracted product screenshots and feature-driven captions from the supplied change log.
- Observation: Docker and `npx` are not installed in the local environment, so container execution and Playwright CLI validation cannot run locally.
  Evidence: command discovery returned `docker=MISSING` and `npx=MISSING`; browser validation was completed with the built-in browser instead.

- Decision: Keep GitHub as the source repository and deploy `main` to Amvera through an Nginx container.
  Rationale: This keeps version control independent from hosting and gives the static site a minimal reproducible runtime.
  Date/Author: 2026-09-20 / Codex
