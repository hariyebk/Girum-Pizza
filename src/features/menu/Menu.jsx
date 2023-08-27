import {getMenu} from "../../services/apiRestaurant"
import {useLoaderData} from "react-router-dom"
import MenuItem from "./MenuItem"
function Menu() {
  const menu = useLoaderData()
  // console.log(menu)
  return <ul  className="mt-8 divide-y divide-stone-200 px-4">
      {
        menu.map(pizza => <MenuItem pizza = {pizza} key = {pizza.id}/>)
      }
  </ul>
}
// Data Loading function provided by react router version 6 and above that will be called when the menu component is rendered (render as you fetch not fetch after render)
export async function loader(){
  const menu = await getMenu()
  return menu
}
export default Menu;
