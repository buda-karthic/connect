import React from 'react'
import styles from './ProductCard.module.scss'

const ProductCard = ({ product, formatPrice, getPricingLabel }) => {
  const getBadgeClass = (option) => {
    const classes = {
      0: styles.productCard__badgeBuy,
      1: styles.productCard__badgeOffer,
      2: styles.productCard__badgeAuction
    }
    return classes[option] || ''
  }

  return (
    <div className={styles.productCard}>
      <div className={styles.productCard__imageContainer}>
        <img
          src={product.imagePath}
          alt={product.title}
          className={styles.productCard__image}
          loading="lazy"
        />
      </div>
      <div className={styles.productCard__info}>
        <h3 className={styles.productCard__title}>{product.title}</h3>
        
        {product.pricingOption !== 0 && (
          <div className={`${styles.productCard__badge} ${getBadgeClass(product.pricingOption)}`}>
            {getPricingLabel(product.pricingOption)}
          </div>
        )}
        {product.pricingOption === 0 && (
          <div className={styles.productCard__price}>{formatPrice(product.price)}</div>
        )}
        <p className={styles.productCard__creator}>{product.creator}</p>
      </div>
    </div>
  )
}

export default ProductCard
