# Fuji Japanese Academy — Visual Art Direction & Generation Prompts

## 1. Brand Aesthetic & Art Direction Manifesto

### Brand Aesthetic
- **Core Pillars:** Premium, Modern, Professional, Educational, Japanese-inspired, Clean, Trustworthy.
- **Atmosphere:** Blends authentic Japanese architectural and design minimalism (cedarwood, shoji, wabi-sabi simplicity, clean lines) with contemporary high-tech corporate environments (Bengaluru tech corridors & Tokyo tech hubs like Roppongi/Shibuya).
- **Subjects:** Authentic, diverse representation — ambitious Indian software engineers, corporate professionals, college students, alongside native Japanese sensei (instructors) and business executives. Expressions must radiate authentic warmth, focus, intellectual rigor, and cultural respect.

### Technical & Stylistic Requirements
- **Visual Style:** Photorealistic commercial photography, 8k resolution, cinematic natural lighting, ultra-fine texture rendition (linen, cedar grain, washi paper, brushed aluminum, silk ties).
- **Lighting Scheme:** Soft directional natural daylight, golden-hour rim accents, subtle architectural ambient glow. No harsh synthetic flashes or unnatural high-contrast neon glows.
- **Compositional Framing:** Deliberate use of cinematic negative space (shallow depth of field, soft bokeh, architectural framing) to ensure clean UI typography and badge overlays without visual collision.

### Absolute Negative Constraints (Zero AI Hallucinations)
- **NO Cartoon / Anime Style:** Strictly real-life commercial photography only.
- **NO Cheap Stock Look:** Avoid clichéd thumbs-up poses, exaggerated artificial smiles, or sterile blank white backdrops.
- **NO Rendered Text / AI Gibberish:** Absolutely zero rendered text, Japanese typography, fake characters, logos, watermarks, phone numbers, prices, or URLs embedded within the generated pixels.
- **NO Anatomical Distortions:** Physically accurate hands, correct finger counts, realistic eye contact, and natural skin micro-textures.

---

## 2. Image Asset Catalog & Generation Prompts

### Category 1: Core Courses (16:9 Aspect Ratio)

#### 1. JLPT N5 — Beginners Foundation
- **Destination File:** `/public/images/courses/jlpt-n5.jpg`
- **Tool ImageName:** `jlpt_n5_beginner`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & course detail header.
- **Composition & Negative Space:** Subject placed in the right two-thirds. Warm natural negative space on the upper left for level badges ("N5" / "Beginner") and course title overlay.
- **Prompt:**
> Professional commercial photography, 8k resolution. A motivated young Indian student in smart casual clothing seated at a minimalist natural Japanese cedarwood study desk in a sunlit modern academy classroom. On the desk are high-quality Japanese study workbooks with clean handwritten stroke-order exercises, a precision fountain pen, and a minimalist ceramic tea cup. In the softly blurred background, a warm shoji screen and subtle architectural wood slat wall diffuse soft morning sunlight. Warm cinematic lighting, shallow depth of field, authentic expression of curiosity and focus. Clean negative space on the upper left for UI text overlay. Absolutely no text, no logos, no anime style, no distorted hands.

---

#### 2. JLPT N4 — Basic Conversational Proficiency
- **Destination File:** `/public/images/courses/jlpt-n4.jpg`
- **Tool ImageName:** `jlpt_n4_conversation`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & SSW visa focus section.
- **Composition & Negative Space:** Medium two-shot situated slightly right of center; left third blurred with architectural warmth.
- **Prompt:**
> Photorealistic editorial photography of an interactive language study session. A young Indian corporate professional and an encouraging Japanese peer engaged in realistic conversational dialogue in a sleek, modern Japanese study lounge. They are referencing study flashcards and a clean metro transit guide laid out on a light hinoki wood table. Warm diffuse interior lighting mixed with soft window light, natural smiling expressions, authentic speaking cadence. Clean soft-focus background featuring contemporary blonde oak bookshelves. Negative space in upper left. Zero anime styling, natural hand anatomy, no rendered text, no watermarks, 8k resolution.

