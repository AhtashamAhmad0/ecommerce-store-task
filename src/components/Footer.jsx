import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { categories } from '../data/products'

const socialPaths = {
  instagram: 'M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43C21.99 8.94 22 9.3 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47C15.06 21.99 14.7 22 12 22s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77a4.9 4.9 0 0 1 1.77-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.4-8.4a1.17 1.17 0 1 1-2.34 0 1.17 1.17 0 0 1 2.34 0z',
  facebook: 'M13.5 22v-8.5h2.85l.43-3.31H13.5V8.05c0-.96.27-1.62 1.65-1.62h1.76V3.48A23.6 23.6 0 0 0 14.35 3c-2.53 0-4.26 1.54-4.26 4.37v2.82H7.24v3.31h2.85V22h3.41z',
  twitter: 'M22 5.9c-.7.31-1.45.52-2.24.62a3.9 3.9 0 0 0 1.71-2.16 7.8 7.8 0 0 1-2.48.95A3.9 3.9 0 0 0 12.14 9c0 .3.04.6.1.89A11.06 11.06 0 0 1 4.1 4.6a3.9 3.9 0 0 0 1.21 5.2 3.87 3.87 0 0 1-1.77-.49v.05a3.9 3.9 0 0 0 3.13 3.83c-.55.15-1.14.17-1.73.06a3.9 3.9 0 0 0 3.64 2.71A7.83 7.83 0 0 1 2 17.54a11.05 11.05 0 0 0 5.98 1.75c7.17 0 11.1-5.94 11.1-11.1l-.01-.5A7.9 7.9 0 0 0 22 5.9z',
}

function SocialIcon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={socialPaths[name]} />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl mb-3">Lum&eacute;ire</h3>
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            Considered formulas and quiet luxury for skin, lips, hair, and fragrance &mdash; made to be part of your
            everyday ritual.
          </p>
          <div className="flex gap-4 mt-5">
            <a href="#" aria-label="Instagram" className="text-cream/60 hover:text-gold transition-colors"><SocialIcon name="instagram" /></a>
            <a href="#" aria-label="Facebook" className="text-cream/60 hover:text-gold transition-colors"><SocialIcon name="facebook" /></a>
            <a href="#" aria-label="Twitter" className="text-cream/60 hover:text-gold transition-colors"><SocialIcon name="twitter" /></a>
            <a href="https://wa.me/10000000000" aria-label="WhatsApp" className="text-cream/60 hover:text-gold transition-colors"><MessageCircle size={18} /></a>
          </div>
        </div>

        <div>
          <p className="label-caps text-[11px] text-gold mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-cream/70">
            {categories.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`} className="hover:text-cream transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-caps text-[11px] text-gold mb-4">Support</p>
          <ul className="space-y-2.5 text-sm text-cream/70">
            <li><Link to="/shop" className="hover:text-cream transition-colors">Shipping &amp; Returns</Link></li>
            <li><Link to="/cart" className="hover:text-cream transition-colors">Track an Order</Link></li>
            <li><a href="https://wa.me/10000000000" className="hover:text-cream transition-colors">WhatsApp Support</a></li>
            <li><Link to="/shop" className="hover:text-cream transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-caps text-[11px] text-gold mb-4">Stay in the know</p>
          <p className="text-sm text-cream/60 mb-3">New arrivals, offers, and beauty edits &mdash; straight to your inbox.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 min-w-0 bg-cream/10 border border-cream/20 rounded-l-full px-4 py-2.5 text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold"
            />
            <button className="bg-gold text-ink rounded-r-full px-4 text-sm font-semibold hover:bg-gold-light transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40">
        &copy; {new Date().getFullYear()} Lum&eacute;ire Cosmetics. This is a frontend demo project &mdash; no real orders are processed.
      </div>
    </footer>
  )
}
