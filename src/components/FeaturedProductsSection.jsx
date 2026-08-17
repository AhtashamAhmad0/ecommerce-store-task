import React from 'react'
import SectionHeading from './SectionHeading'
import ProductCard from './ProductCard'
import { products } from '../data/products'

export default function FeaturedProductsSection({ featured = [] }) {
  // Agar prop empty ho to products array se items auto-fallback le ga
  const displayItems = featured.length > 0 
    ? featured 
    : products.filter((p) => p.badge === 'Best Seller').slice(0, 4)

  return (
    <section className="bg-[#FBF9F5] py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Title */}
        <SectionHeading
          eyebrow="Curated For You"
          title="Featured Collection"
          subtitle="Handpicked bioactive formulations designed for everyday natural radiance."
          cta="View All Products"
          ctaTo="/shop"
        />

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayItems.map((p, i) => (
            <ProductCard key={p.id || i} product={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}