---

#### 3. JLPT N3 — Intermediate Business Japanese
- **Destination File:** `/public/images/courses/jlpt-n3.jpg`
- **Tool ImageName:** `jlpt_n3_intermediate`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & career accelerator highlight.
- **Composition & Negative Space:** Asymmetric rule-of-thirds composition, subject anchored at center-right, left side open for high-contrast typography.
- **Prompt:**
> High-end commercial photography capturing career progression and focused study. An Indian software engineer in business-casual attire seated at an executive workstation with a slim modern laptop and an open Japanese business reading dossier. Standing nearby with respectful posture, an experienced Japanese instructor offers guidance, gesturing politely toward the material. Cinematic corporate lighting streaming through high-rise glass windows with a soft bokeh of a metropolis skyline. Focused, ambitious atmosphere bridging technical skills with language mastery. Ample clean negative space on the left third for UI copy. No rendered typography, no cartoon features, 8k resolution.

---

#### 4. JLPT N2 — Advanced Business & Professional
- **Destination File:** `/public/images/courses/jlpt-n2.jpg`
- **Tool ImageName:** `jlpt_n2_advanced`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & executive leadership tier.
- **Composition & Negative Space:** Cinematic medium shot; subject positioned at right-center with clean corporate glass framing on the left.
- **Prompt:**
> Cinematic commercial photography of executive professional fluency. A poised Indian IT consultant in a tailored navy blazer actively participating in a high-level business meeting in a prestigious Tokyo glass-walled conference room. The atmosphere reflects corporate prestige, with subtle Japanese design motifs, minimalist frosted glass panels, and warm cedar accents. Natural morning rim lighting highlights sharp tailored clothing and confident, articulate expression. Clean negative space on the left side for UI headers. Photorealistic, 8k, natural skin tones, perfectly rendered hands, zero text or graphics overlay.

---

#### 5. Business Japanese & Corporate Keigo
- **Destination File:** `/public/images/courses/business-japanese.jpg`
- **Tool ImageName:** `business_japanese_keigo`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & corporate readiness module.
- **Composition & Negative Space:** Close-medium shot focused on the respectful business card exchange gesture in the right half, leaving left area smooth and blurred.
- **Prompt:**
> Premium commercial photography depicting authentic Japanese business etiquette (Meishi Koukan). An Indian corporate manager and a Japanese executive in sharp business suits exchanging business cards using both hands with a respectful slight bow. Set in a luminous, contemporary corporate lobby with architectural Japanese wood lattice and floor-to-ceiling glass. Crisp focus on the respectful hand gesture and cards (blank cards without legible text). Soft ambient bokeh, cinematic natural lighting, impeccable cultural authenticity. Clean negative space on the left third for UI overlay. No text, no anime style, 8k resolution.

---

#### 6. Japanese for IT Professionals & Software Engineers
- **Destination File:** `/public/images/courses/japanese-for-it-professionals.jpg`
- **Tool ImageName:** `japanese_it_professionals`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & tech career spotlight.
- **Composition & Negative Space:** Modern office setting with engineers on right, clean architectural glass on upper left.
- **Prompt:**
> Modern tech workplace editorial photography. An Indian software engineer and a Japanese tech lead collaborating comfortably in front of dual high-resolution programming monitors in an airy, contemporary open-plan tech office in Tokyo. Ergonomic chairs, minimalist desk setup with clean mechanical keyboard and notebooks. Collaborative, energetic Agile standup atmosphere. Cool diffuse daylight balanced with warm architectural LED strip lights. Wide aspect ratio with clean negative space on top and left. Photorealistic, sharp 8k details, authentic technical work environment, zero fake text, no cartoon style.

---

