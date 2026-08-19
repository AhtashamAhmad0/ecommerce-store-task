import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Droplet, 
  Palette, 
  Heart, 
  Wind, 
  SprayCan, 
  Flower2, 
  Sun, 
  Brush, 
  ArrowUpRight,
  Sparkles 
} from 'lucide-react'
import { categories } from '../data/products'
import { CATEGORY_IMAGE_POOL } from '../data/productImages'

// Icon Mapping
const ICONS = { 
  Droplet, 
  Palette, 
  Heart, 
  Wind, 
  SprayCan, 
  Flower2, 
  Sun, 
  Brush 
}

export default function CategoryStrip() {
  return (
    <section className="relative bg-berry text-cream py-20 md:py-28 overflow-hidden select-none">
      
      {/* Background Ambient Glows (Aligned with Hero) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-berry-dark/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-blush/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-white/15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blush text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Sparkles size={13} className="text-blush" />
              <span>Curated Edits</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight font-light leading-[1.05]">
              Shop By <span className="italic font-normal text-blush">Category</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-cream/80 text-sm sm:text-base max-w-md font-normal leading-relaxed"
          >
            Eight targeted edits built around your daily rituals, formulated with high-potency bioactive ingredients.
          </motion.p>
        </div>

        {/* Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((c, i) => {
            const IconComponent = ICONS[c.icon] || Sparkles
            const formattedIndex = String(i + 1).padStart(2, '0')
            const image = CATEGORY_IMAGE_POOL[c.slug]?.[0] || CATEGORY_IMAGE_POOL.skincare[0]

            return (
              <motion.div
                key={c.slug || i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                <Link
                  to={`/shop?category=${c.slug}`}
                  className="group relative flex flex-col justify-between p-7 rounded-[2rem] h-[280px] overflow-hidden shadow-2xl shadow-berry-dark/50 hover:shadow-white/20 hover:-translate-y-1.5 transition-all duration-500"
                >
                  {/* Background Photo */}
                  <img
                    src={image}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Readability Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-berry-dark via-berry-dark/55 to-berry-dark/10 group-hover:from-berry-dark/95 transition-colors duration-500" />

                  {/* Top Row: Icon Badge & Index */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/95 text-berry flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm">
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>

                    <span className="font-mono text-xs font-bold text-white/70 group-hover:text-white transition-colors">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Bottom Details & Action Button */}
                  <div className="relative z-10">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-white transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-xs text-white/80 mt-2 line-clamp-2 leading-relaxed font-normal">
                          {c.blurb || 'Bioactive formulas engineered for daily health and natural skin glow.'}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-white/15 text-white group-hover:bg-white group-hover:text-berry flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-45 backdrop-blur-sm">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}