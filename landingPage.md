# LearnAxis — LMS Landing Page Design Spec

A single-page marketing site for an online learning platform ("LearnAxis"). Clean, modern SaaS/EdTech style with a dark-green + lime-yellow accent palette, generous whitespace, and rounded, soft-shadow UI elements.

---

## 1. Design Tokens

### Colors
| Token | Hex (approx) | Usage |
|---|---|---|
| `--brand-dark-green` | `#0B3D2E` | Hero background, dark section backgrounds, primary buttons (secondary style) |
| `--brand-lime` | `#D6F84C` | Primary CTA buttons, highlight badges, accent underlines, link hover |
| `--brand-black` | `#0A0A0A` | Footer background, headings |
| `--text-dark` | `#111111` | Body headings on light sections |
| `--text-muted` | `#6B7280` | Paragraph/body copy, secondary text |
| `--surface-white` | `#FFFFFF` | Main page background |
| `--surface-light-gray` | `#F5F6F5` / `#F0F2EF` | Alternating section backgrounds ("Your Learning Journey", stats) |
| `--border-light` | `#E5E7EB` | Card borders, dividers |

### Typography
- **Font family:** Modern grotesque sans-serif (e.g. "General Sans", "Inter", or "Satoshi" — geometric, slightly rounded terminals).
- **Headings:** Bold/Semibold, tight letter-spacing, large scale (H1 ~48–56px, H2 ~36–40px).
- **Body text:** Regular weight, `#6B7280`, ~15–16px, relaxed line-height (~1.6).
- **Nav/labels:** Medium weight, ~14–15px.
- **Stat numbers (e.g. "270+", "95%", "1M+"):** Extra bold, large (~32–40px), dark green or black.

### Shape & Spacing
- Large corner radius throughout: buttons fully pill-shaped (`border-radius: 999px`), cards/images ~16–24px radius.
- Soft drop shadows on cards and the hero laptop browser-chrome frame.
- Generous section padding (~80–120px vertical on desktop).
- Max content width ~1200–1280px, centered.

### Buttons
- **Primary (lime):** Pill shape, `background: lime`, dark text, no border. e.g. "Get started".
- **Secondary (dark green):** Pill shape, dark green background, white text, often paired with an icon (e.g. phone icon + number).
- **Outline/ghost (footer email capture):** Transparent with light border, lime circular submit button with arrow icon inside the input field.

---

## 2. Page Structure (top to bottom)

### 2.1 Browser Chrome Wrapper
The entire design is presented inside a mock browser window (macOS-style traffic-light dots, address bar showing "figma.com"). **This is a Figma presentation frame — do not include it in the actual build**, it's not part of the live site.

### 2.2 Header / Navigation
- Left: Logo wordmark "**LearnAxis**" (bold, black/white depending on section bg).
- Center: Nav links — `Home | Courses | Instructors | Testimonial | Blog`.
- Right: "Contact us" link/button.
- Transparent, sits on top of the dark-green hero.

### 2.3 Hero Section (dark green background, full-bleed)
- **Layout:** Two-column — left text block, right photo of a woman in an orange sweater holding a laptop, giving an "OK" hand gesture, surrounded by small floating icon badges (star/flower shape, checkmark badge, diamond/gem icon) in lime and white, plus a subtle wireframe/line-art globe graphic behind her.
- **Headline (H1, white, bold, large):** "Leading educational platforms available online"
- **Subtext (light gray/white 70% opacity):** "Online courses from the world's leading experts. Join 17 million learners today"
- **CTA button:** Lime pill button, "Get started"
- **Stat row below CTA** (white bold numbers, small caption not shown/optional): `270+`  `5550+`  `330+`

### 2.4 Trusted-By / Logo Strip (white background)
- Centered row of 5 partner/integration logos, grayscale-friendly but shown in brand color: **Google, Trello, monday.com, Notion, Slack**.
- Thin horizontal dividers above/below the strip.

### 2.5 "Your Online Learning Journey Made Easy" (light gray background)
- **Section heading (H2, bold, black):** "Your Online Learning Journey Made Easy"
- **Subtext (muted gray, ~2 lines):** placeholder/lorem-style supporting copy.
- **3-step numbered process row**, each with a dark-green circular numbered badge, a dotted horizontal connector line between steps, bold title, and short muted description:
  1. **01 — Choose Your Course**
  2. **02 — Sign Up and Pay**
  3. **03 — Learn and Engage**

