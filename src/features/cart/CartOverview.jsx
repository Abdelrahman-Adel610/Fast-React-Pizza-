import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNumberOfPizza, getTotolPrice } from "./cartSlice";

function CartOverview() {
  const totalPizzas = useSelector(getNumberOfPizza);
  const totalPrice = useSelector(getTotolPrice);
  return (
    totalPizzas > 0 && (
      <footer className="flex justify-between bg-stone-800 p-3.5 text-stone-200 sm:p-3">
        <p className="space-x-3.5">
          <span>{totalPizzas} pizzas</span>
          <span>${totalPrice}</span>
        </p>
        <NavLink to="/pizza/cart">Open cart &rarr;</NavLink>
      </footer>
    )
  );
}

export default CartOverview;
