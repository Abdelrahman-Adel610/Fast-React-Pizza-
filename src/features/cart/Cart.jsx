import Blue_Link from "../../ui/Link";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
function Cart() {
  const { cart } = useSelector((state) => state.cart);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="max-w-xl sm:w-1/2">
      <Blue_Link to="/pizza/menu">&larr; Back to menu</Blue_Link>
      {cart.length > 0 ? (
        <>
          <h2 className="mt-6 text-xl font-bold">Your cart, {username}</h2>
          <ul className="divide my-6 divide-y divide-stone-300 border-b border-stone-300">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </ul>
          <div className="space-x-5">
            <Button to="/pizza/order/new">Order pizzas</Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}

export default Cart;
