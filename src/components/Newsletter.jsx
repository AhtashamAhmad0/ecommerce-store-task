import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-berry to-berry-dark text-cream px-8 md:px-16 py-16 text-center"
      >
        <p className="label-caps text-[11px] text-gold mb-3">Join the Inner Circle</p>
        <h2 className="font-display text-3xl md:text-5xl max-w-2xl mx-auto leading-tight">
          Get 10% off your first order, and first access to new drops
        </h2>
        {submitted ? (
          <p className="mt-8 text-gold-light">You&rsquo;re on the list &mdash; welcome to Lum&eacute;ire.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 bg-cream/10 border border-cream/25 rounded-full px-5 py-3 text-sm placeholder:text-cream/50 focus:outline-none focus:border-gold"
            />
            <button className="inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-colors">
              Subscribe <ArrowRight size={15} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
