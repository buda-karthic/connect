# URL-Based Filter Persistence

This document explains how filter and search state persistence works in the Connect application.

## Overview

The application now persists filter and search state across page reloads using URL query parameters instead of browser storage (localStorage/sessionStorage). This approach provides several benefits:

- **Shareable URLs**: Users can share filtered search results with others
- **Browser History**: Users can use back/forward buttons to navigate between different filter states
- **Bookmarkable**: Users can bookmark specific search results
- **No Storage Dependencies**: Works without relying on browser storage APIs

## Implementation Details

### URL Structure

The application uses the following URL parameter structure:

```
/?search=<search_term>&pricing=<filter1,filter2>
```

**Parameters:**
- `search`: The search term (optional)
- `pricing`: Comma-separated list of pricing filters (optional)
  - Valid values: `paid`, `free`, `view-only`

**Examples:**
- `/?search=react` - Search for "react"
- `/?pricing=paid,free` - Show paid and free items
- `/?search=design&pricing=free` - Search for "design" and show only free items

### Key Components

#### 1. URL Utilities (`src/utils/urlUtils.js`)

Contains utility functions for:
- `serializeFiltersToUrl()` - Convert Redux state to URL parameters
- `deserializeFiltersFromUrl()` - Convert URL parameters to Redux state
- `updateUrlWithFilters()` - Update browser URL without page reload
- `getFiltersFromUrl()` - Get current filter state from URL

#### 2. Updated Filters Slice (`src/store/filtersSlice.js`)

The Redux slice now initializes state from URL parameters on app startup:
- Reads URL parameters when the store is created
- Falls back to default state if URL parsing fails
- Maintains all existing Redux actions and reducers

#### 3. Updated App Component (`src/App.jsx`)

The main App component now:
- Syncs Redux state changes to URL parameters
- Uses `useEffect` to update URL whenever filters change
- Maintains all existing functionality

## How It Works

### Initial Load
1. App starts and creates Redux store
2. Filters slice reads URL parameters and initializes state
3. App renders with filters applied from URL

### Filter Changes
1. User interacts with search input or filter checkboxes
2. Redux actions update the store state
3. `useEffect` in App component detects state changes
4. URL is updated with new filter state (no page reload)
5. UI re-renders with filtered results

### Page Reload
1. User refreshes page or navigates back
2. App restarts and reads URL parameters
3. Redux store initializes with URL state
4. App renders with same filters as before reload

## Benefits

- **Persistence**: Filters survive page reloads and browser restarts
- **Shareability**: URLs can be shared to show specific search results
- **Navigation**: Browser back/forward buttons work with filter states
- **Bookmarking**: Users can bookmark filtered views
- **SEO Friendly**: Search engines can index filtered content
- **No Storage Issues**: Works regardless of browser storage settings

## Testing

To test the persistence:

1. Start the application: `npm run dev`
2. Apply some filters (search term + pricing filters)
3. Note the URL changes in the address bar
4. Refresh the page (F5 or Ctrl+R)
5. Verify that filters are restored from the URL
6. Try sharing the URL with someone else
7. Use browser back/forward buttons to navigate between filter states

## Browser Compatibility

This implementation uses standard web APIs:
- `URLSearchParams` - Supported in all modern browsers
- `window.history.replaceState()` - Supported in all modern browsers
- No external dependencies beyond React Router DOM

## Future Enhancements

Potential improvements could include:
- URL shortening for very long filter combinations
- Analytics tracking of filter usage via URL parameters
- Support for additional filter types (categories, date ranges, etc.)
- URL parameter validation and sanitization
