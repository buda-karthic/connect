/**
 * Tests for URL utility functions
 * These tests verify that filter state is correctly serialized to and deserialized from URL parameters
 */

import { 
  serializeFiltersToUrl, 
  deserializeFiltersFromUrl, 
  updateUrlWithFilters,
  getFiltersFromUrl 
} from '../urlUtils';

// Mock window.location for testing
const mockLocation = {
  search: '',
  pathname: '/',
  href: 'http://localhost:3000/'
};

// Mock window.history for testing
const mockHistory = {
  replaceState: jest.fn()
};

// Mock window object
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
});

Object.defineProperty(window, 'history', {
  value: mockHistory,
  writable: true
});

describe('URL Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocation.search = '';
    mockLocation.href = 'http://localhost:3000/';
  });

  describe('serializeFiltersToUrl', () => {
    test('should serialize empty filters to empty params', () => {
      const filters = { searchTerm: '', pricingFilter: [] };
      const params = serializeFiltersToUrl(filters);
      expect(params.toString()).toBe('');
    });

    test('should serialize search term only', () => {
      const filters = { searchTerm: 'test search', pricingFilter: [] };
      const params = serializeFiltersToUrl(filters);
      expect(params.get('search')).toBe('test search');
      expect(params.get('pricing')).toBeNull();
    });

    test('should serialize pricing filters only', () => {
      const filters = { searchTerm: '', pricingFilter: ['paid', 'free'] };
      const params = serializeFiltersToUrl(filters);
      expect(params.get('search')).toBeNull();
      expect(params.get('pricing')).toBe('paid,free');
    });

    test('should serialize both search term and pricing filters', () => {
      const filters = { searchTerm: 'test', pricingFilter: ['paid', 'view-only'] };
      const params = serializeFiltersToUrl(filters);
      expect(params.get('search')).toBe('test');
      expect(params.get('pricing')).toBe('paid,view-only');
    });

    test('should ignore empty search term', () => {
      const filters = { searchTerm: '   ', pricingFilter: ['paid'] };
      const params = serializeFiltersToUrl(filters);
      expect(params.get('search')).toBeNull();
      expect(params.get('pricing')).toBe('paid');
    });
  });

  describe('deserializeFiltersFromUrl', () => {
    test('should deserialize empty params to default filters', () => {
      const params = new URLSearchParams();
      const filters = deserializeFiltersFromUrl(params);
      expect(filters).toEqual({ searchTerm: '', pricingFilter: [] });
    });

    test('should deserialize search term only', () => {
      const params = new URLSearchParams('search=test%20search');
      const filters = deserializeFiltersFromUrl(params);
      expect(filters).toEqual({ searchTerm: 'test search', pricingFilter: [] });
    });

    test('should deserialize pricing filters only', () => {
      const params = new URLSearchParams('pricing=paid,free');
      const filters = deserializeFiltersFromUrl(params);
      expect(filters).toEqual({ searchTerm: '', pricingFilter: ['paid', 'free'] });
    });

    test('should deserialize both search term and pricing filters', () => {
      const params = new URLSearchParams('search=test&pricing=paid,view-only');
      const filters = deserializeFiltersFromUrl(params);
      expect(filters).toEqual({ searchTerm: 'test', pricingFilter: ['paid', 'view-only'] });
    });

    test('should filter out invalid pricing filters', () => {
      const params = new URLSearchParams('pricing=paid,invalid,free');
      const filters = deserializeFiltersFromUrl(params);
      expect(filters).toEqual({ searchTerm: '', pricingFilter: ['paid', 'free'] });
    });
  });

  describe('updateUrlWithFilters', () => {
    test('should update URL with search term', () => {
      const filters = { searchTerm: 'test', pricingFilter: [] };
      updateUrlWithFilters(filters);
      expect(mockHistory.replaceState).toHaveBeenCalledWith(null, '', '/?search=test');
    });

    test('should update URL with pricing filters', () => {
      const filters = { searchTerm: '', pricingFilter: ['paid', 'free'] };
      updateUrlWithFilters(filters);
      expect(mockHistory.replaceState).toHaveBeenCalledWith(null, '', '/?pricing=paid%2Cfree');
    });

    test('should update URL with both filters', () => {
      const filters = { searchTerm: 'test', pricingFilter: ['paid'] };
      updateUrlWithFilters(filters);
      expect(mockHistory.replaceState).toHaveBeenCalledWith(null, '', '/?search=test&pricing=paid');
    });

    test('should update URL to base path when no filters', () => {
      const filters = { searchTerm: '', pricingFilter: [] };
      updateUrlWithFilters(filters);
      expect(mockHistory.replaceState).toHaveBeenCalledWith(null, '', '/');
    });
  });

  describe('getFiltersFromUrl', () => {
    test('should get filters from current URL', () => {
      mockLocation.search = '?search=test&pricing=paid,free';
      const filters = getFiltersFromUrl();
      expect(filters).toEqual({ searchTerm: 'test', pricingFilter: ['paid', 'free'] });
    });

    test('should return default filters for empty URL', () => {
      mockLocation.search = '';
      const filters = getFiltersFromUrl();
      expect(filters).toEqual({ searchTerm: '', pricingFilter: [] });
    });
  });
});
