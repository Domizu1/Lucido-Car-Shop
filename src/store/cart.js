import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false,
    showCheckoutForm: false,
    checkoutData: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
            if (indexProductId >= 0) {
                state.items[indexProductId].quantity += quantity;
            } else {
                state.items.push({ productId, quantity });
            }
            localStorage.setItem('carts', JSON.stringify(state.items));
        },

        changeQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);

            if (indexProductId >= 0) {
                if (quantity > 0) {
                    state.items[indexProductId].quantity = quantity;
                } else {
                    state.items = state.items.filter(item => item.productId !== productId);
                }
            }
        },

        toggleStatusTab(state) {
            if (state.statusTab === false) {
                state.statusTab = true;
            } else {
                state.statusTab = false;
            }
        },

        toggleCheckoutForm(state) {
            state.showCheckoutForm = !state.showCheckoutForm;
        },

        setCheckoutData(state, action) {
            state.checkoutData = action.payload;
        }
    }
});

export const { addToCart, changeQuantity, toggleStatusTab, toggleCheckoutForm, setCheckoutData } = cartSlice.actions;
export default cartSlice.reducer;