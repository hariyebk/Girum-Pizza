import { useFetcher} from "react-router-dom"
import {useState} from "react"
import Button from "../../components/Button"
import { updateOrder } from "../../services/apiRestaurant"

function UpdateOrderPriority({order}) {
    const fetcher = useFetcher()
    const [clicked, setClicked] = useState(false) 
    return (
        <fetcher.Form method="PATCH" onSubmit={() => setClicked(true)}>
            <Button type= "primary">
                {clicked ? "updating...": "Make priority"}
            </Button>
        </fetcher.Form>
    )
}

export async function action({request, params}){
    const {orderId} = params
    await updateOrder(orderId, {priority: true})

    return null
}
export default UpdateOrderPriority