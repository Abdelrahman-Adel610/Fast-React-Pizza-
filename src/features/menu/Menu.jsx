import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();
  return (
    <ul className="divide w-full max-w-3xl divide-y divide-stone-300">
      {menuData.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export function loader() {
  const data = getMenu();
  return data;
}

export default Menu;
