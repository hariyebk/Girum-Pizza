import {formatCurrency} from "../../utilities/helpers"
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4">
      <div className="flex items-center justify-between gap-4 text-sm ">
        <p className="font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice * 15)}</p>
      </div>
      <p className="text-sm italic capitalize text-stone-500 py-3">{isLoadingIngredients ? "loading ..." : ingredients.join(", ")}</p>
    </li>
  );
}

export default OrderItem;
