import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { formatDate } from "../../utilities/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { clearCart, getTotolPrice } from "../cart/cartSlice";
import store from "../../store";
import { fetchAddress, setUsername } from "../user/userSlice";
import { getAddress } from "../../services/apiGeocoding";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const totalPrice = useSelector(getTotolPrice);
  const priorityPrice = withPriority ? 0.2 * totalPrice : 0;

  const {
    username,
    status,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoading = status === "loading";
  const isError = status === "error";
  const { cart } = useSelector((state) => state.cart);
  const error = useActionData();
  const dispatch = useDispatch();
  const isSubmitting = useNavigation().state === "submitting";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="w-5/6 max-w-2xl">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/pizza/order/new">
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input type="hidden" value={priorityPrice} name="priorityPrice" />
        <input
          type="hidden"
          value={
            position
              ? `latitude:${position.latitude},\nlongitude:${position.longitude}`
              : ""
          }
          name="position"
        />
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="grow"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="w-full" />
            {error?.phone && (
              <p className="mt-1 rounded-b-sm bg-red-200 py-0.5 text-center text-xs text-red-600">
                {error.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="w-full"
              defaultValue={address}
            />
            {errorAddress && (
              <p className="mt-1 rounded-b-sm bg-red-200 py-0.5 text-center text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>
          <span className="absolute top-[35px] right-1 sm:top-1">
            {!address && !errorAddress && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Get my location"}
              </Button>
            )}
          </span>
        </div>

        <div className="my-8 space-x-2.5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="accent-yellow-400"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const req = await request.formData();
  const data = Object.fromEntries(req);
  const error = {};
  const formattedData = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
    priorityPrice: data.priorityPrice,
  };

  if (formattedData.customer !== "Guest")
    store.dispatch(setUsername(formattedData.customer));

  if (!isValidPhone(formattedData.phone)) error.phone = "Invalid phone number";
  if (Object.keys(error).length) return error;
  const order = await createOrder(formattedData);
  store.dispatch(clearCart());
  return redirect(`/pizza/order/${order.id}`);
}
export default CreateOrder;
