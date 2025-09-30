import { createSelector } from '@reduxjs/toolkit'

// Basic selectors
export const selectProducts = (state) => state.products.items
export const selectLoading = (state) => state.products.loading
export const selectError = (state) => state.products.error
export const selectSearchTerm = (state) => state.filters.searchTerm
export const selectPricingFilter = (state) => state.filters.pricingFilter

// Memoized selector for filtered products
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm, selectPricingFilter],
  (products, searchTerm, pricingFilter) => {
    let results = products

    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim()
      results = results.filter(item => {
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.creator.toLowerCase().includes(searchLower)
        )
      })
    }

    // Apply pricing filter
    if (pricingFilter.length > 0) {
      const pricingMap = {
        'paid': 0,
        'free': 1,
        'view-only': 2
      }
      results = results.filter(item => 
        pricingFilter.some(filter => item.pricingOption === pricingMap[filter])
      )
    }
    
    return results
  }
)
