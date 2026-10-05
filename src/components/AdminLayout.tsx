import {
  BarChart3,
  Box,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Package,
  Percent,
  Settings,
  Star,
  Tags,
  Users,
} from "lucide-react"
import { NavLink, Outlet } from "react-router"

const nav = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Products", "/admin/products", Package],
  ["Categories", "/admin/categories", Tags],
  ["Orders", "/admin/orders", ClipboardList],
  ["Customers", "/admin/customers", Users],
  ["Inventory", "/admin/inventory", Box],
  ["Promotions", "/admin/promotions", Percent],
  ["Reviews", "/admin/reviews", Star],
  ["Blog", "/admin/blog", BarChart3],
  ["Settings", "/admin/settings", Settings],
] as const

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          A<span>&</span>F <small>STUDIO</small>
        </div>
        <nav>
          {nav.map(([label, to, Icon]) => (
            <NavLink key={to} to={to} end={to === "/admin"}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-user">
          <div>OM</div>
          <span>
            Olivia Martin<small>Administrator</small>
          </span>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <Menu />
          <div>
            <span>View storefront</span>
            <div className="avatar">OM</div>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  )
}
