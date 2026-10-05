import {
  ArrowRight,
  Check,
  MessageCircle,
  Minus,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react"
import { FormEvent, useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import {
  chatErrorMessage,
  initialChatMessage,
  type ChatMessage,
  type ChatOption,
} from "../data/chat"
import type { Product } from "../data/store"
import { chatService } from "../services/chatService"
import { Button, ButtonLink, Input } from "./ui"

const conversationId = crypto.randomUUID()

export default function DecorAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([initialChatMessage])
  const [draft, setDraft] = useState("")
  const [loading, setLoading] = useState(false)
  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage(message: string, action?: string) {
    if (!message.trim() || loading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setMessages((current) => [...current, userMessage])
    setDraft("")
    setLoading(true)

    try {
      const response = await chatService.send({
        conversationId,
        message,
        action,
      })
      setMessages((current) => [...current, chatService.toMessage(response)])
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "error",
          message: chatErrorMessage,
          timestamp: "Just now",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void sendMessage(draft)
  }

  function chooseOption(option: ChatOption) {
    void sendMessage(option.label, option.value)
  }

  return (
    <div className={`decor-assistant ${open ? "is-open" : ""}`}>
      {open && (
        <section
          aria-label="Decor Assistant conversation"
          className="chat-panel"
        >
          <header className="chat-header">
            <div className="chat-brand-icon">
              <Sparkles />
            </div>
            <div>
              <h2>✨ Decor Assistant</h2>
              <p>Your personal home decor consultant</p>
            </div>
            <div className="chat-header-actions">
              <Button
                aria-label="Minimize Decor Assistant"
                onClick={() => setOpen(false)}
                variant="ghost"
              >
                <Minus />
              </Button>
              <Button
                aria-label="Close Decor Assistant"
                onClick={() => setOpen(false)}
                variant="ghost"
              >
                <X />
              </Button>
            </div>
          </header>

          <div className="chat-messages" aria-live="polite">
            <div className="chat-date">Today</div>
            {messages.map((message) => (
              <div
                className={`chat-message chat-${message.role}`}
                key={message.id}
              >
                {message.role !== "user" && (
                  <div className="chat-avatar">
                    <Sparkles />
                  </div>
                )}
                <div className="chat-message-content">
                  <div className="chat-bubble">{message.message}</div>
                  <time>{message.timestamp}</time>
                  {message.products && (
                    <div className="chat-products">
                      {message.products.map((product) => (
                        <ChatProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  {message.options && (
                    <div className="chat-options">
                      {message.options.map((option) => (
                        <Button
                          key={option.value}
                          onClick={() => chooseOption(option)}
                          variant="secondary"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  {message.role === "error" && (
                    <ButtonLink to="/products" variant="secondary">
                      Browse products <ArrowRight />
                    </ButtonLink>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message chat-assistant">
                <div className="chat-avatar">
                  <Sparkles />
                </div>
                <div className="typing-indicator" aria-label="Assistant typing">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          <form className="chat-composer" onSubmit={submit}>
            <Input
              aria-label="Message Decor Assistant"
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about your space..."
              value={draft}
            />
            <Button
              aria-label="Send message"
              disabled={!draft.trim() || loading}
              type="submit"
            >
              <Send />
            </Button>
            <span>Powered by Arbor & Form</span>
          </form>
        </section>
      )}

      {!open && (
        <Button
          aria-label="Open Decor Assistant"
          className="chat-launcher"
          onClick={() => setOpen(true)}
        >
          <MessageCircle />
          <span>Decor Assistant</span>
        </Button>
      )}
    </div>
  )
}

function ChatProductCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)
  return (
    <article className="chat-product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div>
        <span>{product.categoryName}</span>
        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="chat-product-meta">
          <strong>${product.price.toFixed(2)}</strong>
          <small>
            <Star fill="currentColor" /> {product.rating}
          </small>
        </div>
        <div className="chat-product-actions">
          <Link to={`/products/${product.id}`}>View product</Link>
          <Button
            aria-label={`Add ${product.name} to cart`}
            onClick={() => setAdded(true)}
            variant="ghost"
          >
            {added ? <Check /> : <ShoppingBag />}
            {added ? "Added" : "Add"}
          </Button>
        </div>
      </div>
    </article>
  )
}
