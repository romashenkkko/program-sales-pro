# PULS event discovery redesign

## What will change
- Rename the visible brand from Forma/GetMove to PULS and update the domain references to puls.fit.
- Rework the home page into a concise event finder for running, trail running, and triathlon in Moldova and Romania.
- Show a two-column event grid with date, place, organizer, sport, and distances.
- Add a complete detail page for the Chișinău International Marathon, including race distances, previous editions, and coaches.
- Add reusable event and trainer data so further entries can be added by copying one record.
- Add a complete reference trainer profile with specialties, biography, coaching details, gallery, and social links.

## Visual direction
- Keep the existing coral, warm cream, charcoal, and clay palette.
- Use bold editorial typography, restrained borders, generous spacing, and large documentary sports photography.
- Preserve a focused mobile layout with one card per row and two cards per row on larger screens.

## Technical details
- Add dynamic routes at `/events/$slug` and `/trainers/$slug` with distinct metadata and not-found states.
- Store event and trainer content in a typed, browser-safe module.
- Keep factual event fields sourced from official or reliable organizer listings; mark generated trainer content as a reference profile.
- Update shared navigation, footer, favicon, and legacy brand mentions across public pages.
- Fix the existing environment-variable type error, then validate the primary links and layouts in the running preview.