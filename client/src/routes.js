import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from './utils/constants'
import AdminPage from './pages/Admin.page'
import BasketPage from './pages/Basket.page'
import ShopPage from './pages/Shop.page'
import AuthPage from './pages/Auth.page'
import DevicePage from './pages/Device.page'

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: BASKET_ROUTE,
    Component: BasketPage
  }
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: ShopPage
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: `${DEVICE_ROUTE}/:id`,
    Component: DevicePage
  }
]
