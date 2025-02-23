import Blue_Link from "../../ui/Link";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="max-w-xl sm:w-1/2">
      <Blue_Link to="/pizza/menu">&larr; Back to menu</Blue_Link>

      <h2 className="mt-6 text-xl font-bold">Your cart, %NAME%</h2>
      <ul className="divide my-6 divide-y divide-stone-300 border-b border-stone-300">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-5">
        <Button to="/pizza/order/new">Order pizzas</Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
