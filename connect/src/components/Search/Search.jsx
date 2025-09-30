import React from 'react'
import styles from './Search.module.scss'

const Search = ({ searchTerm, onSearchChange, resultsCount, pricingFilter, onPricingFilterChange }) => {
  return (
    <div className={styles.search}>
      <div className={styles.search__inputContainer}>
        <input
          type="text"
          placeholder="Find the Items you're looking for"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.search__input}
        />
        <div className={styles.search__icon}>
        <svg viewBox="0 0 24 24" color="inherit" size="24" className={styles.css} ><path fill-rule="evenodd" clip-rule="evenodd" d="M4.2 10.2C4.2 13.5137 6.88629 16.2 10.2 16.2C13.5137 16.2 16.2 13.5137 16.2 10.2C16.2 6.88629 13.5137 4.2 10.2 4.2C6.88629 4.2 4.2 6.88629 4.2 10.2ZM10.2 2C5.67127 2 2 5.67127 2 10.2C2 14.7287 5.67127 18.4 10.2 18.4C14.7287 18.4 18.4 14.7287 18.4 10.2C18.4 5.67127 14.7287 2 10.2 2Z"></path><path d="M16.1213 14L20.8615 18.7401C21.4472 19.3259 21.4472 20.2757 20.8615 20.8614C20.2757 21.4472 19.3259 21.4472 18.7401 20.8614L14 16.1213L16.1213 14Z"></path></svg></div>
      </div>
      
      {/* Pricing filter section */}
      <div className={styles.search__filterContainer}>
        <div className={styles.search__filterCheckboxes}>
          <label className={styles.filter__label}>Pricing Option</label>
          <label className={styles.search__filterLabel}>
            <input
              type="checkbox"
              checked={pricingFilter.includes('paid')}
              onChange={() => onPricingFilterChange('paid')}
              className={styles.search__filterCheckbox}
            />
            <span className={styles.search__filterText}>Paid</span>
          </label>
          <label className={styles.search__filterLabel}>
            <input
              type="checkbox"
              checked={pricingFilter.includes('free')}
              onChange={() => onPricingFilterChange('free')}
              className={styles.search__filterCheckbox}
            />
            <span className={styles.search__filterText}>Free</span>
          </label>
          <label className={styles.search__filterLabel}>
            <input
              type="checkbox"
              checked={pricingFilter.includes('view-only')}
              onChange={() => onPricingFilterChange('view-only')}
              className={styles.search__filterCheckbox}
            />
            <span className={styles.search__filterText}>View Only</span>
          </label>
          {pricingFilter.length > 0 && (
            <button 
              className={styles.search__resetButton}
              onClick={() => onPricingFilterChange('reset')}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      <p className={styles.search__resultsCount}>
        {resultsCount} item{resultsCount !== 1 ? 's' : ''} found
      </p>
    </div>
  )
}

export default Search
