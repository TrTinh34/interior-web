import {
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  Minus,
  Plus,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import ProductCard from "../components/ProductCard"
import {
  Badge,
  Button,
  ButtonLink,
  Input,
  SectionTitle,
} from "../components/ui"
import { products } from "../data/store"

export function CartPage() {
  return (
    <div className="page section">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>Shopping bag</span>
      </div>
      <div className="page-heading row">
        <div>
          <span className="eyebrow">Your selection</span>
          <h1>Shopping bag</h1>
        </div>
        <span>2 items</span>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {products.slice(0, 2).map((p, i) => (
            <article className="cart-item" key={p.id}>
              <img src={p.imageUrl} alt={p.name} />
              <div className="cart-item-info">
                <span>{p.categoryName}</span>
                <h3>{p.name}</h3>
                <p>Finish: Warm ivory · Size: Medium</p>
                <div className="quantity">
                  <Button variant="ghost">
                    <Minus />
                  </Button>
                  <span>{i + 1}</span>
                  <Button variant="ghost">
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="cart-item-price">
                <strong>${(p.price * (i + 1)).toFixed(2)}</strong>
                <Button variant="ghost">
                  <Trash2 size={17} /> Remove
                </Button>
              </div>
            </article>
          ))}
        </div>
        <OrderSummary />
      </div>
      <section className="related">
        <SectionTitle
          eyebrow="A thoughtful addition"
          title="You may also like"
        />
        <div className="product-grid">
          {products.slice(4, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  return (
    <aside className="order-summary">
      <h2>Order summary</h2>
      {checkout && (
        <div className="mini-products">
          {products.slice(0, 2).map((p, i) => (
            <div key={p.id}>
              <img src={p.imageUrl} alt="" />
              <span>
                <strong>{p.name}</strong>
                <small>Qty {i + 1}</small>
              </span>
              <b>${p.price}</b>
            </div>
          ))}
        </div>
      )}
      <div className="coupon">
        <Input placeholder="Gift card or discount code" />
        <Button variant="secondary">Apply</Button>
      </div>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>$567.00</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{checkout ? "$12.00" : "Calculated at checkout"}</dd>
        </div>
        <div>
          <dt>Discount</dt>
          <dd>—</dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>
            <small>USD</small> $579.00
          </dd>
        </div>
      </dl>
      {!checkout && (
        <ButtonLink className="checkout-btn" to="/checkout">
          Proceed to checkout
        </ButtonLink>
      )}
      <p>
        <Lock size={14} /> Secure checkout · 30-day returns
      </p>
    </aside>
  )
}

export function CheckoutPage() {
  const [payment, setPayment] = useState("card")
  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link className="logo" to="/">
          ARBOR<span>&</span>FORM
        </Link>
        <span>
          <Lock size={15} /> Secure checkout
        </span>
      </header>
      <div className="checkout-layout">
        <div className="checkout-form">
          <Link to="/cart">← Return to bag</Link>
          <h1>Checkout</h1>
          <FormSection number="1" title="Contact information">
            <div className="form-grid">
              <label className="full">
                Email address
                <Input type="email" placeholder="you@example.com" />
              </label>
              <label className="full checkbox">
                <input type="checkbox" /> Keep me updated on my order
              </label>
            </div>
          </FormSection>
          <FormSection number="2" title="Shipping address">
            <div className="form-grid">
              <label>
                First name
                <Input />
              </label>
              <label>
                Last name
                <Input />
              </label>
              <label className="full">
                Address
                <Input />
              </label>
              <label>
                City
                <Input />
              </label>
              <label>
                Postal code
                <Input />
              </label>
              <label>
                Country
                <Input value="United States" readOnly />
              </label>
              <label>
                Phone
                <Input />
              </label>
            </div>
          </FormSection>
          <FormSection number="3" title="Delivery method">
            <label className="radio-card">
              <input type="radio" checked readOnly />
              <span>
                <strong>Standard delivery</strong>
                <small>3–5 business days</small>
              </span>
              <b>$12.00</b>
            </label>
            <label className="radio-card">
              <input type="radio" />
              <span>
                <strong>Express delivery</strong>
                <small>1–2 business days</small>
              </span>
              <b>$28.00</b>
            </label>
          </FormSection>
          <FormSection number="4" title="Payment method">
            <div className="payment-tabs">
              {["card", "cod", "bank"].map((x) => (
                <Button
                  key={x}
                  variant={payment === x ? "primary" : "secondary"}
                  onClick={() => setPayment(x)}
                >
                  {x === "card" ? <CreditCard size={17} /> : null}
                  {x === "card"
                    ? "Card"
                    : x === "cod"
                      ? "Cash on delivery"
                      : "Bank transfer"}
                </Button>
              ))}
            </div>
            <div className="form-grid">
              <label className="full">
                Card number
                <Input placeholder="1234 5678 9012 3456" />
              </label>
              <label>
                Expiry date
                <Input placeholder="MM / YY" />
              </label>
              <label>
                Security code
                <Input placeholder="CVC" />
              </label>
            </div>
          </FormSection>
          <ButtonLink className="place-order" to="/order-success">
            Place order — $579.00
          </ButtonLink>
        </div>
        <OrderSummary checkout />
      </div>
    </div>
  )
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="form-section">
      <h2>
        <span>{number}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function OrderSuccessPage() {
  return (
    <div className="success-page">
      <div className="success-icon">
        <Check />
      </div>
      <span className="eyebrow">Order confirmed</span>
      <h1>Thank you for your order</h1>
      <p>
        Your order has been successfully placed. A confirmation has been sent to{" "}
        <strong>olivia@example.com</strong>.
      </p>
      <div className="success-details">
        <div>
          <span>Order number</span>
          <strong>ARB-10482</strong>
        </div>
        <div>
          <span>Order date</span>
          <strong>October 5, 2026</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>$579.00</strong>
        </div>
        <div>
          <span>Estimated delivery</span>
          <strong>October 9–11</strong>
        </div>
      </div>
      <div>
        <ButtonLink to="/account/orders/ARB-10482">Track order</ButtonLink>
        <ButtonLink to="/products" variant="secondary">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  )
}
