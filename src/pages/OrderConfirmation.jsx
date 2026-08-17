import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Package } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'

export default function OrderConfirmation() {
  const [order, setOrder] = useState(undefined)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lumeire_last_order')
      setOrder(raw ? JSON.parse(raw) : null)
    } catch {
      setOrder(null)
    }
  }, [])

  if (order === undefined) return null
  if (!order) return <Navigate to="/shop" replace />

  const waMsg = `Hi Lum\u00e9ire, I'd like to check on my order ${order.orderNumber}.`

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center bg-sage/15 text-sage rounded-full p-5 mb-5">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-4xl text-ink mb-2">Order Confirmed</h1>
        <p className="text-ink-soft">Thank you, {order.customer.name.split(' ')[0]}. Your order has been placed.</p>
        <p className="label-caps text-[11px] text-berry mt-4">Order Number: {order.orderNumber}</p>
      </motion.div>

      <div className="bg-cream-dark/60 rounded-2xl p-7 mb-6">
        <h2 className="font-display text-xl text-ink mb-4 flex items-center gap-2">
          <Package size={18} /> Ordered Items
        </h2>
        <div className="space-y-4">
          {order.lines.map((l) => (
            <div key={l.slug} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center shrink-0">
                <ProductVisual category={l.category} accent={l.accent} className="h-9 w-auto" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink line-clamp-1">{l.name}</p>
                <p className="text-xs text-ink-soft">Qty {l.qty}</p>
              </div>
              <p className="text-sm text-ink shrink-0">Rs {l.subtotal.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-ink/10 mt-5 pt-5 flex justify-between font-display text-lg">
          <span>Total Paid</span>
          <span>Rs {order.total.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-cream-dark/60 rounded-2xl p-6">
          <p className="label-caps text-[11px] text-ink mb-3">Delivery Information</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            {order.customer.name}<br />
            {order.customer.address}, {order.customer.city}<br />
            {order.customer.phone}<br />
            {order.customer.email}
          </p>
        </div>
        <div className="bg-cream-dark/60 rounded-2xl p-6">
          <p className="label-caps text-[11px] text-ink mb-3">What Happens Next</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            You&rsquo;ll receive a confirmation email shortly. Our team will reach out to schedule delivery.
            This is a frontend demo, so no real order is being processed or shipped.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-berry text-cream px-7 py-3.5 rounded-full font-medium hover:bg-berry-dark transition-colors">
          Continue Shopping
        </Link>
        <a
          href={`https://wa.me/10000000000?text=${encodeURIComponent(waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 border border-sage text-sage px-7 py-3.5 rounded-full font-medium hover:bg-sage hover:text-cream transition-colors"
        >
          <MessageCircle size={16} /> Contact us on WhatsApp
        </a>
      </div>
    </div>
  )
}
