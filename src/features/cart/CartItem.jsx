import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { decrementQuantity, incrementQuantity, removeItem } from "./cartSlice";
import ItemsQuantity from "./ItemsQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  return (
    <li className="flex flex-wrap items-center justify-between gap-5 py-3">
      <p>
        {quantity}&times; {name}
      </p>
      {/* <div className="flex items-center justify-between gap-3.5">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-1.5">
          <Button
            type="secondary_small"
            onClick={() => {
              dispatch(decrementQuantity(pizzaId));
            }}
          >
            -
          </Button>
          <p>{quantity}</p>
          <Button
            type="secondary_small"
            onClick={() => {
              dispatch(incrementQuantity(pizzaId));
            }}
          >
            +
          </Button>
        </div>
        <Button
          type="small"
          onClick={() => {
            dispatch(removeItem(pizzaId));
          }}
        >
          Delete
        </Button>
      </div> */}
      <ItemsQuantity
        pizzaId={pizzaId}
        totalPrice={totalPrice}
        quantity={quantity}
      />
    </li>
  );
}

export default CartItem;
