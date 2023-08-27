import LinkButton from '../../components/LinkButton';
import Button from '../../components/Button';
import CartItem from "../cart/CartItem"
import EmptyCart from "./EmptyCart"
import {useSelector, useDispatch} from "react-redux"
import { getCart , clearCart } from './cartSlice';
import { getUsername } from '../user/userSlice';


function Cart() {
  const cart  = useSelector(getCart)
  const userName = useSelector(getUsername)
  const dispatch = useDispatch()

  if(cart.length === 0) return <EmptyCart/>

  return (
    <div className='py-4'>
      <LinkButton to="/menu">
        &larr; Back to menu
      </LinkButton>

      <h2 className='mt-10 text-xl font-semibold'> Your cart{userName ? `, ${userName.toUpperCase()}` : null} </h2>
      <ul className='divide-y devide-stone-200 border-b mt-10'>
          {cart.map((item, i) => <CartItem item = {item} key= {i}/>)}
      </ul>
      <div className='mt-6 space-x-7'>
      <Button type = "primary" to = "/order/new"> Order Pizzas </Button>

        <Button type = "secondary" onClick={() =>  dispatch(clearCart())} > Clear cart </Button>
      </div>
    </div>
  );
}

export default Cart;
