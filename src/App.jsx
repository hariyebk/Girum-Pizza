import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Menu, {loader as menuLoader} from "./features/menu/Menu"
import Error from "./components/Error"
import Cart from "./features/cart/Cart"
import CreateOrder, {action as createOrderAction} from "./features/order/CreateOrder"
import Order , {loader as orderLoader} from "./features/order/Order"
import {action as updateOrderAction} from "./features/order/UpdateOrderPriority"
import AppLayout from "./components/AppLayout"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // If a specific route doesn't have it's error handler, the error will bubble up.
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        // the action will be excuted as soon as the form is submitted
        action: createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />
      }
    ]
  }

])

function App() {
  return <RouterProvider router = {router}>

  </RouterProvider>
}

export default App
