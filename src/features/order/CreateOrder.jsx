import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../UI/Button'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../cart/EmptyCart'
import { clearCart, gettotalPrice } from '../cart/cartSlice'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    )

function CreateOrder() {
    const navigation = useNavigation()
    console.log(navigation)
    const isSubmitting = navigation.state === 'submitting'
    const formerrors = useActionData()
    const [withPriority, setWithPriority] = useState(false)
    const cart = useSelector((state) => state.cart.cart)
    const {
        username,
        status: statusAddress,
        position,
        address,
        error: errormessage,
    } = useSelector((state) => state.user)
    const isLoading = statusAddress === 'loading'
    const totalCartPrice = useSelector(gettotalPrice)
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
    const totalPrice = totalCartPrice + priorityPrice
    const dispatch = useDispatch()

    if (!cart.length) return <EmptyCart />
    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let's go!
            </h2>

            <Form method="POST">
                <div
                    className="mb-5 flex flex-col gap-2 
                sm:flex-row sm:items-center
                "
                >
                    <label className="sm:basis-40">First Name</label>

                    <input
                        type="text"
                        name="customer"
                        required
                        className="input grow"
                        defaultValue={username}
                    />
                </div>

                <div
                    className="mb-5 flex flex-col gap-2 
                sm:flex-row sm:items-center
                "
                >
                    <label className="mb-5  sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input w-full "
                        />
                        {formerrors?.phone && (
                            <p className="mt-2 rounded-md bg-red-100 text-sm text-red-700">
                                {formerrors}
                            </p>
                        )}
                    </div>
                </div>

                <div
                    className="relative mb-5 flex flex-col 
                gap-2 sm:flex-row sm:items-center
                "
                >
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            className="input w-full"
                            disabled={isLoading}
                            defaultValue={address}
                        />

                        {statusAddress === 'error' && (
                            <p className="mt-2 rounded-md bg-red-100 text-sm text-red-700">
                                {errormessage}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[4px] top-9 z-50 sm:right-[3px] sm:top-[3px]">
                            <Button
                                type="small"
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(fetchAddress())
                                }}
                                disabled={isLoading}
                            >
                                Get position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                        className="
                        h-6 w-6 accent-yellow-400
                        focus:outline-none
                        focus:ring
                        focus:ring-yellow-400 focus:ring-offset-2
                        "
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>
                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude},${position.longitude}`
                                : ''
                        }
                    />
                    <Button type="primary" disabled={isSubmitting}>
                        {isSubmitting || isLoading
                            ? 'placing Order'
                            : `Order now ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        Priority: data.Priority === 'true',
    }
    const errors = {}
    if (!isValidPhone(order.phone))
        errors.phone = 'please write your phone number correctly'
    if (Object.keys(errors).length > 0) return errors
    const newOrder = await createOrder(order)
    store.dispatch(clearCart())

    return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder
