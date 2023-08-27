// Test ID: IIDSAT
import {useEffect} from "react"
import {useFetcher, useLoaderData} from "react-router-dom"
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem"
import LinkButton from "../../components/LinkButton"
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utilities/helpers";
import UpdateOrderPriority from "./UpdateOrderPriority";

function Order() {
  const order = useLoaderData()

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  // fetching data from other routes.
  const fetcher = useFetcher()

  useEffect(() => {
    if(!fetcher.data && fetcher.state === "idle") fetcher.load("/menu")
  }, [fetcher])

  return (
    <div className =  "space-y-7 px-7 py-10">
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>
      <div className="flex flex-wrap items-center justify-between gap-9">
        <h2 className="text-xl font-semibold"> Order # {id} Status </h2>

        <div>
          {priority && <span className="rounded-full bg-red-500 px-3 py-1 uppercase text-sm font-semibold text-red-50 tracking-wide mr-5
          ">Priority</span>}
          <span className="rounded-full bg-green-500 px-3 py-1 uppercase text-sm font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap bg-stone-200 px-4 py-7">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-800">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200">
          {cart.map((item, i) => <OrderItem item = {item} isLoadingIngredients = {fetcher.state === "loading"} ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []} key = {i}/>)}
      </ul>

      <div className="space-y-3 bg-stone-200 px-5 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
        <div className="flex items-end justify-end">
            { status !== "Order should have arrived" && !priority && <UpdateOrderPriority order = {order}/>}
        </div>
      </div>
    </div>
  );
}

// Data Loading function from React-Router
export async function loader({params}){
  const order = await getOrder(params.orderId)
  return order
}
export default Order;