### 2.6 Popular Courses (white background)
- **Left:** Section heading "Popular courses"
- **Right:** Filter tabs — `All | Development | Business | Design | Marketing` (first item active/underlined).
- **Grid of course cards** (3+ visible, carousel-style), each card:
  - Large rounded photo of an instructor/professional.
  - Small circular price/tag badge overlapping bottom-left corner of image (lime starburst shape) showing price, e.g. "$60".
  - Below image: category label + instructor name (e.g. "Expert Instructor – Fatema Iha", "Finance – Leonel Money", "Design – Abrar Islam").

### 2.7 "Offering Premier Online Learning Opportunities" (white background, two-column)
- **Left column:**
  - H2: "Offering premier online learning opportunities."
  - A mock video-call/classroom UI card (browser-chrome style) showing a grid of participant thumbnails labeled "Instructor," with two pill buttons below: dark-green "Present" and lime/pink "Call" (with phone icon).
  - Faint diagonal line-pattern texture in the background.
- **Right column:**
  - Subheading: "Premium learning experience."
  - 3 feature bullets, each with a small rounded icon tile + short two-line description:
    1. Grid icon — "Teachers don't get lost in the grid view and have a dedicated Podium space."
    2. Yellow/green square icon — "TA's and presenters can be moved to the front of the class."
    3. People icon — "Teachers can easily see all students and class data at one time."
- **Bottom of section:** oversized faint/ghost background text reading "Amazing learning course..." bleeding off-screen (decorative typographic element).

### 2.8 Testimonial / Trust Stats ("Students feedback")
- **Left column:**
  - Small label with a short leader line: "Students feedback"
  - H2: "Trusted by genius people."
  - Supporting paragraph (muted gray).
  - **3 stacked stats**, each a large bold number + short label:
    - `95%` — Student's complete course successfully.
    - `1M+` — Positive user ratings worldwide.
    - `10K` — Trusted by thousands of learners and educators.
- **Right column:** Large portrait photo (woman in bookstore/library holding books) with an overlapping white testimonial card in the bottom-left:
  - Quote text (muted).
  - Name: "Emiliya Cart"
  - 5-star rating + "12 Reviews"
  - Thin lime accent bar on the left edge of the card.

### 2.9 Latest Articles (white background)
- **H2:** "Latest articles"
- **3-column blog card grid**, each card:
  - Rounded photo.
  - Small circular author avatar + "By [Name]" byline.
  - Bold headline (2 lines max).
  - Muted excerpt text ("Lorem ipsum has been industry standard dummy text ever…").
- **Pagination row below:** `‹  01  02  03  04  ›` (01 active/bold).

### 2.10 Final CTA Banner (white → transitions into footer)
- **Two-column:**
  - Left: H2 "Admission is open for the next year batch." + muted supporting line about enrollment.
  - Right: two stacked/side-by-side pill buttons — lime "Get started now" and dark-green "📞 +12345678910".
- Faint wireframe line-art texture in background, similar to hero.

### 2.11 Footer (black background, white/gray text)
- **4-column layout:**
  1. Logo "LearnAxis" + one-line tagline ("We are providing high-quality courses for about ten years.") + email signup input with a circular lime submit button (arrow icon).
  2. **Popular Courses:** Business finance, Advanced design, Web development, Data visualization
  3. **Support:** Help center, Account information, About, Contact us
  4. **Need help?:** "Call us directly?" +12345678910, "Need support?" Help@domain.com
- **Bottom bar:** thin divider, centered secondary nav repeat: `Home | Courses | Instructors | Testimonial | Blog`.

---

## 3. Imagery Style
- All photography: warm, candid, editorial-style portraits (diverse subjects, natural lighting, lifestyle/work settings — laptops, bookstores, cozy home offices).
- Photos consistently have large rounded corners and occasional soft shadow.
- Decorative elements: thin wireframe/topographic line-art patterns used as background texture on dark and light sections; small geometric badge icons (star, diamond, checkmark, square) in lime/white scattered near hero photo.

## 4. Responsive Notes
- Layout is desktop-first (max-width container, 2-column splits).
- On mobile: stack all 2-column sections vertically (text above image), collapse nav into a hamburger, course/article grids become horizontally scrollable or single-column, footer columns stack.

## 5. Build Notes for Recreation
- Use pill-shaped buttons and rounded-corner (16–24px) cards/images consistently — this is the site's strongest signature.
- Keep the dark-green + lime-yellow combo exclusive to CTAs, hero, and footer/dark sections; everything else stays white/light-gray with black/gray text for contrast.
- Numbers and stats should be visually oversized relative to their labels to emphasize social proof.
- Use dotted/thin connector lines for the 3-step process and subtle line-art textures for section backgrounds — avoid heavy imagery or gradients elsewhere.