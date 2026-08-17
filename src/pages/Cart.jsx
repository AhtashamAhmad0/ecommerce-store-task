import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import { useCart, computeTotals } from '../context/CartContext'
import { products } from '../data/products'

export default function Cart() {
  const { items, setQty, removeItem } = useCart()
  const navigate = useNavigate()
  const { lines, subtotal, shipping, total } = computeTotals(items, products)

  if (lines.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-28 text-center">
        <div className="inline-flex items-center justify-center bg-cream-dark rounded-full p-6 mb-6">
          <ShoppingBag size={32} className="text-ink-soft" strokeWidth={1.4} />
        </div>
        <h1 className="font-display text-3xl text-ink mb-3">Your cart is empty</h1>
        <p className="text-ink-soft mb-8">Looks like you haven&rsquo;t added anything yet. Let&rsquo;s fix that.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-berry text-cream px-7 py-3.5 rounded-full font-medium hover:bg-berry-dark transition-colors">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="font-display text-4xl text-ink mb-10">Your Cart</h1>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {lines.map(({ product, qty, unit, subtotal: lineSub }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
                className="flex gap-4 md:gap-6 bg-cream-dark/60 rounded-2xl p-4 md:p-5 items-center"
              >
                <Link to={`/product/${product.slug}`} className="shrink-0 w-20 h-20 md:w-24 md:h-24 bg-cream rounded-xl flex items-center justify-center">
                  <ProductVisual category={product.category} accent={product.accent} className="h-16 w-auto" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.slug}`} className="font-display text-lg text-ink hover:text-berry transition-colors line-clamp-1">
                    {product.name}
                  </Link>
                  <p className="text-xs text-ink-soft mt-1">Rs {unit.toLocaleString()} each</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-ink/15 rounded-full bg-cream">
                      <button onClick={() => setQty(product.id, qty - 1)} className="p-2 hover:text-berry" aria-label="Decrease quantity">
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm">{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} className="p-2 hover:text-berry" aria-label="Increase quantity">
                        <Plus size={13} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(product.id)} className="text-ink-soft hover:text-berry transition-colors" aria-label="Remove item">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="font-display text-lg text-ink shrink-0">Rs {lineSub.toLocaleString()}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-berry hover:text-berry-dark mt-2">
            &larr; Continue Shopping
          </Link>
        </div>

        <div className="bg-ink text-cream rounded-2xl p-7 h-fit sticky top-24">
          <h2 className="font-display text-2xl mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-cream/70">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-cream/70">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `Rs ${shipping.toLocaleString()}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gold-light">Add Rs {(5000 - subtotal).toLocaleString()} more for free shipping.</p>
            )}
          </div>
          <div className="flex justify-between font-display text-xl mt-5 pt-5 border-t border-cream/15">
            <span>Total</span>
            <span>Rs {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-7 inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-3.5 rounded-full font-semibold hover:bg-gold-light transition-colors"
          >
            Proceed to Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
