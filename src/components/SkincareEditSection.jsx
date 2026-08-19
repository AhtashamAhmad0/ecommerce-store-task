import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, Plus, Check } from 'lucide-react'
import { getProductImage } from '../data/productImages'


// Fallback data agar props empty / undefined hon
const DEFAULT_EDIT = [
  {
    id: 1,
    name: 'Gentle Hydrating Cleanser',
    slug: 'hydrating-cleanser',
    category: 'skincare',
    accent: 1,
    short: 'Sulfate-free formulation that cleanses without stripping natural oils.'
  },
  {
    id: 2,
    name: 'Barrier Recovery Serum',
    slug: 'barrier-serum',
    category: 'skincare',
    accent: 2,
    short: 'Concentrated Niacinamide & Hyaluronic Acid complex.'
  },
  {
    id: 3,
    name: 'Bio-Active Nourishing Cream',
    slug: 'nourishing-cream',
    category: 'skincare',
    accent: 3,
    short: 'Ceramides and botanical oils for deep overnight restoration.'
  }
]

export default function SkincareEditSection({ skincareEdit }) {
  // Safely use passed array or fallback to default
  const products = (skincareEdit && skincareEdit.length > 0) ? skincareEdit : DEFAULT_EDIT
  
  const [activeIndex, setActiveIndex] = useState(0)
  const activeProduct = products[activeIndex] || products[0]
  const productImage = getProductImage(activeProduct)

  return (
    <section className="relative bg-[#F3EFEA] py-20 md:py-28 overflow-hidden select-none ">
      
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 font-display text-[16vw] leading-none text-[#1C1917]/[0.07] pointer-events-none tracking-tighter">
        RITUAL
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1C1917]/15">
          <div>
            
            <h2 className="font-display text-4xl sm:text-6xl text-[#1C1917] font-light tracking-tight">
              Skin, <span className="italic font-normal text-[#581845]">simplified.</span>
            </h2>
          </div>
          <p className="text-[#57534E] text-sm sm:text-base max-w-sm leading-relaxed">
            Three concentrated formulations designed to work in synergy for daily skin barrier support.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 space-y-3">
            {products.map((p, idx) => {
              const isActive = activeIndex === idx
              return (
                <div
                  key={p.id || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`group cursor-pointer p-5 sm:p-6 rounded-3xl transition-all duration-300 border ${
                    isActive 
                      ? 'bg-berry text-white border-[#1C1917] shadow-xl' 
                      : 'bg-white/70 hover:bg-white text-[#1C1917] border-[#1C1917]/10 hover:border-[#581845]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-[11px] uppercase tracking-widest ${isActive ? 'text-[#D4AF37]' : 'text-[#581845]'}`}>
                      STEP 0{idx + 1}
                    </span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ${
                      isActive ? 'bg-white/10 text-white rotate-45' : 'bg-[#1C1917]/5 text-[#1C1917] group-hover:rotate-90'
                    }`}>
                      <Plus size={12} />
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl mt-3 font-normal tracking-tight">
                    {p.name}
                  </h3>

                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isActive ? 'text-white/70' : 'text-[#57534E]'}`}>
                    {p.short}
                  </p>
                </div>
              )
            })}

            <div className="pt-2">
              <Link
                to="/shop?category=skincare"
                className="w-full inline-flex items-center justify-between px-6 py-4 rounded-2xl bg-[#581845] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#3D1130] transition-colors shadow-md"
              >
                <span>Shop Full 3-Step Edit</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Stage Card */}
          <div className="lg:col-span-7 rounded-[2.5rem] bg-white border border-[#1C1917]/10 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct?.id || activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Side */}
                <div className="sm:col-span-5 order-1 sm:order-2 relative h-64 sm:h-80 rounded-[28px] overflow-hidden border border-[#1C1917]/10 bg-white shadow-xl">

  <img
    src={productImage}
    alt={activeProduct?.name}
    loading="lazy"
    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20" />

  <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#581845] shadow">
    Step 0{activeIndex + 1}
  </span>

  <div className="absolute bottom-5 left-5 right-5">
    <div className="rounded-2xl bg-white/85 backdrop-blur-md p-4 shadow-lg">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#581845] font-semibold">
        Premium Formula
      </p>

      <h4 className="mt-1 text-lg font-semibold text-[#1C1917]">
        {activeProduct?.name}
      </h4>

      <p className="mt-1 text-xs text-[#57534E] line-clamp-2">
        {activeProduct?.short}
      </p>
    </div>
  </div>

</div>

                {/* Content Side */}
                <div className="sm:col-span-7 order-2 sm:order-1 space-y-5">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md bg-[#581845]/10 text-[#581845] text-[10px] font-semibold uppercase tracking-widest mb-2">
                      Active Formulation
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#1C1917] font-normal leading-tight">
                      {activeProduct?.name}
                    </h3>
                  </div>

                  <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed font-normal">
                    {activeProduct?.short}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#1C1917]/10">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#581845] font-semibold">Key Highlights:</p>
                    <div className="grid grid-cols-1 gap-1.5 text-xs text-[#1C1917]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#581845]" />
                        <span>Dermatologically tested formula</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#581845]" />
                        <span>Multi-layer moisture retention</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-[#581845]" />
                        <span>100% Vegan & cruelty-free</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/product/${activeProduct?.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#581845] transition-colors"
                    >
                      <span>View Formula Details</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}