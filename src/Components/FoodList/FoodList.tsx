/* Interface */
import { FoodNutries } from '../../Interfaces/Interfaces';

/* CSS */
import './FoodList.css'

/* Hooks */
import { useCollection } from '../../Hooks/useCollection';
import { useFirestore } from '../../Hooks/useFirestore';
import { useAuthContext } from '../../Hooks/useAuthContext';

function FoodList() {
    /* Hooks */
    const { user } = useAuthContext();
    const { foodList } = useCollection(user.uid);
    const { delDoc } = useFirestore();

    return (
        <div className='foodList'>
            <h1>Added Food</h1>
            <ul>
                {foodList.map((food: FoodNutries) => {
                    return (
                        <li key={food.id}>
                            <p>Food: {food.foodName}</p>
                            <p>In the <b>{food.consumedFoodWeight}g</b> of <b>{food.foodName}</b> you ate, you will find:</p>
                            <p>Protein: {food.proteinConsumed}</p>
                            <p>Fat: {food.fatConsumed}</p>
                            <p>Carbohydrates: {food.carbsConsumed}</p>
                            <button onClick={() => delDoc(food.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FoodList