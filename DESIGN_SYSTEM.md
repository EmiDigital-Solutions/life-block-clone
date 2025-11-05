# Connectimus Design System

**Version:** 1.0  
**Last Updated:** 2025  

This document defines the complete design system for the Connectimus website. Follow these guidelines to ensure visual consistency across all pages.

---

## Color Palette

### Primary Colors (Use HSL via CSS Variables)
All colors are defined as HSL in `src/index.css` and accessed via Tailwind:

```css
/* Semantic color tokens - ALWAYS use these */
--background: 0 0% 100%;          /* White backgrounds */
--foreground: 220 13% 13%;        /* Dark text */
--primary: 220 20% 25%;           /* Primary brand color */
--secondary: 210 17% 95%;         /* Light gray backgrounds */
--accent: 215 28% 17%;            /* Accent elements */
```

### Gradient Backgrounds
Use inline styles for complex gradients:

**Dark Hero Sections:**
```jsx
style={{ background: 'linear-gradient(135deg, rgb(0, 0, 0), rgb(17, 24, 39), rgb(31, 41, 55))' }}
```

**Green Sections:**
```jsx
style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))' }}
```

**Blue Sections:**
```jsx
style={{ background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))' }}
```

**Light Sections:**
```jsx
className="bg-white" 
// or
className="bg-gray-50"
```

### Page Background Patterns
- **Hero sections:** Black with cyan accents
- **Content sections:** Alternate white and gray-50
- **Feature sections:** Gradient backgrounds (green, blue, dark)
- **CTA sections:** Black background

---

## Typography

### Font Family
```jsx
className="font-sans"  // Primary font (Inter) for all text
```

### Font Weights
- **Headings:** `font-semibold` (600)
- **Body text:** `font-medium` (500)
- **CTAs:** `font-semibold` (600)

### Font Sizes

**Large Headings (Hero):**
```jsx
className="text-4xl md:text-5xl lg:text-6xl"
```

**Section Headings:**
```jsx
className="text-4xl md:text-5xl"
```

**Subheadings:**
```jsx
className="text-2xl md:text-3xl"
```

**Body Text:**
```jsx
className="text-base md:text-lg"  // 16px-18px
```

**Small Text:**
```jsx
className="text-sm"  // 14px
```

### Letter Spacing & Line Height
```jsx
className="tracking-tight"    // Headings
className="tracking-normal"   // Body text
className="tracking-wide"     // Small text/labels
className="leading-tight"     // Headings (1.15)
className="leading-relaxed"   // Body text
```

---

## Layout & Spacing

### Container
```jsx
<div className="container mx-auto px-6 md:px-12 lg:px-24">
  {/* Content */}
</div>
```

**Max Width:**
```jsx
className="max-w-7xl mx-auto"  // Large containers
className="max-w-4xl mx-auto"  // Medium containers (text-heavy)
className="max-w-6xl mx-auto"  // Cards/grids
```

### Section Padding
```jsx
className="py-24 px-6 md:px-12 lg:px-24"  // Standard sections
className="py-32"                          // Hero sections
```

### Grid Layouts

**Two Columns:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
```

**Three Columns:**
```jsx
<div className="grid md:grid-cols-3 gap-6 md:gap-8">
```

---

## Components

### Buttons

**Primary CTA (White on dark backgrounds):**
```jsx
<button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
  Button Text
</button>
```

**Secondary CTA (Outline on dark backgrounds):**
```jsx
<button className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-white/20 transition-all duration-300">
  Button Text
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
```

**On Light Backgrounds:**
```jsx
<button className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white px-8 py-4 rounded-full font-sans font-medium hover:opacity-90 transition-all">
  Button Text
</button>
```

### Cards

**Standard Card (Light Background):**
```jsx
<div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
  <h4 className="text-xl font-sans font-semibold text-gray-900 mb-3">Title</h4>
  <p className="text-gray-600 font-sans">Description</p>
</div>
```

**Feature Card (Dark Background):**
```jsx
<div className="p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all">
  <h4 className="text-xl font-sans font-semibold text-white mb-3">Title</h4>
  <p className="text-white/80 font-sans">Description</p>
</div>
```

**Highlighted Card (with gradient accent):**
```jsx
<div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-400 shadow-lg">
  {/* Content */}
</div>
```

### Badges/Pills
```jsx
<span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-sans backdrop-blur-sm">
  • Badge Text
</span>
```

```jsx
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-sans font-medium">
  Pill Text
</div>
```

### Dividers
```jsx
<div className="h-px w-16 bg-cyan-400/40"></div>  {/* Accent line */}
```

---

## Animations (Framer Motion)

### Fade In Up (Standard)
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

**With Viewport Trigger:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
```

### Fade In Side
```jsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
```

### Scale In
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.8 }}
>
```

### Hover Scale
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  className="transition-all"
>
```

### Staggered Children
```jsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.1 }}
  >
))}
```

### Animation Timing
- **Duration:** 0.8s (standard), 0.3s (quick interactions)
- **Delays:** Stagger by 0.1s for sequential items
- **Easing:** Default Framer Motion easing

---

## Effects

### Shadows
```jsx
className="shadow-sm"      // Subtle cards
className="shadow-md"      // Hover state
className="shadow-lg"      // Important elements
className="shadow-xl"      // Primary CTAs
```

