import { useDispatch } from 'react-redux'
import Button from '../../UI/Button'
import { decreaseQuantity, increaseQunatity } from './cartSlice'
function UpdateItemQuantity({ pizzaId, getQuantity }) {
    const dispatch = useDispatch()
    return (
        <div className="flex items-center gap-3">
            <Button
                type="third"
                onClick={() => dispatch(increaseQunatity(pizzaId))}
            >
                +
            </Button>
            <span className="text-sm font-medium">{getQuantity}</span>
            <Button
                type="third"
                onClick={() => dispatch(decreaseQuantity(pizzaId))}
            >
                -
            </Button>
        </div>
    )
}

export default UpdateItemQuantity
