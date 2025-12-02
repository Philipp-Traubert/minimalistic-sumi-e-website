# Matomo Tracking Implementation Guide

This guide explains how to use the Matomo tracking system for your poster campaigns with UTM parameters.

## ✅ What Was Implemented

1. **Matomo Script**: Added to `index.html` with GDPR-friendly settings (cookieless tracking, IP anonymization)
2. **UTM Parameter Tracking**: Automatically captures all UTM parameters from URLs
3. **Button Click Tracking**: Custom events track when users click the "Jetzt Buchen" button
4. **Performance Optimizations**: DNS prefetch for faster Matomo loading

## 📊 How to Use UTM Parameters for Your Poster Campaign

### QR Code URL Structure

For each poster location, create a unique URL with UTM parameters:

**Base URL**: `https://loslasszen.de/`

**Full URL with UTM**: `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=LOOCATION_NAME`

### Example URLs for Different Locations

| Location | URL |
|----------|-----|
| Marktplatz | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=marktplatz` |
| Hauptbahnhof | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=hauptbahnhof` |
| Rathaus | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=rathaus` |
| Fitnessstudio | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=fitnessstudio_name` |
| Bibliothek | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=bibliothek` |
| Universität | `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=eberswalde_launch&utm_content=universität` |

### UTM Parameter Explanation

- **utm_source=poster**: Identifies the traffic source as posters
- **utm_medium=qr**: Identifies the medium as QR codes
- **utm_campaign=eberswalde_launch**: Identifies the specific campaign
- **utm_content=location_name**: Identifies the exact poster location

## 📈 What to Track in Matomo

### 1. Campaign Performance
1. Go to **Referrers → Campaigns** in your Matomo dashboard
2. Look at the `eberswalde_launch` campaign
3. See breakdown by:
   - **Source**: All will be "poster"
   - **Medium**: All will be "qr"
   - **Content**: Shows which locations drove traffic

### 2. Button Click Tracking
1. Go to **Behavior → Events** in Matomo
2. Look for events with:
   - **Category**: "Booking"
   - **Action**: "external_click"
   - **Name**: Shows which button was clicked and from which location

### 3. Key Metrics to Monitor
- **Total Visits per Location**: How many people scanned each QR code
- **Booking Button Clicks**: How many people from each location tried to book
- **Conversion Rate**: (Booking Clicks ÷ Total Visits) per location

## 🧪 Testing Your Setup

### Test UTM Parameters
Visit these URLs to test the tracking:
- `https://loslasszen.de/?utm_source=poster&utm_medium=qr&utm_campaign=test&utm_content=marktplatz`
- Click the "Jetzt Buchen" button
- Check Matomo dashboard for:
  - Campaign visit from "test" source
  - Event: "Jetzt Buchen Button - marktplatz"

### Test on Local Development
If testing locally with Vite:
- Visit: `http://localhost:5173/?utm_source=test&utm_medium=qr&utm_content=test_location`
- Click the booking button
- Events will be tracked but won't appear in production Matomo

## 📱 QR Code Generators

Use these free tools to generate QR codes with your UTM URLs:

1. **qr-code-generator.com**: Simple, fast generation
2. **goqr.me**: Free with download options
3. **QR Code Monkey**: Customizable designs
4. **canva.com**: Create branded QR codes

## 🔧 Adding More Tracking (Optional)

### Track Additional Button Clicks
If you add more buttons to your site, use the tracking utilities:

```typescript
import { trackButtonClick } from './utils/matomo';

// For any button click
<button onClick={() => trackButtonClick('Contact Form Button')}>
  Kontakt aufnehmen
</button>
```

### Track Scroll Depth
Add scroll depth tracking to see how engaged visitors are:

```typescript
import { trackScrollDepth } from './utils/matomo';

useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    trackScrollDepth(scrollPercent);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Track Time on Page
Track how long visitors stay on your site:

```typescript
import { trackTimeSpent } from './utils/matomo';

useEffect(() => {
  const startTime = Date.now();
  
  return () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    trackTimeSpent(timeSpent);
  };
}, []);
```

## 🛡️ Privacy & GDPR Compliance

The implementation includes:
- **Cookieless tracking**: `disableCookies` - no consent banner needed
- **IP anonymization**: `anonymizeIp` - GDPR compliant
- **Do Not Track respect**: `setDoNotTrack` - respects browser settings

## 📞 Support

If you need to add more tracking features:
1. Check the `src/utils/matomo.ts` file for available functions
2. Import and use tracking functions in your components
3. Test in your Matomo dashboard

The tracking is now live and ready for your poster campaign!