#### 7. Spoken Japanese / Conversational Kaiwa
- **Destination File:** `/public/images/courses/spoken-japanese.jpg`
- **Tool ImageName:** `spoken_japanese_kaiwa`
- **AspectRatio:** `16:9`
- **UI Placement:** Course catalog card & beginner conversational section.
- **Composition & Negative Space:** Dynamic small group on right side, warm soft-focus room ambience on left.
- **Prompt:**
> Warm, candid commercial photography of dynamic conversational language practice. A small group of diverse learners, including an Indian professional and an international student, engaged in a lively, smiling Japanese conversation circle in a modern cultural cafe lounge. Ceramic matcha cups on a round blonde oak table, relaxed natural hand gestures of enthusiastic dialogue. Bright, cheerful natural daylight pouring in from floor-to-ceiling windows. High depth of field keeping focus on joyful, expressive faces. Generous negative space on the left for promotional copy. No anime, no distorted faces, no text, 8k resolution.

---

#### 8. Corporate Japanese Training for Enterprises
- **Destination File:** `/public/images/courses/corporate-japanese-training.jpg`
- **Tool ImageName:** `corporate_japanese_training`
- **AspectRatio:** `16:9`
- **UI Placement:** B2B enterprise page banner & course card.
- **Composition & Negative Space:** Panoramic training hall view with presenter at right-center and audience framing lower edge; upper left wide open.
- **Prompt:**
> Wide commercial corporate photography of an enterprise language training seminar. A spacious, high-tech corporate training auditorium inside an IT enterprise campus in Bengaluru. An experienced bilingual instructor stands at the front addressing an attentive cohort of software engineers seated at curved seminar tables with company laptops. Modern architectural acoustic paneling, soft recessed overhead lighting, premium executive atmosphere. Wide-angle framing with expansive clean negative space in the upper third for headline text and call-to-action buttons. 8k, photorealistic, pristine professional quality, zero text on screen.

---

### Category 2: Homepage & Section Banners

#### 9. Hero Student Portrait & Learning Scene
- **Destination File:** `/public/images/hero-student-portrait.jpg`
- **Tool ImageName:** `hero_student_learning`
- **AspectRatio:** `4:3`
- **UI Placement:** Homepage Hero section right-hand showcase card.
- **Composition & Negative Space:** Protagonist positioned slightly right of center, looking warmly into camera; soft cedar and shoji framing around edges.
- **Prompt:**
> Aspirational commercial portrait of an ambitious young Indian professional (mid-20s, smart business casual) sitting at an elegant Japanese cedar study desk. They are smiling warmly and confidently toward the camera, holding a fine-tip pen beside an open notebook and clean laptop. Soft golden-hour morning sunlight streams from an adjacent window, creating a subtle rim light on their shoulders and hair. Background features a refined, minimalist Tokyo-style study room with soft shoji panels and a miniature green bonsai plant. Elegant shallow depth of field, natural skin texture, welcoming and trustworthy expression. No text, no anime style, 8k resolution.

---

#### 10. Corporate Training Banner
- **Destination File:** `/public/images/banners/corporate-training-banner.jpg`
- **Tool ImageName:** `corporate_training_banner`
- **AspectRatio:** `16:9`
- **UI Placement:** Full-width section banner on Homepage and Corporate Training page.
- **Composition & Negative Space:** Wide panoramic framing; business delegation grouped on the right half, left half dedicated to a clean, sunlit glass facade with vast negative space for large UI typography.
- **Prompt:**
> Cinematic panoramic commercial photography of global business cross-cultural collaboration. Senior corporate executives and engineering managers from India and Japan standing in discussion near panoramic floor-to-ceiling windows in a premier Tokyo skyscraper boardroom. Soft morning city skyline visible through the glass. Refined corporate attire, poised professional body language, natural warm ambient lighting. Composition deliberately weighted towards the right two-thirds, providing clean, uncluttered negative space on the left third for high-contrast white website typography. Photorealistic, 8k resolution, zero text.

---

