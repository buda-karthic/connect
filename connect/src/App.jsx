import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './App.module.scss'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import ProductGrid from './components/ProductGrid/ProductGrid'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'
import NoResults from './components/NoResults/NoResults'
import { fetchProducts } from './store/productsSlice'
import { setSearchTerm, togglePricingFilter, resetPricingFilter } from './store/filtersSlice'
import {
  selectFilteredProducts,
  selectLoading,
  selectError,
  selectSearchTerm,
  selectPricingFilter
} from './store/selectors'
import { updateUrlWithFilters } from './utils/urlUtils'

function App() {
  const dispatch = useDispatch()
  
  // Select state from Redux store
  const filteredProducts = useSelector(selectFilteredProducts)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const searchTerm = useSelector(selectSearchTerm)
  const pricingFilter = useSelector(selectPricingFilter)

  // Load products on component mount
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  // Sync URL with Redux state changes
  useEffect(() => {
    updateUrlWithFilters({
      searchTerm,
      pricingFilter
    })
  }, [searchTerm, pricingFilter])

  // Format price to USD currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  // Get pricing option display text
  const getPricingLabel = (option) => {
    const labels = {
      0: 'Buy Now',
      1: 'FREE', 
      2: 'View Only'
    }
    return labels[option] || 'Unknown'
  }

  // Handle search input change
  const handleSearchChange = (value) => {
    dispatch(setSearchTerm(value))
  }

  // Handle pricing filter change
  const handlePricingFilterChange = (filter) => {
    if (filter === 'reset') {
      dispatch(resetPricingFilter())
    } else {
      dispatch(togglePricingFilter(filter))
    }
  }

  // Handle retry when error occurs
  const handleRetry = () => {
    dispatch(fetchProducts())
  }

  // Loading state
  if (loading) {
    return <Loading />
  }

  // Error state
  if (error) {
    return <Error error={error} onRetry={handleRetry} />
  }

  return (
    <div className={styles.app}>
      <Header />
      <Search 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        resultsCount={filteredProducts.length}
        pricingFilter={pricingFilter}
        onPricingFilterChange={handlePricingFilterChange}
      />
      
      <main className={styles.main}>
        {filteredProducts.length === 0 && searchTerm ? (
          <NoResults />
        ) : (
          <ProductGrid 
            products={filteredProducts}
            formatPrice={formatPrice}
            getPricingLabel={getPricingLabel}
          />
        )}
      </main>
    </div>
  )
}

export default App