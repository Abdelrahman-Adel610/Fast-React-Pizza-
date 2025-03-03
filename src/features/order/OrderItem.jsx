/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div className="mt-3 flex items-center justify-between text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 italic">
        {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
