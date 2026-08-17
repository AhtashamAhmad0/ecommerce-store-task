import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/about'
import CategoryStrip from '../components/CategoryStrip'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import SectionHeading from '../components/SectionHeading'
import ProductCard from '../components/ProductCard'
import ProductVisual from '../components/ProductVisual'
import { products } from '../data/products'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import SkincareEditSection from '../components/SkincareEditSection'

const featured = products.filter((p) => p.badge === 'Best Seller').slice(0, 4)
const newArrivals = [...products].filter((p) => p.badge === 'New').concat(products.slice(18, 21)).slice(0, 4)
const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)
const offers = products.filter((p) => p.discount > 0).slice(0, 4)
const skincareEdit = products.filter((p) => p.category === 'skincare' || p.category === 'face-care').slice(0, 3)

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      
      {/* Featured Products Section with prop passed */}
      <FeaturedProductsSection featured={featured} />

      <CategoryStrip />

      {/* New Arrivals */}
      <section className="bg-cream-dark/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Just Landed" title="New Arrivals" cta="Shop new-in" ctaTo="/shop" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <SectionHeading eyebrow="Community Favourites" title="Best-Selling Products" cta="View all" ctaTo="/shop" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-berry text-cream py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="label-caps text-[11px] text-gold-light mb-2">Limited Time</p>
              <h2 className="font-display text-3xl md:text-4xl">Special Offers</h2>
            </div>
            <Link to="/shop" className="label-caps text-[11px] text-gold-light border-b border-gold-light pb-0.5 w-fit">
              Shop all offers
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {offers.map((p, i) => (
              <div key={p.id} className="[&_.text-ink-soft]:text-cream/60 [&_.text-ink]:text-cream [&_.bg-cream-dark]:bg-cream/10">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty/Skincare Section */}
      <SkincareEditSection/>

      <Testimonials />
      <Newsletter />
    </div>
  )
}