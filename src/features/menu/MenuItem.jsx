import { formatCurrency } from "../../utilities/helpers";
import Button from "../../components/Button"
import {useDispatch, useSelector} from "react-redux"
import {addItem, deleteItem, getPizzaCart, getPizzaQuantity} from "../cart/cartSlice"
import UpdateItemQuantity from "../cart/UpdateItemQuantity";


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const pizzaInTheCart = useSelector(getPizzaCart(id))
  const currentQuantity = useSelector(getPizzaQuantity(id))

  function handleAddToCart(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      ingredients,
      unitPrice,
      totalprice: unitPrice * 1,
      soldOut,
      imageUrl
    }
    dispatch(addItem(newItem))
  }

  function handleDelete (){
    dispatch(deleteItem(id))
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className= {`${soldOut ? "opacity-70 grayscale" : ""} h-24`} />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-stone-500 text-sm italic capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice * 15)}</p> : <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>}
          {soldOut ? null :  pizzaInTheCart?.pizzaId === id ? <div className="flex items-center gap-10">
              <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <Button type = "small" onClick={handleDelete}> Delete </Button>
              </div>
              : <Button type = "small" onClick={handleAddToCart}> Add to Cart </Button> }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
