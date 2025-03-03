// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import OrderItem from "./OrderItem";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = useLoaderData();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="my-5 w-5/6 max-w-2xl space-y-8">
      <div className="flex flex-wrap justify-between">
        <h2 className="font-xl mb-8 font-bold">Order {id} status</h2>

        <div className="space-x-5">
          {priority && (
            <span className="rounded-full bg-red-500 px-5 py-2 text-sm text-red-100">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-5 py-2 text-sm text-green-100">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-2 rounded-lg bg-stone-400/40 p-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide divide-y-8 divide-stone-200 border-y border-stone-200 p-5">
        {cart.map((item, i) => (
          <OrderItem item={item} key={i} />
        ))}
      </ul>
      <div className="space-y-3 rounded-lg bg-stone-400/40 p-5">
        <p className="text-sm text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}
export function loader({ params }) {
  const { orderId } = params;
  const order = getOrder(orderId);
  return order;
}

export default Order;
