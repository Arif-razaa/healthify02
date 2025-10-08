/**
 * Utility functions for the HealthAI application
 */

/**
 * Creates a page URL from a page name
 * @param {string} pageName - The name of the page
 * @returns {string} The URL path for the page
 */
export function createPageUrl(pageName) {
  return `/${pageName.toLowerCase()}`;
}

/**
 * Format date to readable string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Format time to readable string
 * @param {Date|string} date - The date/time to format
 * @returns {string} Formatted time string
 */
export function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}
