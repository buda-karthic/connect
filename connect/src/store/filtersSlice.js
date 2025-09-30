import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchTerm: '',
    pricingFilter: [],
  },
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
