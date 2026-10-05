import { createBrowserRouter } from "react-router"
import AdminLayout from "../components/AdminLayout"
import SiteLayout from "../components/SiteLayout"
import {
  AccountPage,
  LoginPage,
  OrderDetailPage,
  OrdersPage,
} from "../pages/AccountPages"
import {
  AdminCustomersPage,
  AdminDashboard,
  AdminOrdersPage,
  AdminPlaceholder,
  AdminProductsPage,
} from "../pages/AdminPages"
import {
  CategoriesPage,
  ProductDetailPage,
  ProductsPage,
  WishlistPage,
} from "../pages/CatalogPages"
import {
  CartPage,
  CheckoutPage,
  OrderSuccessPage,
} from "../pages/CommercePages"
import {
  AboutPage,
  BlogDetailPage,
  BlogPage,
  CollectionsPage,
  ContactPage,
} from "../pages/ContentPages"
import HomePage from "../pages/HomePage"

function NotFound() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>This room feels a little empty.</h1>
      <p>The page you are looking for may have moved.</p>
      <a href="/">Return home</a>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:id", Component: ProductDetailPage },
      { path: "categories", Component: CategoriesPage },
      { path: "collections", Component: CollectionsPage },
      { path: "search", Component: () => <ProductsPage searchMode /> },
      { path: "wishlist", Component: WishlistPage },
      { path: "cart", Component: CartPage },
      { path: "account", Component: AccountPage },
      { path: "account/orders", Component: OrdersPage },
      { path: "account/orders/:id", Component: OrderDetailPage },
      { path: "account/:section", Component: AccountPage },
      { path: "blog", Component: BlogPage },
      { path: "blog/:slug", Component: BlogDetailPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
    ],
  },
  { path: "/checkout", Component: CheckoutPage },
  { path: "/order-success", Component: OrderSuccessPage },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: () => <LoginPage register /> },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "products", Component: AdminProductsPage },
      { path: "orders", Component: AdminOrdersPage },
      { path: "customers", Component: AdminCustomersPage },
      ...[
        "categories",
        "inventory",
        "promotions",
        "reviews",
        "blog",
        "settings",
      ].map((path) => ({
        path,
        Component: () => (
          <AdminPlaceholder
            title={path.charAt(0).toUpperCase() + path.slice(1)}
          />
        ),
      })),
    ],
  },
  { path: "*", Component: NotFound },
])
