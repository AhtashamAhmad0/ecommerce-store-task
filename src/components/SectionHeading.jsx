import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function SectionHeading({ eyebrow, title, subtitle, cta, ctaTo }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1C1917]/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl"
      >
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#581845]/10 text-[#581845] text-[11px] font-semibold uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1C1917] tracking-tight font-light">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[#57534E] text-sm sm:text-base mt-2 font-normal">
            {subtitle}
          </p>
        )}
      </motion.div>

      {cta && ctaTo && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={ctaTo}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#581845] text-white text-xs font-medium tracking-wider uppercase hover:bg-[#3d1130] transition-all duration-300 shadow-lg shadow-[#581845]/15"
          >
            <span>{cta}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </div>
  )
}