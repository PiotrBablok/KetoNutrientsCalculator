/* Interface */
import { FoodNutries } from '../../Interfaces/Interfaces';

/* CSS */
import './FoodList.css'

/* Hooks */
import { useCollection } from '../../Hooks/useCollection';
import { useFirestore } from '../../Hooks/useFirestore';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { NutritionalCalc } from '../../Hooks/useNutritionalCalc';

function FoodList() {
    /* Hooks */
    const { calcNutriFood } = NutritionalCalc();
    const { user } = useAuthContext();
    const { foodList } = useCollection(user.uid);
    const { delDoc } = useFirestore();

    return (
        <div className='foodList'>
            <h1>Added Food</h1>
            <ul>
                {foodList.map((food: any) => {
                    return (
                        <li key={food.createdAt.seconds}>
                            <p>Food: {food.foodName}</p>
                            <p>In the <b>{food.consumedFoodWeight}g</b> of <b>{food.foodName}</b> you ate, you will find:</p>
                            <p>Protein: {calcNutriFood(food.proteinConsumed, food.consumedFoodWeight)}</p>
                            <p>Fat: {calcNutriFood(food.fatConsumed, food.consumedFoodWeight)}</p>
                            <p>Carbohydrates: {calcNutriFood(food.carbsConsumed, food.consumedFoodWeight)}</p>
                            <button onClick={() => delDoc(food.createdAt.seconds)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FoodList