# SereneReveal Component Guide

## Overview

`SereneReveal` is an intelligent animation component that combines the best of both `InkSplashHeading` and `ScrollReveal` components. It provides a consistent, serene animation experience regardless of the element's initial position in the viewport.

## Problem It Solves

When building responsive interfaces, content might be:
- **Above the fold** (visible on page load) on large screens
- **Below the fold** (requires scrolling) on small screens

Using separate components for these cases creates inconsistent experiences across different screen sizes. `SereneReveal` automatically adapts to the situation with independent delay controls for each scenario.

## How It Works

### Intelligent Detection
On component mount, `SereneReveal`:
1. Checks if the element is currently in the viewport
2. If **YES**: Animates after `delay` milliseconds (like `InkSplashHeading`)
3. If **NO**: Sets up an IntersectionObserver and animates after `scrollDelay` milliseconds when scrolled into view (like `ScrollReveal`)

### Dual Delay System
- **`delay`**: Used when element is already visible on page load
- **`scrollDelay`**: Used when element is revealed by scrolling (optional, defaults to `delay`)

This allows you to orchestrate different timing for:
- Elements that appear immediately (can have longer delays for staggering)
- Elements revealed by scroll (can have shorter delays for snappier feel)

### Animation Consistency
Both scenarios use the **same animation parameters**:
- **Duration**: 1.8 seconds
- **Easing**: `[0.23, 1, 0.32, 1]` (serene cubic-bezier curve)
- **Transform**: Fade in + subtle upward movement (30px → 0px)
- **Opacity**: 0 → 1

## Usage

### Basic Usage (Single Delay)

```tsx
import { SereneReveal } from './components/SereneReveal';

function MyComponent() {
  return (
    <SereneReveal delay={300}>
      <h2>Animates 300ms after detection (viewport or scroll)</h2>
    </SereneReveal>
  );
}
```

### Dual Delay (Different for Viewport vs Scroll)

```tsx
<SereneReveal delay={800} scrollDelay={200}>
  <h2>800ms delay if in viewport, 200ms if scrolled to</h2>
</SereneReveal>
```

**Use Case**: Content high on page gets longer delay (staggered with other elements), but if user scrolls directly there, it appears quickly without awkward waiting.

### Staggered Viewport Animation

```tsx
<div className="space-y-6">
  {/* These appear one after another if all in viewport */}
  <SereneReveal delay={100} scrollDelay={0}>
    <h3>First (100ms if in viewport, immediate if scrolled)</h3>
  </SereneReveal>
  
  <SereneReveal delay={300} scrollDelay={100}>
    <h3>Second (300ms if in viewport, 100ms if scrolled)</h3>
  </SereneReveal>
  
  <SereneReveal delay={500} scrollDelay={200}>
    <h3>Third (500ms if in viewport, 200ms if scrolled)</h3>
  </SereneReveal>
</div>
```

### Quick Scroll Reveals

```tsx
{/* Fast response when scrolled to, but waits if already visible */}
<SereneReveal delay={1000} scrollDelay={50}>
  <div className="cta-section">
    <button>Call to Action</button>
  </div>
</SereneReveal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Content to be revealed |
| `delay` | `number` | `0` | Delay in ms when element is in viewport on mount |
| `scrollDelay` | `number` | `delay` | Delay in ms when element is revealed by scrolling (falls back to `delay` if not set) |
| `className` | `string` | `''` | Additional CSS classes for the wrapper |

## Delay Strategy Examples

### Strategy 1: Staggered Top, Quick Scroll
Perfect for hero sections and introductory content:

```tsx
// Hero section - staggered if visible
<SereneReveal delay={0} scrollDelay={0}>
  <h1>Welcome</h1>
</SereneReveal>

<SereneReveal delay={400} scrollDelay={100}>
  <p>Subtitle</p>
</SereneReveal>

<SereneReveal delay={800} scrollDelay={200}>
  <button>CTA</button>
</SereneReveal>
```

### Strategy 2: Uniform Timing
When you want consistent feel regardless of viewport:

```tsx
<SereneReveal delay={300}>
  <div>Same delay for both cases</div>
</SereneReveal>
```

### Strategy 3: Instant Scroll, Delayed Viewport
For content that should appear quickly when scrolled to:

```tsx
<SereneReveal delay={600} scrollDelay={0}>
  <article>Article content</article>
</SereneReveal>
```

### Strategy 4: Progressive Delays
Building anticipation on page load, snappy on scroll:

```tsx
<SereneReveal delay={200} scrollDelay={50}>Item 1</SereneReveal>
<SereneReveal delay={400} scrollDelay={50}>Item 2</SereneReveal>
<SereneReveal delay={600} scrollDelay={50}>Item 3</SereneReveal>
```

## When to Use Which Component

### Use `InkSplashHeading`
- For **hero sections** that are always above the fold
- For **main headings** that should animate immediately on page load
- When you want a **guaranteed immediate animation**
- When you need the classic ink splash aesthetic

### Use `SereneReveal`
- For **content sections** that may or may not be initially visible
- For **list items** in long pages
- For **cards or panels** that appear at different scroll positions
- When you want **adaptive behavior** with **independent delay control**
- For most responsive content that works across screen sizes

### Use `ScrollReveal`
- For **content definitely below the fold**
- When you want **explicit scroll-triggered behavior** only
- For **gallery items** or **portfolio pieces**
- When you don't need Framer Motion animations

## Technical Details

### Intersection Observer Settings

```javascript
{
  threshold: 0.1,           // Trigger when 10% visible
  rootMargin: '0px 0px -50px 0px'  // Start slightly before entering viewport
}
```

### Initial Visibility Check

The component checks if the element is in viewport using:
```javascript
const rect = element.getBoundingClientRect();
const inViewport = (
  rect.top >= 0 &&
  rect.left >= 0 &&
  rect.bottom <= window.innerHeight &&
  rect.right <= window.innerWidth
);
```

### Delay Logic

```javascript
// For viewport animation
setTimeout(() => setIsVisible(true), delay);

