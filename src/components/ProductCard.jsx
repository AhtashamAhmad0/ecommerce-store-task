import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Eye, ShoppingBag, Star } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { discountedPrice, categories } from '../data/products'
import { useCart } from '../context/CartContext'
const CATEGORY_IMAGES = {
  skincare:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",

  makeup:
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",

  "lip-care":
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",

  "hair-care":
    "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80",

  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",

  "face-care":
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",

  "body-care":
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",

  "beauty-accessories":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
}
export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const catLabel = categories?.find((c) => c.slug === product.category)?.name || product.category
  const price = discountedPrice(product)
const image =
  CATEGORY_IMAGES[product.category] ||
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      className="group relative flex flex-col h-full bg-white rounded-3xl p-3 sm:p-4 border border-[#1C1917]/10 hover:border-[#581845]/40 hover:shadow-2xl hover:shadow-[#581845]/10 transition-all duration-500"
    >
      {/* Product Image Frame */}
      <div className="relative overflow-hidden rounded-2xl bg-[#FBF9F5] aspect-[4/5] flex items-center justify-center p-6">
        
        {/* Badges Stack */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="text-[10px] font-semibold bg-[#581845] text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {product.badge}
            </span>
          )}
          {product.discount > 0 && (
            <span className="text-[10px] font-bold bg-[#D4AF37] text-[#1C1917] px-2.5 py-0.5 rounded-full uppercase">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Visual / Image */}
       <motion.div
  whileHover={{
    scale: 1.06,
    rotate: -1,
  }}
  transition={{
    duration: 0.45,
    ease: [0.16, 1, 0.3, 1],
  }}
  className="w-full h-full overflow-hidden rounded-2xl"
>
  <img
    src={image}
    alt={product.name}
    loading="lazy"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    onError={(e) => {
      e.currentTarget.src =
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80";
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20" />
</motion.div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex gap-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-xl ${
              isAdded 
                ? 'bg-emerald-700 text-white' 
                : 'bg-[#581845] text-white hover:bg-[#3d1130]'
            }`}
          >
            <ShoppingBag size={14} />
            <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
          </button>

          <Link
            to={`/product/${product.slug}`}
            className="p-3 rounded-xl bg-white text-[#1C1917] hover:text-[#581845] shadow-xl border border-[#1C1917]/10 flex items-center justify-center transition-colors"
            title="Quick View"
          >
            <Eye size={16} />
          </Link>
        </div>

      </div>

      {/* Card Content Footer */}
      <div className="pt-4 px-1 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#581845] font-bold">
              {catLabel}
            </span>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-[#D4AF37] text-xs">
              <Star size={11} fill="currentColor" />
              <span className="font-semibold text-[#1C1917] text-[11px]">4.9</span>
            </div>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="font-display text-lg text-[#1C1917] leading-snug hover:text-[#581845] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          {/* Benefit Subtitle */}
          <p className="text-xs text-[#57534E] line-clamp-1 mt-1 font-normal">
            {product.benefits?.[0] || product.short || 'Nourishing organic formulation'}
          </p>
        </div>

        {/* Price & Stock Tag */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#1C1917]/5">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-[#1C1917] text-base">
              Rs {price.toLocaleString()}
            </span>
            {product.discount > 0 && (
              <span className="text-xs text-[#57534E]/50 line-through">
                Rs {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
            product.availability === 'In Stock' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {product.availability || 'In Stock'}
          </span>
        </div>

      </div>
    </motion.div>
  )
}