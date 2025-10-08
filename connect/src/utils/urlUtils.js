/**
 * Utility functions for managing URL parameters to persist filter state
 */

/**
 * Serialize filter state to URL search parameters
 * @param {Object} filters - The current filter state
 * @param {string} filters.searchTerm - The search term
 * @param {Array} filters.pricingFilter - Array of selected pricing filters
 * @returns {URLSearchParams} - URL search parameters
 */
export const serializeFiltersToUrl = (filters) => {
  const params = new URLSearchParams();
  
  // Add search term if not empty
  if (filters.searchTerm && filters.searchTerm.trim()) {
    params.set('search', filters.searchTerm.trim());
  }
  
  // Add pricing filters if any are selected
  if (filters.pricingFilter && filters.pricingFilter.length > 0) {
    params.set('pricing', filters.pricingFilter.join(','));
  }
  
  return params;
};

/**
 * Deserialize URL search parameters to filter state
 * @param {URLSearchParams} searchParams - URL search parameters
 * @returns {Object} - Filter state object
 */
export const deserializeFiltersFromUrl = (searchParams) => {
  const filters = {
    searchTerm: '',
    pricingFilter: []
  };
  
  // Get search term
  const search = searchParams.get('search');
  if (search) {
    filters.searchTerm = search;
  }
  
  // Get pricing filters
  const pricing = searchParams.get('pricing');
  if (pricing) {
    filters.pricingFilter = pricing.split(',').filter(filter => 
      ['paid', 'free', 'view-only'].includes(filter)
    );
  }
  
  return filters;
};

/**
 * Update the browser URL with current filter state without causing a page reload
 * @param {Object} filters - The current filter state
 * @param {string} basePath - The base path for the URL (default: '/')
 */
export const updateUrlWithFilters = (filters, basePath = '/') => {
  const params = serializeFiltersToUrl(filters);
  const newUrl = params.toString() ? `${basePath}?${params.toString()}` : basePath;
  
  // Use history.replaceState to update URL without triggering navigation
  window.history.replaceState(null, '', newUrl);
};

/**
 * Get current filter state from URL
 * @returns {Object} - Current filter state from URL
 */
export const getFiltersFromUrl = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return deserializeFiltersFromUrl(searchParams);
};
