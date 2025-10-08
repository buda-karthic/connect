import { createSlice } from '@reduxjs/toolkit'
import { getFiltersFromUrl } from '../utils/urlUtils'

// Initialize state from URL parameters
const getInitialState = () => {
  try {
    return getFiltersFromUrl();
  } catch (error) {
    console.warn('Failed to parse URL parameters, using default state:', error);
    return {
      searchTerm: '',
      pricingFilter: [],
    };
  }
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: getInitialState(),
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    togglePricingFilter: (state, action) => {
      const filter = action.payload
      if (state.pricingFilter.includes(filter)) {
        state.pricingFilter = state.pricingFilter.filter(f => f !== filter)
      } else {
        state.pricingFilter.push(filter)
      }
    },
    resetPricingFilter: (state) => {
      state.pricingFilter = []
    },
  },
})

export const { setSearchTerm, togglePricingFilter, resetPricingFilter } = filtersSlice.actions
export default filtersSlice.reducer
