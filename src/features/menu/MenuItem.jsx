import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li className="flex w-full gap-x-4 px-2 py-3 lg:px-0">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale" : ""}`}
      />
      <div className="flex w-full flex-col">
        <p className="mb-0.5 text-lg font-semibold">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm font-semibold text-stone-700">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm font-semibold text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {!soldOut && <Button type="small">Add to cart ++</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
