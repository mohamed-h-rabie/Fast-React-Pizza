import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getnumOfPizzas, gettotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
const numOfPizzas =useSelector(getnumOfPizzas)
const totalPrice =useSelector(gettotalPrice)
if(!numOfPizzas) return null

  return (
    <div className='bg-stone-800 text-stone-200 text-sm uppercase px-4 py-4 sm:px-6 flex justify-between items-center md:text-base'>
      <p className="text-stone-300  font-semibold space-x-4 sm:space-x-6">
        <span>{numOfPizzas} pizzas</span>
        <span>{formatCurrency(totalPrice) }</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
