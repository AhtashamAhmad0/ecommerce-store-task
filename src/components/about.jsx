import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, ShieldCheck, Truck, ArrowUpRight, Check, Sparkles } from 'lucide-react'

const PILLARS = [
  {
    id: 'clean',
    icon: Leaf,
    number: '01',
    title: 'Clean Formulas',
    subtitle: 'Pure Botanical Science',
    desc: 'No parabens, sulfates, or artificial fillers. Every drop is crafted with high-concentration bio-actives that nourish your skin without irritation.',
    tag: '100% Bio-Active'
  },
  {
    id: 'dermat',
    icon: ShieldCheck,
    number: '02',
    title: 'Dermatologist Tested',
    subtitle: 'Clinical Performance',
    desc: 'Tested on diverse skin types across extreme climates. Clinical rigor ensures visible results without compromising skin barrier health.',
    tag: 'Barrier Safe'
  },
  {
    id: 'delivery',
    icon: Truck,
    number: '03',
    title: 'Careful Delivery',
    subtitle: 'Eco-Friendly Shipping',
    desc: 'Temperature-controlled protective packaging made from 100% recycled glass and post-consumer materials, delivered directly to your door.',
    tag: 'Zero Waste'
  }
]

export default function OurStory() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="relative bg-[#FBF9F5] text-[#1C1917] py-20 md:py-32 overflow-hidden select-none">
      
      {/* Decorative Subtle Background Typography Pattern */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[14vw] font-display font-extrabold text-[#1C1917]/[0.07] whitespace-nowrap pointer-events-none uppercase tracking-tighter">
        Botanical Craft
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Editorial Split Header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-12 border-b border-[#1C1917]/10">
          
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#581845]/10 text-[#581845] text-xs font-semibold tracking-wider uppercase mb-5">
              
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] leading-[1.05] tracking-tight font-light">
              Formulated with <span className="italic font-normal text-[#581845]">intention.</span> <br />
              Worn without a second thought.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[#57534E] text-base sm:text-lg leading-relaxed font-normal">
              Luméire began with a simple frustration: beauty routines that promised the world but delivered irritation and half-used bottles. Every formula we release blends clinically-backed actives with ingredients you recognize.
            </p>
          </div>

        </div>

        {/* Interactive Story Showcase Grid */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Purple Selector Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PILLARS.map((item, index) => {
              const isActive = activeTab === index
              const IconComponent = item.icon

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border bg-[#581845] text-white ${
                    isActive
                      ? 'border-[#FBF9F5] shadow-2xl shadow-[#581845]/40 translate-x-2 ring-2 ring-[#581845]/20'
                      : 'border-white/10 opacity-85 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-white text-[#581845]' : 'bg-white/15 text-white'
                      }`}>
                        <IconComponent size={20} />
                      </span>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#FBF9F5]/70 uppercase">
                          {item.number}
                        </span>
                        <h3 className="font-display text-lg font-medium text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isActive ? 'border-white bg-white text-[#581845]' : 'border-white/30 text-white/50'
                    }`}>
                      {isActive ? <Check size={12} /> : <ArrowUpRight size={12} />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side: Active Content Display Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#1C1917]/10 shadow-xl shadow-[#1C1917]/5 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Accent Mesh */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#581845]/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col h-full justify-between gap-8"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#581845]/10 text-[#581845] text-xs font-semibold uppercase tracking-wider mb-6">
                    {PILLARS[activeTab].tag}
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-[#1C1917] font-light mb-2">
                    {PILLARS[activeTab].subtitle}
                  </h3>

                  <p className="text-[#57534E] text-base sm:text-lg leading-relaxed mt-4">
                    {PILLARS[activeTab].desc}
                  </p>
                </div>

                {/* Bottom Proof Checklist */}
                <div className="pt-6 border-t border-[#1C1917]/10 grid grid-cols-2 gap-4 text-xs font-medium text-[#1C1917]/80">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581845]" />
                    Real Skin Tested
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581845]" />
                    Zero Toxic Fillers
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581845]" />
                    Cruelty Free
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#581845]" />
                    Recyclable Packaging
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