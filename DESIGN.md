# KodNest Premium Build System

A comprehensive design system for the KodNest Premium application, enforcing consistency across colors, typography, spacing, layout structure, and component rules.

## Core Principles

1. **Calm, Intentional, Coherent** - Design choices should feel purposeful and harmonious
2. **Consistent Spacing** - All spacing uses the `sp-1` to `sp-5` scale
3. **Unified Transitions** - All animations use 150-200ms ease-in-out timing
4. **Strict Color Palette** - Maximum of 4 core colors plus derived semantic tokens
5. **Typography Hierarchy** - Clear distinction between headings (Lora) and body (DM Sans)

## Color System

### Core 4-Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--kn-background` | `#F7F6F3` (HSL: 40 18% 95%) | Main page background |
| `--kn-text` | `#111111` (HSL: 0 0% 7%) | Primary text color |
| `--kn-accent` | `#8B0000` (HSL: 0 100% 27%) | Primary CTAs, active states |
| `--kn-muted` | `#F2EFE8` (HSL: 40 10% 88%) | Disabled states, subtle backgrounds |

### Semantic Tokens (Derived from 4-color palette)

- `primary` - Maps to accent (dark red) for primary actions
- `secondary` - Neutral backgrounds for secondary elements
- `muted` - Disabled/placeholder states
- `border` - Subtle boundaries
- `input` - Form input borders
- `card` - Slightly elevated card backgrounds
- `destructive` - Same as accent (dark red)
- `success` - Muted green derived from palette (HSL: 140 15% 30%)
- `warning` - Muted amber/brown derived from palette (HSL: 35 45% 35%)

## Typography

### Font Families

- **Headings**: `Lora` (Georgia fallback) - Serif font for titles
- **Body**: `DM Sans` (system-ui fallback) - Sans-serif for UI text

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| `h1` | 36px (text-4xl) | Semibold | 1.2 |
| `h2` | 24px (text-2xl) | Semibold | 1.2 |
| `h3` | 20px (text-xl) | Medium | 1.2 |
| `h4` | 18px (text-lg) | Medium | 1.2 |
| Body | 16px | Normal | 1.7 |
| UI Text | 16px | Normal | 1.5 |

### Text Constraints

- **Max Width**: 720px for narrative text blocks (`.max-w-prose`)
- **Letter Spacing**: `-0.01em` for headings
- **Font Smoothing**: Antialiased for all text

## Spacing Scale

All spacing must use the `sp-` prefix classes from the following scale:

| Token | Value | Usage |
|-------|-------|-------|
| `sp-1` | 8px | Tight spacing between small elements |
| `sp-2` | 16px | Default element spacing |
| `sp-3` | 24px | Section spacing |
| `sp-4` | 40px | Major section separation |
| `sp-5` | 64px | Page-level spacing |

### Examples

```tsx
// Good - using spacing scale
<div className="px-sp-2 py-sp-1 gap-sp-2">
  <Button className="px-sp-2">Click me</Button>
</div>

// Bad - arbitrary spacing values
<div className="px-4 py-2 gap-3">
  <Button className="px-6">Click me</Button>
</div>
```

## Transitions

### Duration Scale

All transitions must use the following durations:

| Token | Value | Usage |
|-------|-------|-------|
| `duration-kn-fast` | 150ms | Micro-interactions (hover, focus) |
| `duration-kn-base` | 180ms | Standard interactions |
| `duration-kn-slow` | 200ms | Complex animations |

### Easing

- **All transitions**: `ease-in-out`

### Examples

```tsx
// Good - using design system transitions
<Button className="transition-all duration-kn-base ease-in-out hover:bg-primary/90">
  Click me
</Button>

// Bad - arbitrary timing
<Button className="transition-all duration-300 ease-in-out hover:bg-primary/90">
  Click me
</Button>
```

## Border Radius

Consistent radius system:

| Token | Value | Usage |
|-------|-------|-------|
| `lg` (var(--radius)) | 6px | Default for cards, buttons |
| `md` | 4px (calc(6px - 2px)) | Smaller elements |
| `sm` | 2px (calc(6px - 4px)) | Minimal radius |

## Component Rules

### Buttons

- Default variant uses accent color (`bg-primary`)
- Outline and ghost variants use neutral colors
- Consistent padding: `px-sp-2 py-sp-1` (default)
- All states have `duration-kn-base ease-in-out` transitions
- Focus ring: `ring-2 ring-ring ring-offset-2 ring-offset-background`

### Inputs

- Border: `border-input` (derived from muted)
- Padding: `px-sp-2 py-sp-1`
- Focus ring: `ring-2 ring-ring ring-offset-2`
- Transition: `duration-kn-base ease-in-out`

