import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../components/Button";
import { useSelector, useDispatch} from "react-redux";
import { getCart } from "../cart/cartSlice";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import store from "../../store"
import LinkButton from "../../components/LinkButton";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)
  const loadingState = useNavigation().state
  const validationError = useActionData()
  const {userName, status, position, error, address} = useSelector(store => store.user)
  const dispatch = useDispatch()
  return (
    <div className="py-8 px-5">
      <LinkButton to="/cart">
        &larr; Back to Cart
      </LinkButton>

      <h2 className="mt-8 py-6 text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      
      <Form method = "POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 mb-2">First Name</label>
          <div>
            <input className = "inputs" defaultValue = {userName} type="text" name="customer" required />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 mb-2">Phone number</label>
          <div>
            <input className="inputs" type="tel" name="phone" required />
          {validationError && <p className="text-medium mt-2 px-3 text-red-600 "> {validationError.phone}</p> }
          </div>
        </div>

        <div className=" relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 mb-2">Address</label>
          <div className="mb-5" >
            <input className = "inputs" defaultValue={address} type="text" name="address" required />
            {status === "error" && <p className="text-medium mt-2 px-3 text-red-600 "> {error}</p> }
          </div>
          { position.latitude && position.longitude ? null : <span className="absolute right-[16rem] top-1">
            <button className = "h-8" onClick={(e) => {
                e.preventDefault()
                dispatch(fetchAddress())
              }} disabled = {status === "loading"}> 📍 </button>
          </span>}
        </div>

        <div>
          <input
            className="h-5 w-6 mr-4 mb-11 accent-yellow-200"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name = "cart" value = {JSON.stringify(cart)} />
          <input type = "hidden" name = "position" value = {position.latitude && position.longitude ? `${position.latitude}, ${position.longitude}` : ""}/>
          <Button type = "primary" disabled={loadingState === "loading"}>
              {loadingState === "loading" ? "placing orders ..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action ({request}){
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
    phone: +data.phone
  }

  // Data Validation
  const error = {}
  if(!isValidPhone(order.phone)){
    error.phone = "please provide A valid phone number to continue ordering your pizzas."
    return error
  }

  const newOrder = await createOrder(order)
  // When overused , it disables performance optimization in redux.
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
