import React from "react";
import { decrementQuantity, incrementQuantity, removeItem } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";

export default function ItemsQuantity({ pizzaId, quantity, totalPrice = 0 }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex items-center justify-between gap-3.5">
        <p className="text-sm font-bold">
          {totalPrice > 0 && formatCurrency(totalPrice)}
        </p>
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
      </div>
    </div>
  );
}
