import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '10000000000' // TODO: replace with the brand's real WhatsApp number

export default function WhatsAppButton({ message = "Hi Lum\u00e9ire, I'd like to ask about a product." }) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-green-800 text-cream rounded-full shadow-lg px-4 py-3.5 hover:bg-green-700 hover:text-ink transition-colors group"
    >
      <MessageCircle size={22} strokeWidth={1.8} />
      <span className="hidden group-hover:inline-block text-sm font-medium pr-1 whitespace-nowrap">
        Chat with us
      </span>
    </a>
  )
}