### Blur Effects
```jsx
className="backdrop-blur-sm"  // Glass effect
className="blur-3xl"          // Background decorative blur
```

### Opacity
```jsx
className="opacity-90"    // Slightly transparent
className="text-white/70" // 70% opacity text
className="bg-white/10"   // 10% opacity background
```

---

## Responsive Breakpoints

### Mobile First Approach
```jsx
className="text-4xl md:text-5xl lg:text-6xl"
```

### Breakpoints
- **Mobile:** Default (< 768px)
- **Tablet:** `md:` (≥ 768px)
- **Desktop:** `lg:` (≥ 1024px)

### Responsive Patterns

**Text Sizes:**
```jsx
className="text-base md:text-lg"
```

**Padding:**
```jsx
className="px-6 md:px-12 lg:px-24"
className="py-24 md:py-32"
```

**Grid Columns:**
```jsx
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Navigation

### Navigation Theme Attribute
Use `data-nav-theme` to control navigation appearance:

```jsx
<section data-nav-theme="dark">    {/* White nav on dark background */}
<section data-nav-theme="light">   {/* Dark nav on light background */}
<section data-nav-theme="green">   {/* White nav on green background */}
```

**Implementation in Navigation.tsx:**
The navigation bar reads this attribute and adjusts its colors accordingly.

---

## Best Practices

### 1. **Use Semantic Tokens**
❌ **Wrong:**
```jsx
className="text-white bg-black border-gray-200"
```

✅ **Correct:**
```jsx
className="text-foreground bg-background border-border"
```

For gradients and specific design needs, inline styles are acceptable:
```jsx
style={{ background: 'linear-gradient(...)' }}
```

### 2. **Consistent Spacing**
Always use the 4px grid system:
- Gaps: `gap-3`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`
- Padding: `p-6`, `p-8`, `px-8`, `py-4`
- Margins: `mb-4`, `mb-6`, `mt-8`

### 3. **Framer Motion for Animations**
Use consistent animation patterns:
- Initial state → Animate state
- `viewport={{ once: false }}` for repeatable animations
- Stagger delays by 0.1s

### 4. **Component Structure**
```jsx
<section data-nav-theme="dark" className="py-24 px-6 md:px-12 lg:px-24 bg-black">
  <div className="container mx-auto">
    <div className="max-w-4xl mx-auto text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-4xl md:text-5xl font-sans font-semibold text-white mb-6"
      >
        Section Title
      </motion.h2>
      {/* Content */}
    </div>
  </div>
</section>
```

### 5. **Accessibility**
- Use semantic HTML (`<section>`, `<header>`, `<nav>`, `<main>`)
- Include descriptive alt text for images
- Ensure sufficient color contrast
- Add hover and focus states

---

## Implementation Checklist

When creating a new page:

- [ ] Import Navigation and Footer components
- [ ] Use `data-nav-theme` on sections
- [ ] Apply consistent spacing (`py-24`, `px-6 md:px-12 lg:px-24`)
- [ ] Use semantic color tokens or gradient inline styles
- [ ] Add Framer Motion animations
- [ ] Implement responsive breakpoints
- [ ] Use consistent button styles
- [ ] Apply proper typography hierarchy
- [ ] Add hover states and transitions
- [ ] Test on mobile, tablet, and desktop

---

## Example Implementations

### Hero Section Pattern
```jsx
<section 
  data-nav-theme="dark" 
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
>
  <div className="absolute inset-0 bg-black"></div>
  <div className="relative z-10 container mx-auto px-6 py-32">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 text-white/60 text-sm font-sans">
            <div className="h-px w-16 bg-cyan-400/40"></div>
            <span>Tagline or category</span>
            <div className="h-px w-16 bg-cyan-400/40"></div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight tracking-tight max-w-4xl"
        >
          Your Main Headline Here
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/70 font-sans font-medium max-w-3xl"
        >
          Your description text goes here
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-xl">
            Primary CTA
          </button>
          <button className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-sans font-medium hover:bg-white/20 transition-all duration-300">
            Secondary CTA
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  </div>
</section>
```

### Feature Section Pattern (Light Background)
```jsx
<section 
  data-nav-theme="light" 
  className="py-24 px-6 md:px-12 lg:px-24 bg-white"
>
  <div className="container mx-auto">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="text-4xl md:text-5xl font-sans font-semibold text-gray-900 mb-4 tracking-tight"
      >
        Section Title
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-600 font-sans max-w-3xl mx-auto"
      >
        Section description
      </motion.p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.1 }}
          className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all"
        >
          <h4 className="text-xl font-sans font-semibold text-gray-900 mb-3">
            {feature.title}
          </h4>
          <p className="text-gray-600 font-sans">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
```

---

## Color Gradient Reference

Use these exact gradient values for consistency:

```jsx
// Dark gradient
style={{ background: 'linear-gradient(135deg, rgb(31, 41, 55), rgb(17, 24, 39), rgb(0, 0, 0))' }}

// Green gradient
style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74), rgb(21, 128, 61))' }}

// Blue gradient  
style={{ background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(30, 64, 175))' }}

// Light gradient
style={{ background: 'linear-gradient(135deg, rgb(255, 255, 255), rgb(249, 250, 251))' }}
```

---

**Questions?** Refer to existing pages (`Index.tsx`, `GroundIntelligence.tsx`) for working examples of these patterns.
