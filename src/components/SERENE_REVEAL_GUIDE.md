# SereneReveal Component Guide

## Overview

`SereneReveal` is an intelligent animation component that combines the best of both `InkSplashHeading` and `ScrollReveal` components. It provides a consistent, serene animation experience regardless of the element's initial position in the viewport.

## Problem It Solves

When building responsive interfaces, content might be:
- **Above the fold** (visible on page load) on large screens
- **Below the fold** (requires scrolling) on small screens

Using separate components for these cases creates inconsistent experiences across different screen sizes. `SereneReveal` automatically adapts to the situation.

## How It Works

### Intelligent Detection
On component mount, `SereneReveal`:
1. Checks if the element is currently in the viewport
2. If **YES**: Animates immediately (like `InkSplashHeading`)
3. If **NO**: Sets up an IntersectionObserver and animates when scrolled into view (like `ScrollReveal`)

### Animation Consistency
Both scenarios use the **same animation parameters**:
- **Duration**: 1.8 seconds
- **Easing**: `[0.23, 1, 0.32, 1]` (serene cubic-bezier curve)
- **Transform**: Fade in + subtle upward movement (30px → 0px)
- **Opacity**: 0 → 1

## Usage

### Basic Usage

```tsx
import { SereneReveal } from './components/SereneReveal';

function MyComponent() {
  return (
    <SereneReveal>
      <h2>This will animate beautifully</h2>
      <p>Whether it's in viewport or not!</p>
    </SereneReveal>
  );
}
```

### With Delay

```tsx
<SereneReveal delay={200}>
  <div>Content with 200ms delay</div>
</SereneReveal>
```

### With Custom Classes

```tsx
<SereneReveal className="my-custom-class">
  <div>Styled content</div>
</SereneReveal>
```

### Multiple Elements with Staggered Delays

```tsx
<div className="space-y-6">
  <SereneReveal delay={100}>
    <h3>First item</h3>
  </SereneReveal>
  
  <SereneReveal delay={200}>
    <h3>Second item</h3>
  </SereneReveal>
  
  <SereneReveal delay={300}>
    <h3>Third item</h3>
  </SereneReveal>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | required | Content to be revealed |
| `delay` | `number` | `0` | Delay in milliseconds before animation starts |
| `className` | `string` | `''` | Additional CSS classes for the wrapper |

## When to Use Which Component

### Use `InkSplashHeading`
- For **hero sections** that are always above the fold
- For **main headings** that should animate immediately on page load
- When you want a **guaranteed immediate animation**

### Use `SereneReveal`
- For **content sections** that may or may not be initially visible
- For **list items** in long pages
- For **cards or panels** that appear at different scroll positions
- When you want **adaptive behavior** based on viewport

### Use `ScrollReveal`
- For **content definitely below the fold**
- When you want **explicit scroll-triggered behavior**
- For **gallery items** or **portfolio pieces**

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

### Best Practices
1. **Don't overuse delays**: Keep delays under 500ms for snappy UX
2. **Stagger sequential items**: Use incremental delays (100ms, 200ms, 300ms)
3. **Group related content**: Wrap related items in one SereneReveal when appropriate
4. **Test on mobile**: Ensure animations feel good on smaller viewports

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

### Section Heading (May or may not be in viewport)
```tsx
<SereneReveal delay={600}>
  <h2 className="heading-lg">Auf einen Blick</h2>
</SereneReveal>
```

### Service Cards (Staggered animation)
```tsx
<SereneReveal delay={100}>
  <div>
    <h3 className="heading-sm">Service Title</h3>
    <p>Service description...</p>
  </div>
</SereneReveal>

<SereneReveal delay={200}>
  <div>
    <h3 className="heading-sm">Another Service</h3>
    <p>Another description...</p>
  </div>
</SereneReveal>
```

### Call-to-Action Section
```tsx
<SereneReveal delay={500}>
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

### Multiple animations at once feel chaotic
- Increase delays between sequential items
- Use 100-200ms increments for smooth staggering
- Consider grouping related items in one SereneReveal

## Future Enhancements

Possible additions (not yet implemented):
- Custom animation variants
- Direction parameter (slide from left/right/top/bottom)
- Duration customization
- Trigger once vs. repeat on scroll
- Custom easing curves

## Credits

Built on top of:
- **Framer Motion** for smooth animations
- **IntersectionObserver API** for efficient scroll detection
- Inspired by `InkSplashHeading` and `ScrollReveal` components