import { NavLink } from "react-router-dom";

function CartOverview() {
  return (
    <footer>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <NavLink to="/pizza/cart">Open cart &rarr;</NavLink>
    </footer>
  );
}

export default CartOverview;
