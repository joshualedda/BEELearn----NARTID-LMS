## LMS Design System

The existing login page establishes the baseline visual identity for the
LMS.

New pages and components should follow this visual language unless a
specific feature requires a justified variation.

Do not redesign the application with unrelated colors, fonts, component
styles, or visual patterns.

The goal is for:

- authentication pages
- student pages
- instructor pages
- admin pages
- course pages
- dashboards
- forms
- tables
- dialogs

to feel like parts of the same application.

---

## Typography

### Font Family

Primary font:

- Geist Sans
- Configured using `next/font/google`
- CSS variable: `--font-geist-sans`

Monospace font:

- Geist Mono
- Use only where monospace text is appropriate.

The application root uses:

- `font-sans`
- `antialiased`

Fallback stack:

- `ui-sans-serif`
- `system-ui`
- `-apple-system`
- `Segoe UI`
- `Roboto`

Do not introduce another primary font family unless explicitly requested.

Do not import fonts separately inside individual pages or components.

Use the global font configuration.

### Typography Style

The LMS typography should feel:

- modern
- clean
- professional
- readable
- slightly compact
- appropriate for an academic/institutional system

Use font weight and spacing to establish hierarchy rather than introducing
additional font families.

### Existing Type Scale

Use the existing login page as the baseline.

Hero:
- approximately 32px
- bold
- tight line height/tracking

Welcome / major section heading:
- approximately 24px
- bold

Body:
- approximately 15px
- relaxed line height

Eyebrow / small category label:
- approximately 10px
- medium
- uppercase
- tracking around `0.14em`

Feature labels and normal UI labels:
- generally `text-sm`

These are guidelines rather than requirements for every component.

Use responsive typography where appropriate.

### Application Hierarchy

For internal LMS pages, maintain a consistent hierarchy.

Typical hierarchy:

Page Title
- strong visual emphasis
- generally around `text-2xl`
- bold or semibold
- primary navy

Section Heading
- generally `text-lg` or `text-xl`
- semibold
- primary navy

Card Title
- generally `text-base` or `text-lg`
- semibold

Body
- approximately 14–15px
- normal weight
- comfortable line height

Labels
- generally `text-sm`
- medium when emphasis is required

Secondary / Supporting Text
- generally `text-sm`
- muted color

Eyebrow / Metadata
- `text-xs` or smaller when appropriate
- medium
- may use uppercase and tracking

Avoid excessive typography variation.

Do not create arbitrary font sizes when existing Tailwind sizes work.

---

## Color System

Use the login page color palette as the foundation for the LMS.

### Primary Navy

Main brand navy:

`#0D2B52`

Use for:

- major headings
- important text
- navigation emphasis
- branded sections
- sidebar/header areas when appropriate

This is the primary visual identity color of the LMS.

### Interactive Navy

Primary button:

`#0B2343`

Button hover:

`#123158`

Use primarily for:

- primary actions
- important interactive controls

Examples:

- Save
- Continue
- Create Course
- Submit
- Sign In

Do not use the primary button color for every action.

### Secondary Navy

Tile / secondary branded navy:

`#16407A`

Use for:

- selected states
- feature tiles
- secondary branded surfaces
- appropriate dashboard accents

Do not introduce multiple additional navy shades without a reason.

---

## Accent Gold

Primary gold:

`#E5A900`

Use sparingly.

Appropriate uses include:

- small highlights
- important emphasis
- selected decorative accents
- branding details

Gold should support the navy rather than compete with it.

Do not use gold as the primary color for large portions of the interface.

---

## Accent Green

Existing green accents include:

- `green-400`
- `green-600`
- `green-700`

Green may be used for:

- logo accents
- positive states
- success
- completion
- appropriate links or interactive accents

Maintain consistency with existing usage.

Do not make green a competing primary brand color.

For semantic success states, use the project's established green styling.

---

## Muted Blue-Gray

Existing muted brand colors include:

`#8FA3BF`

Use for muted descriptions on dark/navy surfaces.

`#C7D5EA`

Use for secondary feature text on dark/navy surfaces.

`#6B82A6`

Use for lower-emphasis branded text such as footer/supporting information
when appropriate.

For neutral application interfaces, existing Slate colors may continue to
be used.

Do not replace all neutral grays with blue-gray.

Use branded blue-gray where it helps connect the interface to the LMS
identity.

---

## Surfaces

Primary light application background:

`#F7F9FB`

Use this or the established equivalent for major light application
surfaces.

Primary cards:

- white

Borders:

- `gray-100`
- `gray-200`
- or existing project border tokens

Secondary text may use:

- `slate-500`
- `slate-400`

Maintain sufficient contrast.

A typical internal LMS page may follow:

Application Background
`#F7F9FB`
    ↓
White Cards
    ↓
Navy Headings
    ↓
Slate Secondary Text
    ↓
Gray Borders
    ↓
