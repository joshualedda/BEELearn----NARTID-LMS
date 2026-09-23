# BeeLearn Landing Page UI/UX Guide

Use this guide when adding or updating public landing-page sections. It documents the visual system already used in `src/components/landing` and should keep the page cohesive without introducing a separate design system.

## Design intent

The landing page should feel practical, credible, and approachable for new and experienced beekeepers. Favor clear content hierarchy, generous breathing room, and calm natural accents over busy decoration or marketing-heavy effects.

## Visual foundation

| Purpose | Token / treatment |
| --- | --- |
| Primary brand | Navy `#0D2B52`; use darker `#0B2343` for primary controls. |
| Primary accent | Amber `#E5A900`; use `#F4C430` for its hover state. |
| Supporting accent | Green `green-600` for growth, completion, and field-focused content. |
| Page surfaces | Alternate white and `#F7F9FB` sections. |
| Body text | Use `text-slate-600`; use `#6B82A6` or `#C7D5EA` for brand-muted text on light or dark surfaces respectively. |
| Cards | White or `#F7F9FB`, `rounded-2xl`, a light slate border, and restrained navy-tinted shadow. |

Use navy for headings, amber for the primary conversion action, and green/blue as secondary semantic accents. Do not introduce unrelated bright colors or gradients unless they are subtle decorative accents.

## Layout and hierarchy

- Use `max-w-7xl px-6` for section content and `py-16 sm:py-20 lg:py-24` as the standard section rhythm. Compact metric and CTA sections may use `py-14 sm:py-16 lg:py-20`.
- Use `LandingSectionHeader` for standard section headings. Center it for explanatory sections; use its left-aligned variant when a section needs a related action.
- Keep headings concise, navy, bold, and tightly tracked. Body copy should remain readable at `text-sm` to `text-base` with relaxed line height.
- Prefer `gap-4` to `gap-6` card grids, two columns on small screens where content permits, and three or four columns only at larger breakpoints.
- Preserve an explicit mobile layout. Dense desktop rows must stack or wrap cleanly rather than shrink text or controls.

## Component patterns

### Cards and metric blocks

- Use rounded white cards with a light border and modest hover lift (`-translate-y-1` to `-translate-y-3`).
- Pair one clear icon badge with one accent color; use navy, amber, green, and blue consistently across related cards.
- Do not make every element animate. One card-level hover effect is enough.

### Calls to action

- The final conversion moment is a rounded navy panel placed inside an off-white section, not a full-width dark band.
- On desktop, place the message and proof points on the left and vertically grouped actions on the right. Stack the content and make actions full width on mobile.
- Use the amber primary button for the main action and a transparent white outlined secondary button inside dark panels.
- The shared `outline` button has a white default surface. On a dark panel, explicitly override it with `!bg-transparent`, `!text-white`, and `!border-white/20`, including matching hover overrides, so the text stays visible.

### Links and navigation

- Use direct route links for destination pages and fragment links only when the intended behavior is scrolling to an element on the same page.
- Keep action labels specific and verb-led, such as “Start learning,” “Explore courses,” or “View course.”

## Motion and accessibility

- Reuse `FadeIn`, `StaggerContainer`, and `StaggerItem` from `src/components/ui/motion` for reveal motion. These respect reduced-motion preferences.
- Keep motion short and purposeful: entrance fades, a small hover lift, and restrained button scale feedback are sufficient.
- Use semantic sections with labelled headings, visible focus states, and `aria-hidden` on decorative icons or backgrounds.
- Maintain sufficient contrast, especially for controls on navy surfaces. Never rely on hover alone to reveal button text or meaning.

## Before shipping a landing-page change

- Reuse an existing UI component or landing-page pattern before creating a new one.
- Check desktop, tablet, and mobile widths for wrapping, overflow, and readable actions.
- Confirm links target valid routes or anchors.
- Run `npm run lint` after implementation.
