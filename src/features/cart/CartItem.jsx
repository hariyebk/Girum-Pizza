import {formatCurrency} from "../../utilities/helpers"
import Button from "../../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getPizzaQuantity } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalprice } = item;
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getPizzaQuantity(pizzaId))

  return (
    <li className="py-3 lg:flex lg:items-center lg:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between lg:gap-6">
        <p className="text-sm font-bold">{formatCurrency( totalprice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}/>
        <Button type= "small" onClick={() => dispatch(deleteItem(pizzaId))}> Delete </Button>
      </div>
    </li>
  );
}

export default CartItem;
