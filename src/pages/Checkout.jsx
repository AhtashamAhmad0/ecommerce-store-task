import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductImage } from '../data/productImages'
import { useCart, computeTotals } from '../context/CartContext'
import { products } from '../data/products'

const emptyForm = { name: '', phone: '', email: '', address: '', city: '', notes: '' }

export default function Checkout() {
  const { items, clearCart } = useCart()
  const navigate = useNavigate()
  const { lines, subtotal, shipping, total } = computeTotals(items, products)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (lines.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-28 text-center">
        <h1 className="font-display text-3xl text-ink mb-3">Nothing to check out</h1>
        <p className="text-ink-soft mb-8">Your cart is empty. Add a few favourites before checking out.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-berry text-cream px-7 py-3.5 rounded-full font-medium hover:bg-berry-dark transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    if (!form.city.trim()) e.city = 'City is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    const orderNumber = `LMR-${Math.floor(100000 + Math.random() * 900000)}`
    const order = {
      orderNumber,
      customer: form,
      lines: lines.map((l) => ({ name: l.product.name, qty: l.qty, unit: l.unit, subtotal: l.subtotal, slug: l.product.slug, category: l.product.category, accent: l.product.accent })),
      subtotal, shipping, total,
      placedAt: new Date().toISOString(),
    }
    setTimeout(() => {
      sessionStorage.setItem('lumeire_last_order', JSON.stringify(order))
      clearCart()
      navigate('/order-confirmation')
    }, 600)
  }

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="text-xs text-ink-soft mb-1.5 block">{label}</label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className={`w-full border rounded-xl px-4 py-3 text-sm bg-cream-dark/40 focus:outline-none focus:border-berry ${
          errors[key] ? 'border-berry' : 'border-ink/15'
        }`}
      />
      {errors[key] && <p className="text-berry text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-8"
        >
          <div>
            <h2 className="font-display text-xl text-ink mb-4">Contact &amp; Delivery</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {field('name', 'Full Name', 'text', 'Jane Doe')}
              {field('phone', 'Phone Number', 'tel', '03xx-xxxxxxx')}
              {field('email', 'Email Address', 'email', 'you@example.com')}
              {field('city', 'City', 'text', 'Islamabad')}
              <div className="sm:col-span-2">{field('address', 'Delivery Address', 'text', 'House no, street, area')}</div>
            </div>
          </div>

          <div>
            <label className="text-xs text-ink-soft mb-1.5 block">Order Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              placeholder="Delivery instructions, gift note, etc."
              className="w-full border border-ink/15 rounded-xl px-4 py-3 text-sm bg-cream-dark/40 focus:outline-none focus:border-berry"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-berry text-cream px-6 py-4 rounded-full font-medium hover:bg-berry-dark transition-colors disabled:opacity-60"
          >
            {submitting ? 'Placing your order...' : `Place Order \u2014 Rs ${total.toLocaleString()}`}
          </button>
          <p className="text-xs text-ink-soft/70 text-center -mt-4">
            This is a frontend demo &mdash; no real payment or order processing occurs.
          </p>
        </motion.form>

        <div className="bg-cream-dark/60 rounded-2xl p-7 h-fit sticky top-24">
          <h2 className="font-display text-xl text-ink mb-5">Order Summary</h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {lines.map(({ product, qty, subtotal: lineSub }) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cream rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  <img src={getProductImage(product)} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink line-clamp-1">{product.name}</p>
                  <p className="text-xs text-ink-soft">Qty {qty}</p>
                </div>
                <p className="text-sm text-ink shrink-0">Rs {lineSub.toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm mt-6 pt-5 border-t border-ink/10">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span><span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : `Rs ${shipping.toLocaleString()}`}</span>
            </div>
            <div className="flex justify-between font-display text-lg text-ink pt-2">
              <span>Total</span><span>Rs {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
