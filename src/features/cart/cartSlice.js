import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action){
            // payload = new pizza item
            state.cart.push(action.payload)
        },
        deleteItem(state, action){
            // payload = pizzaId
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        IncreaseItem(state, action){
            // payload = pizzaId
            state.cart.map(item => {
                if(item.pizzaId === action.payload){
                    item.quantity++
                    item.totalprice = item.unitPrice * item.quantity
                }
                return item
            } )
        },
        DecreaseItem(state,action){
            // payload = pizzaId
            state.cart.map(item => {
                if(item.pizzaId === action.payload){
                    item.quantity--
                    item.totalprice = item.unitPrice * item.quantity
                    item.quantity === 0 && cartSlice.caseReducers.deleteItem(state, action)
                }
                return item
            } )
        },
        clearCart(state){
            state.cart = []
        }
    }
})

export const {addItem, deleteItem, IncreaseItem, DecreaseItem, clearCart} = cartSlice.actions
export default cartSlice.reducer
export const getTotalQuantity = store => store.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getTotalPrice = store => store.cart.cart.reduce((sum, item) => sum + item.totalprice, 0)
export const getCart = store => store.cart.cart
export const getPizzaCart = id => store => store.cart.cart.find(item => item.pizzaId === id)
export const getPizzaQuantity = id => store => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0