### Cards

- Background: `bg-card` (slightly lighter than page background)
- Border: `border-border`
- Radius: `rounded-md` (6px)
- Header padding: `px-sp-3 py-sp-2`
- Content padding: `px-sp-3 py-sp-0`

### Badges

- Default variant: accent background
- Secondary variant: neutral background
- Outline variant: border only, transparent background
- Rounded: `rounded-full`
- Consistent text size: `text-xs`

## Layout Structure

### Global Layout

```
┌─────────────────────────────────────┐
│  Top Bar (fixed)                  │
│  - Logo (left)                    │
│  - Progress indicator (center)      │
│  - Status badge + Nav (right)      │
├─────────────────────────────────────┤
│  Context Header                    │
│  - Page title                     │
│  - Description                    │
│  - Optional actions               │
├─────────────────────────────────────┤
│  Primary Workspace (70%)          │
│  ┌───────────────────┐           │
│  │                   │           │
│  │  Page Content     │           │
│  │                   │           │
│  └───────────────────┘           │
│                                 │
│  Secondary Panel (30%)            │
│  ┌───────────┐                  │
│  │           │                  │
│  │  Sidebar  │                  │
│  │           │                  │
│  └───────────┘                  │
├─────────────────────────────────────┤
│  Proof Footer (on Proof page)     │
│  - Checklist status               │
│  - Quick links                   │
└─────────────────────────────────────┘
```

### Context Header

Used on every page to provide context:

```tsx
<ContextHeader
  title="Page Title"
  description="Brief description of the page's purpose"
  actions={<Button>Action</Button>}
/>
```

### Page Container Pattern

All pages follow this structure:

```tsx
<div className="flex flex-1 flex-col px-sp-4 py-sp-4">
  <div className="mx-auto w-full max-w-5xl space-y-sp-4">
    <ContextHeader ... />
    {/* Page content */}
  </div>
</div>
```

## Empty/Error States

### Empty State Pattern

```tsx
<div className="flex flex-col items-center justify-center px-sp-4 py-sp-5">
  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-primary/30 bg-primary/5">
    <Icon className="h-10 w-10 text-primary/60" />
  </div>
  <h2 className="mt-sp-4 font-heading text-2xl font-semibold">
    Empty State Title
  </h2>
  <p className="mt-sp-2 text-muted-foreground max-w-prose">
    Brief guidance text explaining the empty state.
  </p>
  <Button variant="default" className="mt-sp-4">
    Action to resolve
  </Button>
</div>
```

### Error State Pattern

```tsx
<Card className="border-warning/30 bg-warning/10">
  <CardContent className="flex items-center justify-between gap-sp-2 px-sp-3 py-sp-2">
    <p className="text-foreground text-sm">
      Warning or error message
    </p>
    <Button variant="outline" size="sm">
      Resolve Action
    </Button>
  </CardContent>
</Card>
```

## Accessibility Guidelines

### Contrast Ratios

- Normal text (16px+): Minimum 4.5:1
- Large text (24px+): Minimum 3:1
- UI components: Minimum 3:1

### Focus States

All interactive elements must have visible focus states:

```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

### Screen Reader Support

- Use semantic HTML elements
- Provide `aria-label` for icon-only buttons
- Ensure form inputs have associated `<label>` elements

## Implementation Checklist

When adding new components or pages, ensure:

- [ ] Spacing uses `sp-1` to `sp-5` scale only
- [ ] Transitions use `duration-kn-fast/base/slow` with `ease-in-out`
- [ ] Colors use semantic tokens (not arbitrary values)
- [ ] Typography follows the hierarchy (Lora for headings, DM Sans for body)
- [ ] Border radius uses `rounded-md` (6px) or derived values
- [ ] Buttons use the `Button` component with correct variants
- [ ] Forms use `Input`, `Select`, etc. components
- [ ] Focus states are visible and consistent
- [ ] Empty/error states follow the patterns above
- [ ] Max text width is 720px for narrative content

## File Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (styled with design system)
│   ├── ContextHeader.tsx # Reusable page header component
│   └── TopBar.tsx      # Global navigation bar
├── layouts/
│   └── AppLayout.tsx    # Global layout wrapper
├── pages/               # Feature pages (all follow design patterns)
└── index.css           # Global CSS variables and base styles
```

## Dark Mode

The design system includes a minimal dark mode theme that inverts the core colors:

- Background: `#141414` (HSL: 0 0% 8%)
- Text: `#F7F6F3` (HSL: 40 18% 95%)
- Accent: `#8B4513` (HSL: 0 70% 35%)

All semantic tokens are automatically adjusted for dark mode through CSS variables.
