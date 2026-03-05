import { useSelector, useDispatch } from "react-redux";
import './carttab.scss';
import CartItem from "../../components/CartItem";
import CheckoutForm from "../../components/CheckoutForm";
import { toggleStatusTab, toggleCheckoutForm } from "../../store/cart";

function CartTab() {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(toggleStatusTab());
    };

    const handleCheckout = () => {
        dispatch(toggleCheckoutForm());
    };

    return (
        <>
            <div className={`cart-tab ${statusTab === false ? 'translate-x-full' : ''}`}>
                <h2>Korpa</h2>
                <div className="cart-items">
                    {carts.map((item, key) =>
                        <CartItem key={key} data={item} />
                    )}
                </div>

                <div className="cart-btns">
                    <button className="cart-btn-close" onClick={handleClose}>Zatvori</button>
                    <button className="cart-btn-checkout" onClick={handleCheckout}>Poruči</button>
                </div>
            </div>
            <CheckoutForm />
        </>
    );
}

export default CartTab;