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

        {/* Clean Light Floating Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories?.map((c, i) => {
            const IconComponent = ICONS[c.icon] || Sparkles
            const formattedIndex = String(i + 1).padStart(2, '0')

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
                  className="group relative flex flex-col justify-between p-7 rounded-[2rem] bg-cream text-berry hover:bg-white transition-all duration-500 h-[280px] overflow-hidden shadow-2xl shadow-berry-dark/50 hover:shadow-white/20 hover:-translate-y-1.5"
                >
                  {/* Top Row: Berry Badge Icon & Subtle Index */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-berry text-cream group-hover:bg-berry-dark flex items-center justify-center transition-all duration-300 shadow-md">
                      <IconComponent size={20} strokeWidth={1.8} />
                    </div>

                    <span className="font-mono text-xs font-bold text-berry/40 group-hover:text-berry transition-colors">
                      {formattedIndex}
                    </span>
                  </div>

                  {/* Bottom Details & Action Button */}
                  <div className="relative z-10">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold text-berry group-hover:text-berry-dark transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-xs text-berry/70 mt-2 line-clamp-2 leading-relaxed font-normal">
                          {c.blurb || 'Bioactive formulas engineered for daily health and natural skin glow.'}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-berry/10 text-berry group-hover:bg-berry group-hover:text-cream flex items-center justify-center shrink-0 transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Subtle Inner Card Lighting Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blush/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}