import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { formatDate } from "../../utilities/helpers";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const error = useActionData();
  const isSubmitting = useNavigation().state === "submitting";
  return (
    <div className="w-5/6 max-w-2xl">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/pizza/order/new">
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="grow" />
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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="w-full" />
          </div>
        </div>

        <div className="my-8 space-x-2.5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
            className="accent-yellow-400"
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting}>
            {" "}
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
    priority: data.priority === "on",
  };
  if (!isValidPhone(formattedData.phone)) error.phone = "Invalid phone number";
  if (Object.keys(error).length) return error;
  const order = await createOrder(formattedData);
  return redirect(`/pizza/order/${order.id}`);
}
export default CreateOrder;
