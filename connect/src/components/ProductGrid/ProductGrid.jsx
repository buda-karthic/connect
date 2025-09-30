import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductGrid.module.scss'

const ProductGrid = ({ products, formatPrice, getPricingLabel }) => {
  return (
    <div className={styles.productGrid}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          formatPrice={formatPrice}
          getPricingLabel={getPricingLabel}
        />
      ))}
    </div>
  )
}

export default ProductGrid
