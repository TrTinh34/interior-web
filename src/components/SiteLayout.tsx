import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react"
import { useState } from "react"
import { Link, NavLink, Outlet } from "react-router"
import DecorAssistant from "./DecorAssistant"
import { Button, Input } from "./ui"

const links = [
  ["Home", "/"],
  ["Shop", "/products"],
  ["Categories", "/categories"],
  ["Collections", "/collections"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
]

export default function SiteLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="site-shell">
      <div className="announcement">
        Complimentary shipping on orders over $100{" "}
        <Link to="/products">Shop now</Link>
      </div>
      <header className="header">
        <div className="header-inner">
          <Button
            className="mobile-toggle"
            variant="ghost"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
          <Link className="logo" to="/">
            ARBOR<span>&</span>FORM
          </Link>
          <nav className={open ? "main-nav open" : "main-nav"}>
            {links.map(([label, to]) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link aria-label="Search" to="/search">
              <Search />
            </Link>
            <Link aria-label="Wishlist" to="/wishlist">
              <Heart />
            </Link>
            <Link aria-label="Shopping cart" className="cart-link" to="/cart">
              <ShoppingBag />
              <span>2</span>
            </Link>
            <Link aria-label="Account" to="/account">
              <UserRound />
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo light" to="/">
              ARBOR<span>&</span>FORM
            </Link>
            <p>
              Considered objects for beautifully lived-in spaces. Designed to
              bring warmth, character and calm to every room.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/products">New arrivals</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
          <div>
            <h4>About</h4>
            <Link to="/about">Our story</Link>
            <Link to="/blog">Journal</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">Sustainability</Link>
          </div>
          <div>
            <h4>Join our world</h4>
            <p>Receive thoughtful notes, styling ideas and first access.</p>
            <div className="footer-form">
              <Input placeholder="Email address" />
              <Button aria-label="Subscribe">
                <span>→</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Arbor & Form</span>
          <div>
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Instagram</Link>
          </div>
        </div>
      </footer>
      <DecorAssistant />
    </div>
  )
}
