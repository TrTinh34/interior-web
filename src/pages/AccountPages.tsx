import {
  ChevronRight,
  Heart,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
  RotateCcw,
  UserRound,
} from "lucide-react"
import { Link, NavLink } from "react-router"
import ProductCard from "../components/ProductCard"
import { Badge, Button, ButtonLink, Input } from "../components/ui"
import { orders, photos, products } from "../data/store"

export function LoginPage({ register = false }: { register?: boolean }) {
  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src={photos.sofa} alt="Warm considered interior" />
        <Link className="logo light" to="/">
          ARBOR<span>&</span>FORM
        </Link>
        <blockquote>
          “A beautiful home is not finished.
          <br />
          It is slowly, thoughtfully collected.”
        </blockquote>
      </div>
      <div className="auth-panel">
        <div className="auth-box">
          <span className="eyebrow">
            {register ? "Join our world" : "Welcome back"}
          </span>
          <h1>
            {register ? "Create your account" : "Sign in to your account"}
          </h1>
          <p>
            {register
              ? "Save your favorites, track orders and enjoy a more considered way to shop."
              : "Access your orders, saved pieces and account details."}
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            {register && (
              <>
                <label>
                  Full name
                  <Input placeholder="Your full name" />
                </label>
                <label>
                  Phone number
                  <Input placeholder="+1 000 000 0000" />
                </label>
              </>
            )}
            <label>
              Email address
              <Input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Password
              <Input type="password" placeholder="••••••••" />
            </label>
            {register && (
              <label>
                Confirm password
                <Input type="password" placeholder="••••••••" />
              </label>
            )}
            {!register && (
              <div className="form-options">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/login">Forgot password?</Link>
              </div>
            )}
            <Button>{register ? "Create account" : "Sign in"}</Button>
            {!register && (
              <Button variant="secondary">Continue with Google</Button>
            )}
          </form>
          <p className="auth-switch">
            {register ? "Already have an account?" : "Don’t have an account?"}{" "}
            <Link to={register ? "/login" : "/register"}>
              {register ? "Sign in" : "Create one"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const accountLinks = [
  ["Overview", "/account", UserRound],
  ["My orders", "/account/orders", Package],
  ["Wishlist", "/wishlist", Heart],
  ["Addresses", "/account/addresses", MapPin],
  ["Profile", "/account/profile", UserRound],
  ["Change password", "/account/password", LockKeyhole],
] as const
function AccountLayout({
  children,
  title,
  copy,
}: {
  children: React.ReactNode
  title: string
  copy: string
}) {
  return (
    <div className="page section account-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <span>My account</span>
      </div>
      <div className="account-heading">
        <span className="eyebrow">My account</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      <div className="account-layout">
        <aside className="account-nav">
          <div className="account-person">
            <span>OM</span>
            <div>
              <strong>Olivia Martin</strong>
              <small>olivia@example.com</small>
            </div>
          </div>
          <nav>
            {accountLinks.map(([label, to, Icon]) => (
              <NavLink key={to} to={to} end={to === "/account"}>
                <Icon />
                {label}
                <ChevronRight />
              </NavLink>
            ))}
            <button>
              <LogOut />
              Log out
            </button>
          </nav>
        </aside>
        <div className="account-content">{children}</div>
      </div>
    </div>
  )
}

export function AccountPage() {
  return (
    <AccountLayout
      title="Welcome back, Olivia"
      copy="Here is what is happening with your account."
    >
      <div className="account-stats">
        <div>
          <span>Active orders</span>
          <strong>1</strong>
          <Link to="/account/orders">View orders →</Link>
        </div>
        <div>
          <span>Saved pieces</span>
          <strong>4</strong>
          <Link to="/wishlist">View wishlist →</Link>
        </div>
        <div>
          <span>Member since</span>
          <strong>2024</strong>
          <small>Thank you for being here</small>
        </div>
      </div>
      <div className="account-section">
        <div className="section-mini-title">
          <h2>Recent orders</h2>
          <Link to="/account/orders">View all</Link>
        </div>
        <OrdersTable compact />
      </div>
      <div className="account-section">
        <div className="section-mini-title">
          <h2>Your wishlist</h2>
          <Link to="/wishlist">View all</Link>
        </div>
        <div className="product-grid mini">
          {products.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </AccountLayout>
  )
}

function OrdersTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.slice(0, compact ? 2 : 3).map((o) => (
            <tr key={o.id}>
              <td>
                <strong>{o.id}</strong>
              </td>
              <td>{o.date}</td>
              <td>{o.items}</td>
              <td>{o.total}</td>
              <td>
                <Badge tone={o.status === "Delivered" ? "success" : "warning"}>
                  {o.status}
                </Badge>
              </td>
              <td>
                <Link to={`/account/orders/${o.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export function OrdersPage() {
  return (
    <AccountLayout
      title="My orders"
      copy="Review your order history and track current deliveries."
    >
      <div className="account-section">
        <OrdersTable />
      </div>
    </AccountLayout>
  )
}

export function OrderDetailPage() {
  return (
    <AccountLayout title="Order ARB-10482" copy="Placed on October 5, 2026">
      <div className="order-status">
        <Badge tone="warning">Processing</Badge>
        <div className="timeline">
          {[
            "Order placed",
            "Confirmed",
            "Preparing",
            "Shipped",
            "Delivered",
          ].map((x, i) => (
            <div className={i < 2 ? "done" : ""} key={x}>
              <span>{i < 2 && <span>✓</span>}</span>
              <strong>{x}</strong>
              <small>{i < 2 ? "Oct 5" : "Pending"}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="account-section">
        <h2>Items in your order</h2>
        {products.slice(0, 2).map((p, i) => (
          <div className="order-product" key={p.id}>
            <img src={p.imageUrl} alt="" />
            <span>
              <strong>{p.name}</strong>
              <small>Warm ivory · Medium · Qty {i + 1}</small>
            </span>
            <b>${p.price}</b>
          </div>
        ))}
      </div>
      <div className="order-columns">
        <div className="account-section">
          <h3>Shipping address</h3>
          <p>
            Olivia Martin
            <br />
            24 Willow Lane
            <br />
            Portland, OR 97205
            <br />
            United States
          </p>
        </div>
        <div className="account-section">
          <h3>Payment</h3>
          <p>
            Visa ending in 4242
            <br />
            Billing address same as shipping
          </p>
        </div>
      </div>
      <div className="detail-total">
        <span>
          Subtotal <b>$567.00</b>
        </span>
        <span>
          Shipping <b>$12.00</b>
        </span>
        <strong>
          Total <b>$579.00</b>
        </strong>
      </div>
      <Button>
        <RotateCcw size={17} /> Reorder these items
      </Button>
    </AccountLayout>
  )
}
