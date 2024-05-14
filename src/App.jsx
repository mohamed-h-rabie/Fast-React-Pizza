import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './UI/Home'
import Error from './UI/Error'
import Menu, { loader as MenuLoader } from './features/menu/Menu'
import Cart from './features/cart/Cart'
import CreateOrder, {
    action as CreateNewOrder,
} from './features/order/CreateOrder'
import Order, { loader as OrderLoader } from './features/order/Order'
import AppLayout from './UI/AppLayout'

import { action as CreateUpdateOrder } from './features/order/updateOrder'

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                errorElement: <Error />,
                loader: MenuLoader,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: CreateNewOrder,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                errorElement: <Error />,
                loader: OrderLoader,
                action: CreateUpdateOrder,
            },
        ],
    },
])
function App() {
    return <RouterProvider router={router} />
}

export default App