#### 11. Classroom Immersion Banner
- **Destination File:** `/public/images/banners/classroom-immersion-banner.jpg`
- **Tool ImageName:** `classroom_immersion_banner`
- **AspectRatio:** `16:9`
- **UI Placement:** Full-width immersion section & About Us academy facility showcase.
- **Composition & Negative Space:** Wide horizontal shot of a contemporary classroom; students seated in a neat horseshoe arrangement; upper 40% clean wall and ceiling space.
- **Prompt:**
> Architectural and lifestyle commercial photography of an authentic, modern Japanese language academy classroom. Small intimate cohort of focused Indian students seated at individual natural blonde wood desks in an interactive semi-circular layout. At the front, a Japanese instructor in smart business attire writes with a stylus on an interactive digital display (display shows abstract geometric layout without legible text). Minimalist Japanese cedar wall slats, warm indirect cove lighting, spotless clean modern educational interior. Expansive negative space across the upper half of the frame for overlay banners. Photorealistic, 8k, no text.

---

#### 12. Cultural Workshops Banner (Calligraphy & Origami)
- **Destination File:** `/public/images/banners/cultural-workshops-banner.jpg`
- **Tool ImageName:** `cultural_workshops_banner`
- **AspectRatio:** `16:9`
- **UI Placement:** Cultural immersion section & free workshop landing section.
- **Composition & Negative Space:** Close-up raking angle; hands and artisan tools in lower-right quadrant; smooth dark wooden table filling upper-left quadrant.
- **Prompt:**
> Exquisite high-end editorial still life photography of authentic Japanese cultural arts. Deliberate macro focus on the poised hands of an Indian student and a Japanese master artisan practicing traditional Shodo calligraphy. A bamboo brush with rich black sumi ink hovers gracefully above textured handmade fibrous Washi paper (blank paper without text). Beside the paper rest handcrafted washi origami cranes and a carved stone inkstone on a dark oiled Hinoki wood table. Dramatic warm side lighting capturing rich tactile paper textures and ink sheen. Quiet, mindful Zen ambiance with generous negative space on the top left. Photorealistic, 8k.

---

### Category 3: Faculty Sensei Portraits (1:1 Aspect Ratio)

#### 13. Hiroshi Tanaka — Head Instructor & Academic Director
- **Destination File:** `/public/images/faculty/hiroshi-tanaka.jpg`
- **Tool ImageName:** `faculty_hiroshi_tanaka`
- **AspectRatio:** `1:1`
- **UI Placement:** About Us & Faculty showcase circular card.
- **Composition & Negative Space:** Classic head-and-shoulders executive portrait, centered, with rich soft bokeh in the background.
- **Prompt:**
> Professional corporate headshot photography, 1:1 square aspect ratio. A distinguished Japanese male educator in his late 40s with a warm, intellectual, and dignified demeanor. Wearing a tailored charcoal grey blazer over a crisp open-collar white shirt. Neat, modern grooming, wearing subtle tortoiseshell glasses, warm and approachable smile radiating 15+ years of pedagogical expertise. Background is a softly blurred modern Japanese academy library with warm cedar bookshelves and gentle ambient lighting. Rembrandt studio lighting, crisp eye focus, natural skin pores, trustworthy academic leader. Strictly photorealistic, no text, 8k resolution.

---

#### 14. Priya Sharma — Senior N1 Trainer & Lead Pedagogy
- **Destination File:** `/public/images/faculty/priya-sharma.jpg`
- **Tool ImageName:** `faculty_priya_sharma`
- **AspectRatio:** `1:1`
- **UI Placement:** About Us & Faculty showcase circular card.
- **Composition & Negative Space:** Centered head-and-shoulders studio portrait, bright and luminous background.
- **Prompt:**
> Professional commercial headshot photography, 1:1 square aspect ratio. An articulate, confident Indian woman in her early 30s with an inspiring and knowledgeable presence. Wearing a sophisticated cream-colored tailored blazer and minimalist silver necklace. Radiant, friendly, and authoritative smile reflecting N1 mastery and corporate translation background. Background is a bright, sunlit modern educational studio with light maple wood slats and soft greenery softly out of focus. Soft directional beauty lighting, tack-sharp iris detail, photorealistic skin texture, empowering educator portrait. No text, 8k resolution.

