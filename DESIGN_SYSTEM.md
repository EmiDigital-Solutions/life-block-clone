# Connectimus Design System

## Overview
This document outlines the unified design system for the Connectimus website, ensuring consistency across all pages and components.

---

## Color Palette

### Primary Colors
```css
/* Main Brand Colors */
--background: Black (#000000)
--foreground: White (#FFFFFF)
--accent: Cyan-400 (#22d3ee)
--accent-secondary: Cyan-300 (#67e8f9)
```

### Gradient Colors
```css
/* Page Background Gradients (Full-screen sections) */
Green: linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))
Dark Gray: linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))
Blue: linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))
```

### Card Gradients
```css
/* Auditor/Feature Cards */
Blue: from-blue-600 via-blue-700 to-blue-800
Green: from-green-600 via-green-700 to-green-800
Dark: from-gray-800 via-gray-900 to-black
```

### Text Colors
```css
Primary Text: text-white
Secondary Text: text-white/70 or text-white/60
Muted Text: text-white/40
Accent Text: text-cyan-400 or text-cyan-300
```

---

## Typography

### Font Family
```css
Primary: font-sans (System fonts)
All text uses: font-sans
```

### Font Weights
```css
Headings: font-semibold (600)
Body Text: font-medium (500)
Labels: font-medium (500)
```

### Font Sizes
```css
/* Hero Heading */
H1: text-4xl md:text-5xl lg:text-6xl

/* Section Headings */
H2: text-4xl md:text-5xl lg:text-6xl

/* Subheadings */
H3: text-xl md:text-2xl

/* Body Text */
Body: text-lg
Small: text-sm
Tiny: text-xs
```

### Letter Spacing
```css
Headings: tracking-tight
Body: tracking-normal
Labels: tracking-wide
```

---

## Layout & Spacing

### Container
```css
Max Width: max-w-7xl
Padding: px-6 md:px-12 lg:px-24
Margin: mx-auto
```

### Section Padding
```css
Vertical: py-32 (hero), py-24 (sections)
Horizontal: px-6 md:px-12 lg:px-24
```

### Grid Layouts
```css
Two Column: grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16
Three Column: grid-cols-1 md:grid-cols-3 gap-6 md:gap-8
```

---

## Components

### Buttons

#### Primary CTA
```tsx
<button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
  Button Text
</button>
```

#### Secondary Button
```tsx
<button className="group inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium hover:bg-opacity-90 transition-all duration-300">
  Button Text
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
```

### Cards

#### Standard Card
```tsx
<div className="relative w-56 h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
  {/* Card content */}
</div>
```

#### Feature Card
```tsx
<div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group">
  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
    {/* Icon */}
  </div>
  <h4 className="text-xl font-semibold mb-3">{title}</h4>
  <p className="text-muted-foreground">{description}</p>
</div>
```

### Badges/Pills
```tsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-sm text-cyan-400">
  Badge Text
</div>
```

### Dividers
```tsx
<div className="h-px w-16 bg-cyan-400/40"></div>
```

---

## Animations

### Framer Motion Patterns

#### Fade In Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

#### Fade In Side
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: false, amount: 0.3 }}
>
```

#### Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  viewport={{ once: false, amount: 0.3 }}
>
```

#### Hover Scale
```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
```

### Timing
```css
Default: duration: 0.8
Quick: duration: 0.3
Slow: duration: 1.2
Stagger Delay: delay: index * 0.1
```

---

## Effects

### Shadows
```css
Button: shadow-xl
Card: shadow-lg
Custom: 0 25px 50px -12px rgba(0, 0, 0, 0.5)
```

### Blur Effects
```css
Backdrop: backdrop-blur-md
Glow: blur-3xl
```

### Opacity Levels
```css
Primary: opacity-100
Secondary: opacity-90
Tertiary: opacity-70
Muted: opacity-60 or opacity-40
```

---

## Responsive Breakpoints

```css
Mobile: default (< 768px)
Tablet: md: (768px+)
Desktop: lg: (1024px+)
```

### Responsive Patterns
```tsx
// Mobile-first approach
className="text-4xl md:text-5xl lg:text-6xl"
className="px-6 md:px-12 lg:px-24"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Navigation

### Data Attributes for Theme Control
```tsx
// Dark sections (black background)
<section data-nav-theme="dark">

// Green sections
<section data-nav-theme="green">

// Light sections
<section data-nav-theme="light">
```

### Navigation Background Colors
```css
Dark Theme: bg-black/80
Green Theme: bg-green-600/80
Light Theme: bg-white/80
```

---

## Best Practices

### 1. Always Use Semantic Tokens
- Use HSL colors from design system
- Avoid hardcoded color values in components
- Reference colors from index.css variables

### 2. Maintain Consistent Spacing
- Use Tailwind spacing scale (4, 6, 8, 12, 16, 24, 32)
- Keep consistent gaps in grid layouts
- Use same padding patterns for cards

### 3. Animation Consistency
- Use framer-motion for all animations
- Apply viewport={{ once: false }} for repeatable animations
- Keep timing consistent (0.8s default)

### 4. Component Structure
- Hero sections: Full-screen with centered content
- Feature sections: Two-column grid on desktop
- Card grids: 3-column on desktop, single column on mobile

### 5. Accessibility
- Maintain proper contrast ratios
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works

---

## Implementation Checklist

When creating a new page:
- [ ] Use black background for hero sections
- [ ] Apply cyan-400 for accent colors
- [ ] Use font-sans for all text
- [ ] Implement framer-motion animations
- [ ] Use rounded-3xl for cards
- [ ] Apply proper data-nav-theme attributes
- [ ] Follow two-column grid pattern for features
- [ ] Include white CTA buttons with hover effects
- [ ] Use proper spacing (py-24 for sections)
- [ ] Ensure mobile responsiveness

---

## Examples

### Complete Hero Section Pattern
```tsx
<section data-nav-theme="dark" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
  <div className="absolute inset-0 bg-black"></div>
  <div className="relative z-10 container mx-auto px-6 py-32">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <div className="h-px w-16 bg-cyan-400/40"></div>
            <span>Tagline</span>
            <div className="h-px w-16 bg-cyan-400/40"></div>
          </div>
        </motion.div>
        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white">
          Main Heading
        </motion.h1>
        <motion.button className="bg-white text-gray-900 px-8 py-4 rounded-full">
          CTA Text
        </motion.button>
      </div>
    </div>
  </div>
</section>
```

### Complete Feature Section Pattern
```tsx
<section data-nav-theme="green" className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-24" style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))' }}>
  <div className="container mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div className="text-white space-y-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold">
          Feature Title
        </h2>
        <p className="text-lg font-sans leading-relaxed opacity-90">
          Description
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full">
          Learn More
        </button>
      </motion.div>
      <motion.div className="flex justify-center lg:justify-end">
        {/* Feature visual */}
      </motion.div>
    </div>
  </div>
</section>
```
