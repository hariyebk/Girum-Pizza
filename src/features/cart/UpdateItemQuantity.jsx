import Button from "../../components/Button"
import { useDispatch } from "react-redux"
import {IncreaseItem, DecreaseItem} from "../cart/cartSlice"

function UpdateItemQuantity({pizzaId, currentQuantity}) {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-2 md:gap-3">
            <Button type = "round" onClick={() => dispatch(DecreaseItem(pizzaId))}>-</Button>
            <p className="text-sm font-medium ">{currentQuantity}</p>
            <Button type = "round" onClick={() => dispatch(IncreaseItem(pizzaId))}>+</Button>
        </div>
    )
}

export default UpdateItemQuantity