---

#### 15. Kenji Sato — Cultural Advisor & Corporate Coach
- **Destination File:** `/public/images/faculty/kenji-sato.jpg`
- **Tool ImageName:** `faculty_kenji_sato`
- **AspectRatio:** `1:1`
- **UI Placement:** About Us & Faculty showcase circular card.
- **Composition & Negative Space:** Centered executive portrait with subtle shoulder turn; modern corporate architecture backdrop.
- **Prompt:**
> Executive commercial headshot photography, 1:1 square aspect ratio. A polished Japanese corporate coach and language advisor in his early 40s. Wearing an impeccably tailored navy suit, crisp light blue shirt, and subtle silk necktie. Poised, professional posture, warm and confident gaze communicating Keigo mastery and cross-border business acumen. Background is an out-of-focus executive boardroom in Tokyo with elegant glass reflections and warm architectural wood finishes. Clean rim light, subtle fill, sharp facial contours, trustworthy corporate leader. Photorealistic, 8k, zero text.

---

#### 16. Shilpa S — JLPT N5/N4 Lead Instructor
- **Destination File:** `/public/images/faculty/shilpa-s.jpg`
- **Tool ImageName:** `faculty_shilpa_s`
- **AspectRatio:** `1:1`
- **UI Placement:** About Us & Faculty showcase circular card.
- **Composition & Negative Space:** Centered bust portrait with an inviting, enthusiastic demeanor.
- **Prompt:**
> Studio portrait photography, 1:1 square aspect ratio. An energetic, warm, and highly approachable Indian female instructor in her late 20s. Wearing a smart pastel knit cardigan over a light blouse. Welcoming, supportive smile that radiates encouragement and patience for beginner students. Background is a softly blurred contemporary language studio with warm ambient tones and clean minimalist design. Flattering diffuse softbox lighting, natural skin tones, crystal-clear focus on the eyes, inspiring and friendly demeanor. Photorealistic, 8k resolution, no text.

---

#### 17. Vikram — Spoken Japanese & Phonetics Coach
- **Destination File:** `/public/images/faculty/vikram-spoken.jpg`
- **Tool ImageName:** `faculty_vikram_spoken`
- **AspectRatio:** `1:1`
- **UI Placement:** About Us & Faculty showcase circular card.
- **Composition & Negative Space:** Centered headshot with a friendly, contemporary relaxed feel.
- **Prompt:**
> Contemporary lifestyle headshot photography, 1:1 square aspect ratio. A charismatic and dynamic Indian male language coach in his late 20s. Wearing a tailored slate grey linen jacket over a clean dark crewneck shirt. Engaging, friendly, and expressive smile radiating conversational confidence, quick wit, and fluency. Background is a modern collaborative creative space with subtle acoustic vertical timber fins in soft focus. Cinematic key lighting, shallow depth of field, sharp hair and textile texture, natural skin tones. Photorealistic, 8k resolution, no text.

---

### Category 4: Career & Student Success

#### 18. Japanese IT Office / Modern Tokyo Tech Team
- **Destination File:** `/public/images/career/tokyo-tech-office.jpg`
- **Tool ImageName:** `career_tokyo_tech`
- **AspectRatio:** `16:9`
- **UI Placement:** Career page hero & placement success section.
- **Composition & Negative Space:** Dynamic collaborative circle on the right; left side framed by clean skyscraper architectural glass.
- **Prompt:**
> High-end commercial workplace photography depicting career triumph in Japan. A diverse engineering team, featuring an Indian software engineer and Japanese colleagues, gathered enthusiastically around a sleek standing collaboration table in a high-rise Tokyo tech office in Roppongi. They are examining code architecture diagrams on sleek portable tablets, smiling with genuine professional camaraderie. Expansive panoramic windows reveal the iconic Tokyo cityscape under a soft golden twilight sky. Inspiring, prestigious, high-tech atmosphere representing successful international tech careers. Clean negative space on the upper left for UI typography. 8k, photorealistic, no text.

---

