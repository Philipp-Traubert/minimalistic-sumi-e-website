# QR Code Tracking Bridge - Setup Guide

## Overview
This tracking bridge allows you to monitor the effectiveness of your physical poster locations by tracking QR code scans through Matomo before redirecting visitors to your Cal.com booking page.

## Key Improvements Over Original Script

### 1. **Security Enhancements**
- ✅ Input validation with regex pattern matching
- ✅ SQL injection prevention through proper sanitization
- ✅ XSS protection headers
- ✅ Secure visitor ID generation using SHA-256
- ✅ SSL verification enabled for cURL requests

### 2. **Better Error Handling**
- ✅ Try-catch blocks for exception handling
- ✅ Debug mode for troubleshooting
- ✅ Graceful degradation (redirects even if tracking fails)
- ✅ Comprehensive error logging

### 3. **Improved Tracking**
- ✅ Uses cURL instead of `file_get_contents()` for reliability
- ✅ Custom dimensions for Location ID tracking
- ✅ Custom variables for QR source identification
- ✅ User agent and language forwarding
- ✅ Client IP forwarding (for accurate geographic data)
- ✅ Short timeout to avoid user delays

### 4. **Code Quality**
- ✅ Well-documented with PHPDoc comments
- ✅ Modular function structure
- ✅ Constants for configuration
- ✅ Consistent naming conventions
- ✅ Professional error handling

## Setup Instructions

### Step 1: Configure Matomo

1. **Get your Matomo URL and Site ID:**
   - Log into your Matomo dashboard
   - Go to Administration → Websites → Manage
   - Note your Site ID (usually 1 for first site)
   - Your Matomo URL is typically: `https://analytics.yourdomain.com/` or `https://yourdomain.matomo.cloud/`

2. **Set up Custom Dimensions (Recommended):**
   - Go to Administration → Custom Dimensions
   - Create a new dimension:
     - Name: "Poster Location"
     - Scope: "Visit"
     - Active: Yes
   - Note the dimension ID (e.g., dimension1)

### Step 2: Configure the Script

Edit [`tracking-bridge.php`](tracking-bridge.php) and update these constants:

```php
define('TARGET_URL', 'https://cal.com/loslasszen'); // Your Cal.com booking link
define('MATOMO_URL', 'https://your-matomo-domain.com/'); // Your Matomo URL
define('MATOMO_SITE_ID', '1'); // Your Matomo site ID
define('BASE_SITE_URL', 'https://www.loslasszen.de'); // Your website URL
```

**Optional:** Update the tracking salt for extra security:
```php
$salt = 'loslasszen_tracking_salt'; // Change to unique random string
```

### Step 3: Upload to Server

1. Upload `tracking-bridge.php` to your web server
2. Recommended location: `https://www.loslasszen.de/track.php`
3. Ensure PHP is enabled and cURL extension is available

### Step 4: Test the Setup

1. **Enable debug mode temporarily:**
   ```php
   define('DEBUG_MODE', true);
   ```

2. **Test the tracking:**
   - Visit: `https://www.loslasszen.de/track.php?id=01`
   - You should be redirected to Cal.com
   - Check your PHP error logs for debug messages

3. **Verify in Matomo:**
   - Wait 5-10 minutes for data to process
   - Check Behavior → Pages for `/poster/01`
   - Check custom dimensions if configured

4. **Disable debug mode:**
   ```php
   define('DEBUG_MODE', false);
   ```

### Step 5: Generate QR Codes

For each poster location, create a QR code pointing to:
```
https://www.loslasszen.de/track.php?id=XX
```

Where `XX` is your location ID (e.g., 01, 02, 03, etc.)

**Recommended QR Code Tools:**
- QR Code Generator: https://www.qr-code-generator.com/
- QRServer: https://api.qrserver.com/
- Or use Matomo's QR Code Link Generator plugin

## Location ID Formats

The script validates location IDs to be **exactly 2 digits** (e.g., 01-99).

If you need different formats, modify the pattern in the script:
```php
define('ALLOWED_LOCATION_PATTERN', '/^[0-9]{2}$/'); // Current: 2 digits
// Examples:
// '/^[A-Z]{2}[0-9]{2}$/'  // Format: AB01
// '/^[a-z0-9-]+$/'        // Alphanumeric with dashes
```

## Tracking in Matomo

Once set up, you can track:

1. **Total Scans:** Behavior → Pages → Filter by `/poster/`
2. **By Location:** View individual pages like `/poster/01`, `/poster/05`
3. **Conversion Rate:** Track from poster scan to booking completion
4. **Geographic Data:** See where scans are coming from
5. **Time Analysis:** Identify peak scanning times

### Creating Reports

**Best Performing Locations:**
1. Go to Behavior → Pages
2. Filter URL path contains: `/poster/`
3. Sort by visits or unique visitors
4. Export data for analysis

**Custom Segment for QR Traffic:**
```
Event Action contains "Poster Scan"
OR
Page URL contains "/poster/"
```

## Troubleshooting

### Issue: Redirect works but no tracking data

**Solutions:**
1. Verify Matomo URL is correct (include trailing slash)
2. Check Site ID matches your Matomo site
3. Enable debug mode and check logs
4. Verify cURL is installed: `php -m | grep curl`
5. Check Matomo's System Check for issues

### Issue: "Invalid location ID format" in logs

**Solutions:**
1. QR codes must include valid ID (e.g., `?id=01`)
2. Update `ALLOWED_LOCATION_PATTERN` if using different format
3. Test with: `?id=05` (should work) vs `?id=ABC` (should fail)

### Issue: Slow redirects

**Solutions:**
1. Reduce cURL timeout (currently set to 2 seconds)
2. Check Matomo server response time
3. Consider async tracking alternative

## Security Best Practices

1. ✅ **Keep Debug Mode Off in Production**
   ```php
   define('DEBUG_MODE', false);
   ```

2. ✅ **Use HTTPS Only**
   - Ensure both your site and Matomo use HTTPS

3. ✅ **Restrict File Permissions**
   ```bash
   chmod 644 tracking-bridge.php
   ```

4. ✅ **Monitor Access Logs**
   - Watch for unusual patterns or attack attempts

5. ✅ **Update Regularly**
   - Keep PHP and server software updated

## Advanced: Async Tracking Alternative

For even faster redirects, consider implementing async tracking using JavaScript after redirect. However, the current PHP implementation with 2-second timeout should be fast enough for most use cases.

## Integration with Existing Analytics

This tracking bridge is compatible with:
- ✅ Existing Matomo tracking on www.loslasszen.de
- ✅ Google Analytics (if also installed)
- ✅ Other analytics platforms

The QR traffic will be clearly identifiable by the `/poster/XX` URL pattern.

## Support

For issues or questions:
1. Check Matomo documentation: https://matomo.org/docs/
2. Verify server PHP error logs
3. Test with debug mode enabled
4. Check Matomo's tracking debugger

## License & Credits

- Script created for loslasszen.de tracking implementation
- Based on Matomo HTTP Tracking API
- Author: Philipp Traubert