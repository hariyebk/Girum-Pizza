import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { getTotalQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";
function CartOverview() {
  const totalquantity = useSelector(getTotalQuantity)
  const totalprice = useSelector(getTotalPrice)
  if(totalquantity > 0)
      return (
        <div className="bg-stone-800 text-stone-200 uppercase px-4 py-4 text-sm sm:px-6 md:text-base flex items-center justify-between">
          <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
            <span>{totalquantity} pizzas</span>
            <span>{formatCurrency(totalprice)}</span>
          </p>
          <Link to = "/cart">Open cart &rarr; </Link>
        </div>
      );
    }

export default CartOverview;