#### 19. Student Graduation & JLPT Certification Success
- **Destination File:** `/public/images/career/student-certification-success.jpg`
- **Tool ImageName:** `student_jlpt_success`
- **AspectRatio:** `16:9`
- **UI Placement:** Testimonials banner & alumni showcase banner.
- **Composition & Negative Space:** Subjects standing proudly in the right half; left half features an open courtyard vista with soft cherry blossom bokeh.
- **Prompt:**
> Heartwarming and prestigious commercial photography celebrating academic milestone. A proud young Indian woman and a young Indian man holding official leather-bound certification folders with dignified joy and broad smiles. They are standing in the serene courtyard of a modern Japanese academic institute with a delicate blooming cherry blossom (Sakura) tree and sleek glass-and-timber architecture softly blurred behind them. Soft natural afternoon daylight, celebratory yet sophisticated tone, razor-sharp focus on the joyful graduates. Clean negative space on the left third for quote overlays. Photorealistic, 8k, no text, no distorted hands.

---

## 3. Quick Reference Matrix for Generation Tool

| # | Asset Identifier | Tool ImageName | AspectRatio | Target Destination Path |
|---|---|---|---|---|
| 01 | JLPT N5 Course | `jlpt_n5_beginner` | `16:9` | `/public/images/courses/jlpt-n5.jpg` |
| 02 | JLPT N4 Course | `jlpt_n4_conversation` | `16:9` | `/public/images/courses/jlpt-n4.jpg` |
| 03 | JLPT N3 Course | `jlpt_n3_intermediate` | `16:9` | `/public/images/courses/jlpt-n3.jpg` |
| 04 | JLPT N2 Course | `jlpt_n2_advanced` | `16:9` | `/public/images/courses/jlpt-n2.jpg` |
| 05 | Business Japanese & Keigo | `business_japanese_keigo` | `16:9` | `/public/images/courses/business-japanese.jpg` |
| 06 | Japanese for IT Professionals | `japanese_it_professionals` | `16:9` | `/public/images/courses/japanese-for-it-professionals.jpg` |
| 07 | Spoken Japanese / Kaiwa | `spoken_japanese_kaiwa` | `16:9` | `/public/images/courses/spoken-japanese.jpg` |
| 08 | Corporate Training Course | `corporate_japanese_training` | `16:9` | `/public/images/courses/corporate-japanese-training.jpg` |
| 09 | Hero Student Portrait | `hero_student_learning` | `4:3` | `/public/images/hero-student-portrait.jpg` |
| 10 | Corporate Training Banner | `corporate_training_banner` | `16:9` | `/public/images/banners/corporate-training-banner.jpg` |
| 11 | Classroom Immersion Banner | `classroom_immersion_banner` | `16:9` | `/public/images/banners/classroom-immersion-banner.jpg` |
| 12 | Cultural Workshops Banner | `cultural_workshops_banner` | `16:9` | `/public/images/banners/cultural-workshops-banner.jpg` |
| 13 | Hiroshi Tanaka Portrait | `faculty_hiroshi_tanaka` | `1:1` | `/public/images/faculty/hiroshi-tanaka.jpg` |
| 14 | Priya Sharma Portrait | `faculty_priya_sharma` | `1:1` | `/public/images/faculty/priya-sharma.jpg` |
| 15 | Kenji Sato Portrait | `faculty_kenji_sato` | `1:1` | `/public/images/faculty/kenji-sato.jpg` |
| 16 | Shilpa S Portrait | `faculty_shilpa_s` | `1:1` | `/public/images/faculty/shilpa-s.jpg` |
| 17 | Vikram Portrait | `faculty_vikram_spoken` | `1:1` | `/public/images/faculty/vikram-spoken.jpg` |
| 18 | Tokyo Tech Office Team | `career_tokyo_tech` | `16:9` | `/public/images/career/tokyo-tech-office.jpg` |
| 19 | Student JLPT Success | `student_jlpt_success` | `16:9` | `/public/images/career/student-certification-success.jpg` |
