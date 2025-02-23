import { NavLink } from "react-router-dom";

function CartOverview() {
  return (
    <footer className="flex justify-between bg-stone-800 p-3.5 text-stone-200 sm:p-3">
      <p className="space-x-3.5">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <NavLink to="/pizza/cart">Open cart &rarr;</NavLink>
    </footer>
  );
}

export default CartOverview;
