import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    //cart :[]
    cart: [],
}
const CartStore = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            //هنا لازم
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        increaseQunatity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )

            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
            if (item.quantity === 0)
                CartStore.caseReducers.deleteItem(state, action)
        },
        clearCart(state, action) {
            state.cart = []
        },
    },
})
export const {
    addItem,
    deleteItem,
    increaseQunatity,
    decreaseQuantity,
    clearCart,
} = CartStore.actions

export default CartStore.reducer

export const getnumOfPizzas = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const gettotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
export const getCart = (state) => state.cart.cart
export const getQuantituByID = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
