Strong Tower Mock JAMB
Product Design System
1. Design Philosophy

The Strong Tower design system is built around three principles:

1. Clarity

Students must be able to focus entirely on the exam content without distraction.

2. Speed

Every UI interaction must be fast, predictable, and intuitive.

3. Trust

The interface must feel credible, structured, and professional to replicate the seriousness of a real exam environment.

The system combines:

Modern SaaS dashboard aesthetics

Clean education platform clarity

Structured CBT exam interface discipline

The design language draws inspiration from widely respected systems such as:

Google Material Design

Apple Human Interface Guidelines

IBM Carbon Design System

These systems are widely recognised as reliable foundations for scalable UI architecture.

2. Visual Identity

The brand personality should communicate:

reliability

intelligence

confidence

academic seriousness

Tone:

Professional but friendly.

Avoid playful, childish, or overly bright colours.

3. Colour System

The colour palette is designed using the 60–30–10 rule, which balances primary, secondary, and accent colours for usability and visual hierarchy.

Primary Brand Colour

Deep Academic Blue

#1F3A8A

Meaning:

trust

authority

academic credibility

Usage:

navigation bars

primary buttons

key highlights

Secondary Colour

Emerald Focus

#10B981

Meaning:

success

progress

clarity

Usage:

exam progress

correct answers

success states

Accent Colour

Energy Orange

#F97316

Meaning:

urgency

action

attention

Usage:

call-to-action buttons

timers nearing expiration

Neutral Palette
Gray 50   #F9FAFB
Gray 100  #F3F4F6
Gray 200  #E5E7EB
Gray 300  #D1D5DB
Gray 400  #9CA3AF
Gray 500  #6B7280
Gray 600  #4B5563
Gray 700  #374151
Gray 800  #1F2937
Gray 900  #111827

Purpose:

background

text

borders

layout balance

4. Typography System

Typography is the backbone of UI readability.

Many modern digital interfaces rely on highly readable sans-serif fonts known for clarity and flexibility.

Primary Font

Inter

Why:

extremely readable

optimized for digital UI

excellent variable font support

Usage:

UI text
buttons
navigation
forms

Secondary Font

Source Serif / Zilla Slab (optional)

Zilla Slab is a modern open-source serif created for Mozilla branding.

Usage:

headings

content emphasis

learning materials

Font Scale
Display XL    48px
Display L     40px
Heading 1     32px
Heading 2     26px
Heading 3     22px
Body Large    18px
Body Regular  16px
Body Small    14px
Caption       12px
5. Layout Grid System

The design system uses a 12-column grid.

Desktop container width:

1280px

Grid:

12 columns
24px gutters

Tablet:

8 columns

Mobile:

4 columns
6. Spacing System

Consistent spacing improves readability.

Spacing scale:

4px
8px
12px
16px
24px
32px
40px
48px
64px

Rule:

Always use the scale.

Never random spacing.

7. Border Radius
Small      6px
Medium     10px
Large      16px
Card       20px

Rounded corners soften the UI and modernise the design.

8. Elevation System

Elevation creates hierarchy.

Level 0
flat

Level 1
shadow-sm

Level 2
shadow-md

Level 3
shadow-lg

Example:

Cards use level 1.

Modals use level 3.

9. Buttons
Primary Button

Purpose:

Main actions

Style

Background: #1F3A8A
Text: white
Radius: 10px
Padding: 12px 20px
Secondary Button
Background: transparent
Border: 1px solid gray-300
Text: gray-800
Danger Button
Background: #DC2626
Text: white

Used for:

exam submission

destructive actions

10. Form Inputs

Input style:

border-radius: 10px
padding: 12px
border: 1px solid gray-300

Focus state:

border-color: primary blue
box-shadow: subtle glow
11. Navigation Design

Main navigation:

Left sidebar navigation.

Sections:

Dashboard
Start Exam
Exam History
Performance
Settings
12. Exam Interface Layout

The exam screen is the most important UI.

Layout structure:

-------------------------------------
Top Bar
Timer | Subject | Submit
-------------------------------------

Question Area

-------------------------------------

Options
A
B
C
D

-------------------------------------

Navigation
Previous | Next

-------------------------------------

Question Palette
1 2 3 4 5 6 7 8
13. Question Palette Behaviour

Colours indicate state:

Unanswered  gray
Answered    blue
Current     green
Flagged     orange
14. Mobile Design

Mobile is critical.

Rules:

Timer always visible.

Question palette collapses.

Bottom navigation replaces sidebar.

Mobile layout:

Timer
Question

Options

Next button
15. Accessibility

Accessibility compliance:

WCAG 2.1

Minimum contrast ratio:

4.5:1

Accessible colour contrast improves readability and usability.

16. Micro-Interactions

Animations must be subtle.

Examples:

Button hover

scale 1.02
200ms

Correct answer animation:

green highlight fade

Timer warning:

pulsing orange at 5 minutes
17. Icon System

Use a consistent icon set.

Recommended:

Lucide icons
Heroicons

Style:

Outline icons

Size:

16px
20px
24px
18. Component Library

Core components:

Button
Input
Dropdown
Modal
Card
Tabs
Badge
Progress bar
Alert
Tooltip
19. Dark Mode

Dark mode improves long exam sessions.

Dark palette:

Background #0F172A
Card #1E293B
Text #F8FAFC
Primary #3B82F6
20. Performance Guidelines

UI must feel fast.

Rules:

Animations under 300ms

No heavy shadows.

Lazy load heavy components.

21. Design Tokens

Example tokens:

--color-primary
--color-secondary
--radius-md
--space-16
--font-body
22. Component Naming

Use predictable naming.

Example:

STButton
STCard
STInput
STModal
23. UI Style Characteristics

The design style should feel like:

Linear

Notion

Stripe dashboard

Modern SaaS platforms

Clean.

Minimal.

Focused.

24. Illustration Style

Use:

thin line illustrations

academic themes

subtle gradients

Avoid cartoon styles.

25. Design Deliverables

Complete design assets include:

Figma Design System
Component Library
Responsive Layouts
Design Tokens
UI Kit

26. Final Design Principle

Every UI element must answer one question:

Does this help the student focus on the exam?

If not, remove it.