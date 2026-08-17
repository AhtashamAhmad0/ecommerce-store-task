import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Search, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=skincare', label: 'Skincare' },
  { to: '/shop?category=makeup', label: 'Makeup' },
  { to: '/shop?category=fragrances', label: 'Fragrances' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const suggestions = query.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur shadow-[0_1px_0_0_rgba(36,28,26,0.08)]' : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="font-display text-2xl md:text-3xl tracking-tight text-ink">
          Lum&eacute;ire
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `label-caps text-[11px] tracking-[0.18em] transition-colors ${
                  isActive ? 'text-berry' : 'text-ink-soft hover:text-berry'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button
            aria-label="Search products"
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 text-ink hover:text-berry transition-colors"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>
          <Link to="/cart" aria-label="View cart" className="relative p-2 text-ink hover:text-berry transition-colors">
            <ShoppingBag size={19} strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-berry text-cream text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button className="lg:hidden p-2 text-ink" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink/10 bg-cream">
          <form onSubmit={submitSearch} className="max-w-3xl mx-auto px-5 py-4 relative">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for serums, lipsticks, fragrances..."
              className="w-full bg-transparent border-b border-ink/25 py-2 text-lg font-display placeholder:text-ink-soft/50 focus:outline-none focus:border-berry"
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-5 right-5 top-full mt-1 bg-white shadow-lg rounded-b-md overflow-hidden z-20">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/product/${s.slug}`)
                        setSearchOpen(false)
                        setQuery('')
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-cream-dark transition-colors"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
      )}

      {open && (
        <div className="lg:hidden bg-cream border-t border-ink/10 px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="label-caps text-xs text-ink-soft">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