Navy Primary Actions

This should create continuity with the login experience.

---

## Brand Color Hierarchy

Use colors according to their purpose.

Primary identity:
`#0D2B52`

Primary interaction:
`#0B2343`

Primary interaction hover:
`#123158`

Secondary navy:
`#16407A`

Highlight:
`#E5A900`

Positive / success:
Green

Application background:
`#F7F9FB`

Cards:
White

Secondary information:
Slate / muted blue-gray

Do not introduce random colors when an existing semantic or brand color
already communicates the meaning.

---

## Semantic Colors

Brand colors and semantic colors have different purposes.

Use semantic colors consistently for application states.

Examples:

Green:
- success
- completed
- active when appropriate

Red:
- error
- destructive
- failed
- overdue when appropriate

Amber/Gold:
- warning
- pending
- attention

Blue/Navy:
- information
- normal actions
- selected states

Do not use red merely for decoration.

Do not rely solely on color to communicate status.

Always include text, labels, icons, or another accessible indicator.

---

## Background Pattern

The login page uses the subtle pattern:

`radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`

with approximately:

`22px`

spacing.

Treat this as a branding/decorative pattern.

It may be reused selectively on:

- authentication screens
- branded hero areas
- major navy panels
- selected empty states or promotional areas

Do not apply the pattern to every card or page.

Internal application screens should generally remain cleaner and more
functional.

---

## Internal LMS Visual Direction

The login page establishes the brand.

Internal pages should translate that branding into a practical application
interface.

Do not duplicate the login layout across the LMS.

Instead use:

Login Experience
- stronger branding
- larger typography
- decorative navy surfaces
- gold/green accents

Application Experience
- lighter background
- white surfaces
- navy headings
- restrained accents
- clear information hierarchy
- functional layouts
- higher information density

The visual relationship should still be obvious.

---

## Dashboard Style

Dashboards should generally use:

- `#F7F9FB` application background
- white cards
- subtle gray borders
- navy titles
- slate secondary text
- restrained navy/green/gold accents

Example:

Dashboard
├── Page title — Navy
├── Description — Slate
│
├── Summary Cards
│   ├── Navy/neutral primary values
│   └── Muted labels
│
├── Main Content
│   ├── White surfaces
│   └── Subtle borders
│
└── Primary Actions
    └── Navy buttons

Avoid turning every dashboard card into a strongly colored tile.

Use strong brand colors selectively.

---

## Role-Based Visual Consistency

Student, instructor, and admin interfaces belong to the same LMS.

Do not create completely different design systems for each role.

They should share:

- typography
- colors
- buttons
- inputs
- cards
- dialogs
- tables
- spacing
- navigation patterns

Role differences should primarily come from:

- available functionality
- information architecture
- dashboard content
- navigation options

not completely different branding.

---

## Buttons

Primary button:

- background `#0B2343`
- hover `#123158`
- readable contrasting text

Use for the most important action in a section.

Secondary actions should use the project's existing secondary/outline
button variants.

Destructive actions should use semantic destructive styling.

Avoid multiple competing primary buttons in the same area.

Reuse `src/components/ui/button.tsx`.

Do not recreate button styling locally unless a genuinely different
component is required.

---

## Cards

Prefer:

- white background
- subtle border
- restrained shadow if the project uses shadows
- consistent radius
- clear internal spacing

Card headings should normally use the primary navy or normal foreground
depending on context.

Avoid:

- excessive shadows
- gradients on every card
- excessive colored borders
- deeply nested cards

Use accent colors selectively for meaningful states or information.

---

## Forms

Forms should visually connect to the login experience.

Use:

- clear labels
- neutral input surfaces
- subtle borders
- visible focus states
- navy primary actions
- readable validation messages

Do not use placeholder text as the only field label.

Maintain consistent input height, spacing, and radius across the LMS.

---

## Tables

Tables should remain primarily neutral and functional.

Use:

- white surface
- subtle borders
- navy or strong foreground headings
- muted secondary information
- semantic status badges

Avoid large areas of saturated navy inside data-heavy tables.

Use brand colors primarily for:

- selected states
- links
- important actions
- status indicators where appropriate

---

## Navigation

Navigation should strongly reinforce the LMS brand.

Navy is appropriate for:

- sidebar backgrounds
- active navigation
- headers
- selected states

depending on the existing application architecture.

Use gold and green accents sparingly.

Active navigation should be clearly distinguishable without relying solely
on color.

---

## Design Consistency Rule

Before creating a new UI pattern, ask:

1. Does an existing component already solve this?
2. Does another LMS page already establish this pattern?
3. Can the existing design system support it?
4. Is a new visual pattern actually necessary?

Prefer consistency over novelty.

The login page is the initial design reference, but as additional LMS pages
are completed, established reusable application components become the
primary reference for future pages.

Do not continuously redesign components from page to page.