<?php
/**
 * QR Code Tracking Bridge for loslasszen.de
 * 
 * Tracks poster scans via Matomo before redirecting to Cal.com booking page
 * Usage: https://loslasszen.de/track.php?id=05
 */

// --- CONFIGURATION ---
define('TARGET_URL', 'https://cal.com/loslasszen');
define('MATOMO_URL', 'https://your-matomo-domain.com/'); // TODO: Replace with your actual Matomo URL
define('MATOMO_SITE_ID', '1'); // TODO: Replace with your actual site ID
define('BASE_SITE_URL', 'https://www.loslasszen.de');
define('ALLOWED_LOCATION_PATTERN', '/^[0-9]{2}$/'); // Validates format like "01", "05", "12"
define('DEBUG_MODE', false); // Set to true for debugging
// ---------------------

/**
 * Sanitize and validate the location ID from query parameter
 */
function getLocationId(): string {
    $location_id = isset($_GET['id']) ? trim($_GET['id']) : '';
    
    // Validate format (2 digits)
    if (!preg_match(ALLOWED_LOCATION_PATTERN, $location_id)) {
        logError("Invalid location ID format: " . htmlspecialchars($location_id));
        return 'unknown';
    }
    
    return $location_id;
}

/**
 * Generate anonymized visitor ID for Matomo
 */
function generateVisitorId(): string {
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $salt = 'loslasszen_tracking_salt'; // Change this to a unique value
    
    return substr(hash('sha256', $ip . $user_agent . $salt), 0, 16);
}

/**
 * Track the scan event in Matomo using cURL for better error handling
 */
function trackInMatomo(string $location_id): bool {
    // Build tracking parameters
    $params = [
        'idsite' => MATOMO_SITE_ID,
        'rec' => '1',
        'url' => BASE_SITE_URL . '/poster/' . $location_id,
        'action_name' => 'Poster Scan - Location ' . $location_id,
        '_id' => generateVisitorId(),
        'urlref' => '', // No referrer for QR scans
        'ua' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'lang' => $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '',
        'cip' => $_SERVER['REMOTE_ADDR'] ?? '', // Pass client IP
        'send_image' => '0', // Don't return image
        // Custom variables for better tracking
        'dimension1' => $location_id, // Custom dimension: Location ID
        '_cvar' => json_encode([
            '1' => ['Location ID', $location_id],
            '2' => ['Source', 'QR Code']
        ])
    ];
    
    // Build query string
    $query_string = http_build_query($params);
    $tracking_url = rtrim(MATOMO_URL, '/') . '/matomo.php?' . $query_string;
    
    // Use cURL for reliable tracking
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $tracking_url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 2, // 2 second timeout - don't delay user
        CURLOPT_CONNECTTIMEOUT => 1,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_USERAGENT => $_SERVER['HTTP_USER_AGENT'] ?? 'QR-Tracking-Bridge/1.0'
    ]);
    
    $result = curl_exec($ch);
    $error = curl_error($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($error || $http_code !== 200) {
        logError("Matomo tracking failed: HTTP $http_code - $error");
        return false;
    }
    
    if (DEBUG_MODE) {
        logDebug("Successfully tracked location: $location_id");
    }
    
    return true;
}

/**
 * Log errors (can be extended to write to file or error service)
 */
function logError(string $message): void {
    if (DEBUG_MODE) {
        error_log("[QR-Track-Error] " . date('Y-m-d H:i:s') . " - " . $message);
    }
}

/**
 * Log debug information
 */
function logDebug(string $message): void {
    if (DEBUG_MODE) {
        error_log("[QR-Track-Debug] " . date('Y-m-d H:i:s') . " - " . $message);
    }
}

/**
 * Perform secure redirect to target URL
 */
function redirectToTarget(): void {
    // Security headers
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    
    // Redirect with proper status code
    header('Location: ' . TARGET_URL, true, 302);
    exit;
}

// --- MAIN EXECUTION ---
try {
    // Get and validate location ID
    $location_id = getLocationId();
    
    if (DEBUG_MODE) {
        logDebug("Processing QR scan for location: $location_id");
    }
    
    // Track in Matomo (non-blocking - continue even if it fails)
    trackInMatomo($location_id);
    
    // Redirect user immediately to Cal.com
    redirectToTarget();
    
} catch (Exception $e) {
    logError("Critical error: " . $e->getMessage());
    // Still redirect even if tracking fails
    redirectToTarget();
}
?>