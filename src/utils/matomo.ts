// Matomo tracking utilities for UTM parameter support and event tracking

declare global {
  interface Window {
    _paq: any[];
  }
}

// Get UTM parameters from URL
export const getUTMParams = () => {
  if (typeof window === 'undefined') {
    return {
      source: null,
      medium: null,
      campaign: null,
      content: null,
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    content: params.get('utm_content'),
  };
};

// Get campaign information for display/logging
export const getCampaignInfo = () => {
  const utm = getUTMParams();
  return {
    hasUTM: Boolean(utm.source || utm.medium || utm.campaign || utm.content),
    displayName: utm.content 
      ? `from ${utm.content}` 
      : 'direct traffic',
    fullContext: `${utm.source || 'direct'} / ${utm.medium || 'direct'} / ${utm.campaign || 'none'} / ${utm.content || 'direct'}`,
  };
};

// Track button/link clicks with UTM context
export const trackButtonClick = (
  buttonName: string,
  customAction: string = 'click'
) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  const utm = getUTMParams();
  const location = utm.content || 'direct';
  
  // Track event with location context
  window._paq.push([
    'trackEvent',
    'CTA', // Category
    customAction, // Action
    `${buttonName} - ${location}`, // Name includes location
    1 // Value
  ]);
};

// Track external link clicks (Cal.com booking)
export const trackExternalLink = (
  url: string,
  linkName: string,
  customCategory: string = 'Booking'
) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  const utm = getUTMParams();
  const location = utm.content || 'direct';
  
  window._paq.push([
    'trackEvent',
    customCategory,
    'external_click',
    `${linkName} from ${location}`,
    1
  ]);
};

// Track form submissions with UTM context
export const trackFormSubmission = (
  formName: string,
  success: boolean = true
) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  const utm = getUTMParams();
  const location = utm.content || 'direct';
  
  window._paq.push([
    'trackEvent',
    'Form',
    success ? 'submit_success' : 'submit_error',
    `${formName} - ${location}`,
    success ? 1 : 0
  ]);
};

// Track page view with custom title
export const trackPageView = (customTitle?: string) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  if (customTitle) {
    window._paq.push(['setDocumentTitle', customTitle]);
  }
  window._paq.push(['trackPageView']);
};

// Track scroll depth for engagement metrics
export const trackScrollDepth = (percentage: number) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  window._paq.push([
    'trackEvent',
    'Engagement',
    'scroll_depth',
    Math.floor(percentage / 25) * 25 + '%', // 25%, 50%, 75%, 100%
    percentage
  ]);
};

// Track time spent on page
export const trackTimeSpent = (seconds: number) => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  window._paq.push([
    'trackEvent',
    'Engagement',
    'time_on_page',
    'session_duration',
    seconds
  ]);
};

// Track custom dimensions based on UTM parameters
export const trackCustomDimensions = () => {
  if (typeof window === 'undefined' || !window._paq) return;
  
  const utm = getUTMParams();
  
  // Set custom dimensions if UTM parameters exist
  if (utm.source) {
    window._paq.push(['setCustomDimension', 1, utm.source]); // UTM Source
  }
  if (utm.medium) {
    window._paq.push(['setCustomDimension', 2, utm.medium]); // UTM Medium
  }
  if (utm.campaign) {
    window._paq.push(['setCustomDimension', 3, utm.campaign]); // UTM Campaign
  }
  if (utm.content) {
    window._paq.push(['setCustomDimension', 4, utm.content]); // UTM Content (Location)
  }
};