// For scroll animation
const effectiveScrollDelay = scrollDelay !== undefined ? scrollDelay : delay;
setTimeout(() => setIsVisible(true), effectiveScrollDelay);
```

### Animation State Management

- Uses `useState` for `isVisible` and `isInViewportOnMount`
- Uses `useRef` for DOM element reference
- Properly cleans up IntersectionObserver on unmount
- Only triggers animation once per element

## Performance Considerations

### Optimizations
- ✅ Only one animation per element (doesn't re-trigger on scroll)
- ✅ IntersectionObserver is efficient (native browser API)
- ✅ Uses Framer Motion's optimized animation system
- ✅ Minimal re-renders with proper state management
- ✅ Independent delay controls prevent awkward waiting times

### Best Practices
1. **Don't overuse delays**: Keep delays under 1000ms for snappy UX
2. **Shorter scrollDelays**: Consider 0-200ms for scroll reveals
3. **Longer delays for viewport**: Can use 400-800ms for staggered effects
4. **Stagger sequential items**: Use incremental delays (100ms, 200ms, 300ms)
5. **Group related content**: Wrap related items in one SereneReveal when appropriate
6. **Test on mobile**: Ensure animations feel good on smaller viewports

## Animation Anatomy

### Initial State
```javascript
{ opacity: 0, y: 30 }
```
- Invisible
- 30px below final position

### Final State
```javascript
{ opacity: 1, y: 0 }
```
- Fully visible
- At natural position

### Transition
```javascript
{
  duration: 1.8,              // 1.8 seconds
  ease: [0.23, 1, 0.32, 1]   // Serene cubic-bezier
}
```

This creates a smooth, calming animation that feels natural and unhurried.

## Examples from App.tsx

### Section Heading (Different timing for viewport vs scroll)
```tsx
<SereneReveal delay={600} scrollDelay={100}>
  <h2 className="heading-lg">Auf einen Blick</h2>
</SereneReveal>
```
- If visible on page load: 600ms delay (staggered with other content)
- If scrolled to: 100ms delay (quick response)

### Service Cards (Staggered in viewport, quick on scroll)
```tsx
<SereneReveal delay={100} scrollDelay={50}>
  <div>
    <h3 className="heading-sm">Service Title</h3>
    <p>Service description...</p>
  </div>
</SereneReveal>

<SereneReveal delay={200} scrollDelay={50}>
  <div>
    <h3 className="heading-sm">Another Service</h3>
    <p>Another description...</p>
  </div>
</SereneReveal>
```

### Call-to-Action Section (Longer wait if in viewport)
```tsx
<SereneReveal delay={500} scrollDelay={100}>
  <div className="cta-section">
    <h3>Ready to start?</h3>
    <GradientButton>Get Started</GradientButton>
  </div>
</SereneReveal>
```

## Comparison with Other Components

| Feature | InkSplashHeading | ScrollReveal | SereneReveal |
|---------|-----------------|--------------|--------------|
| Immediate animation | ✅ Always | ❌ Never | ✅ If in viewport |
| Scroll-triggered | ❌ Never | ✅ Always | ✅ If below fold |
| Adaptive behavior | ❌ No | ❌ No | ✅ Yes |
| Dual delay system | ❌ No | ❌ No | ✅ Yes |
| Framer Motion | ✅ Yes | ❌ No | ✅ Yes |
| Best for | Hero sections | Below-fold content | Any content |

## Troubleshooting

### Animation doesn't trigger
- Check if `motion` is properly imported from `motion/react`
- Ensure the element is actually being rendered
- Verify delay values are reasonable (< 2000ms)

### Animation triggers too early/late
- Adjust `rootMargin` in the IntersectionObserver options
- Modify `threshold` value (currently 0.1 = 10% visible)

### Delays feel wrong
- Test both scenarios: refresh page vs scroll to element
- Adjust `delay` for viewport case
- Adjust `scrollDelay` for scroll case
- Remember: shorter delays for scroll, longer for staggering

### Multiple animations at once feel chaotic
- Increase `delay` between sequential items
- Keep `scrollDelay` consistent and short
- Use 100-200ms increments for smooth staggering
- Consider grouping related items in one SereneReveal

## Real-World Delay Recommendations

### Hero Section (Always Visible)
```tsx
<SereneReveal delay={0}>Headline</SereneReveal>
<SereneReveal delay={400}>Subtitle</SereneReveal>
<SereneReveal delay={800}>CTA</SereneReveal>
```

### Content Section (May Be Visible)
```tsx
<SereneReveal delay={300} scrollDelay={100}>
  Section heading
</SereneReveal>
```

### List Items (Progressive Reveal)
```tsx
<SereneReveal delay={100} scrollDelay={0}>Item 1</SereneReveal>
<SereneReveal delay={300} scrollDelay={50}>Item 2</SereneReveal>
<SereneReveal delay={500} scrollDelay={100}>Item 3</SereneReveal>
```

### Footer Content
```tsx
<SereneReveal delay={1000} scrollDelay={0}>
  Footer info
</SereneReveal>
```

## Credits

Built on top of:
- **Framer Motion** for smooth animations
- **IntersectionObserver API** for efficient scroll detection
- Inspired by `InkSplashHeading` and `ScrollReveal` components