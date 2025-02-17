import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { formatDate } from "../../utilities/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
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
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST" action="/pizza/order/new">
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {error?.phone && <p>{error.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing order..." : "Order now"}
          </button>
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
