import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ayesha R.',
    role: 'Verified Buyer',
    quote: 'The Dew Veil serum changed my skin within two weeks. It finally feels balanced instead of oily by noon.',
    rating: 5,
  },
  {
    name: 'Fatima K.',
    role: 'Verified Buyer',
    quote: 'Amber Noir gets compliments every single time. The scent lasts from my morning commute to dinner.',
    rating: 5,
  },
  {
    name: 'Zara M.',
    role: 'Verified Buyer',
    quote: 'Checkout was so easy and the packaging felt genuinely premium. My new go-to for gifting, too.',
    rating: 4,
  },
  {
    name: 'Ameer.',
    role: 'Verified Buyer',
    quote: 'Checkout was so easy and the packaging felt genuinely premium. My new go-to for gifting, too.highly recommended',
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <section className="bg-ink text-cream py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="label-caps text-[11px] text-gold mb-2 text-center">Customer Love</p>
        <h2 className="font-display text-3xl md:text-4xl text-center mb-14">What our community is saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cream/5 border border-cream/10 rounded-2xl p-7"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={15} fill={idx < t.rating ? '#B9944C' : 'none'} color="#B9944C" strokeWidth={1.5} />
                ))}
              </div>
              <p className="text-cream/80 leading-relaxed text-[15px]">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-6 font-display text-lg">{t.name}</p>
              <p className="text-xs text-cream/40">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
