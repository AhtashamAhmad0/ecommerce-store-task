import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, Star, ShieldCheck, Leaf } from 'lucide-react'

// Animation variants for staggered typography reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const MARQUEE_ITEMS = [
  'Free Shipping Over Rs 5,000',
  '100% Vegan & Cruelty-Free',
  'Dermatologist Tested',
  'Sustainable Refill Packaging',
  'Formulated in France',
  'Clean Beauty Approved',
]

export default function Hero() {
  const visualRef = useRef(null)

  // Mouse Parallax values for interactive stage
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for high-end feel
  const springConfig = { damping: 25, stiffness: 150 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  // Subtle opposite motion for floating elements
  const floatOneX = useTransform(parallaxX, [-0.5, 0.5], [-18, 18])
  const floatOneY = useTransform(parallaxY, [-0.5, 0.5], [-18, 18])
  const floatTwoX = useTransform(parallaxX, [-0.5, 0.5], [22, -22])
  const floatTwoY = useTransform(parallaxY, [-0.5, 0.5], [22, -22])

  const handleMouseMove = (e) => {
    if (!visualRef.current) return
    const rect = visualRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="relative overflow-hidden bg-berry text-cream pt-10 lg:pt-16 pb-0 select-none">
      {/* Dynamic Purple/Berry Ambient Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-berry-dark/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blush/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 md:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Hero Editorial Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-blush text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm">
            <Sparkles size={13} className="text-blush animate-pulse" />
            <span>The 2026 Botanical Edit</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[0.95] tracking-tight text-white font-light">
            Beauty, <br />
            <span className="italic font-normal text-blush relative inline-block">
              unhurried.
              <svg className="absolute -bottom-2 left-0 w-full text-blush/60 h-3" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7C50 2 150 2 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} className="mt-7 text-cream/80 text-base md:text-lg max-w-lg leading-relaxed font-normal">
            Considered formulas for skin, lips, hair, and fragrance &mdash; crafted from pure botanical actives that honor your skin’s natural rhythm.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="group relative inline-flex items-center justify-center gap-3 bg-cream text-berry px-8 py-4 rounded-full font-semibold text-sm tracking-wide shadow-xl shadow-berry-dark/40 hover:bg-white hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Shop The Edit</span>
              <ArrowUpRight size={18} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>

            <Link
              to="/shop?category=skincare"
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300"
            >
              Explore Skincare
            </Link>
          </motion.div>

          {/* Value Highlights Grid */}
          <motion.div variants={itemVariants} className="mt-14 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">24k+</span>
              <span className="text-xs text-cream/80 mt-1 font-medium flex items-center gap-1">
                <Star size={12} className="text-amber-300 fill-amber-300" /> Devoted Clients
              </span>
            </div>
            <div className="flex flex-col border-l border-white/15 pl-6 sm:pl-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">4.9/5</span>
              <span className="text-xs text-cream/80 mt-1 font-medium flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-300" /> Dermat Verified
              </span>
            </div>
            <div className="flex flex-col border-l border-white/15 pl-6 sm:pl-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">100%</span>
              <span className="text-xs text-cream/80 mt-1 font-medium flex items-center gap-1">
                <Leaf size={12} className="text-blush" /> Clean & Vegan
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Dynamic Interactive Stage */}
        <div 
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 relative h-[440px] sm:h-[500px] lg:h-[560px] flex items-center justify-center group"
        >
          {/* Main Stage Glass Backdrop */}
          <div className="absolute inset-2 sm:inset-4 rounded-[3.5rem] bg-gradient-to-tr from-white/15 via-white/10 to-white/5 border border-white/25 backdrop-blur-2xl shadow-2xl shadow-berry-dark/60 transition-transform duration-700 ease-out group-hover:scale-[1.01]" />

          {/* Background Decorative Rings */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/15 animate-[spin_40s_linear_infinite] pointer-events-none" />
          <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-dashed border-blush/30 animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

          {/* Main Center Product Visual */}
          <motion.div
  className="relative z-20"
  whileHover={{ scale: 1.04, rotate: -1 }}
  transition={{ type: "spring", stiffness: 200, damping: 18 }}
>
  
  <img
    src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
    alt="Luxury Skincare"
    className="w-[300px] sm:w-[360px] lg:w-[430px]
               rounded-[32px]
               object-cover
               shadow-[0_40px_80px_rgba(0,0,0,0.35)]
               hover:scale-105
               transition-all
               duration-500"
    draggable={false}
  />
</motion.div>

          {/* Floating Glass Card Left */}
         <motion.div
  style={{ x: floatOneX, y: floatOneY }}
  className="absolute top-[10%] left-[2%] sm:left-[5%] z-30"
>
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-3"
  >
    <img
      src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&w=400&q=80"
      alt="Serum"
      className="w-24 h-28 rounded-2xl object-cover"
    />

    <p className="mt-3 text-xs font-semibold tracking-widest uppercase text-center text-white">
      Vitamin C Serum
    </p>
  </motion.div>
</motion.div>

          {/* Floating Glass Card Right */}
          <motion.div
  style={{ x: floatTwoX, y: floatTwoY }}
  className="absolute bottom-[10%] right-[2%] sm:right-[5%] z-30"
>
  <motion.div
    animate={{ y: [0, 12, 0] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl p-3"
  >
    <img
      src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=400&q=80"
      alt="Perfume"
      className="w-24 h-28 rounded-2xl object-cover"
    />

    <p className="mt-3 text-xs font-semibold tracking-widest uppercase text-center text-white">
      Botanical Perfume
    </p>
  </motion.div>
</motion.div>

          {/* Floating Light Micro Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-4 left-6 sm:left-10 z-40 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/90 shadow-2xl flex items-center gap-3 pointer-events-auto hover:scale-105 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-berry/15 flex items-center justify-center text-berry font-bold text-xs">
              99%
            </div>
            <div>
              <p className="text-xs font-semibold text-berry-dark leading-none">Organic Actives</p>
              <p className="text-[10px] text-berry/70 mt-0.5">Cold-pressed botanical oils</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ticker / Continuous Marquee */}
      <div className="border-y border-white/15 bg-white/10 backdrop-blur-xl py-3.5 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee w-max select-none">
          {Array.from({ length: 3 }).map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-8 pr-8">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-cream/90 hover:text-white transition-colors">
                    {item}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blush" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}