/* React */
import { useEffect, useRef, useState } from 'react';

/* Interface */
import { FoodNutries } from '../../Interfaces/Interfaces';

/* CSS */
import './FoodHistory.css'

/* Hooks */
import { useCollection } from '../../Hooks/useCollection';
import { useFirestore } from '../../Hooks/useFirestore';
import { useAuthContext } from '../../Hooks/useAuthContext';


function FoodHistory() {
    /* Hooks */
    const { user } = useAuthContext();
    const { foodList } = useCollection(user.uid, 'foodHistory');
    const { delDoc, addDoc } = useFirestore();

    /* State */
    const [modalOnOff, setModalOnOff] = useState(false);
    const [reAddFood, setReAddFood] = useState<any>({});
    const [foodWeight, setFoodWeight] = useState(0);

    /* Refs */
    const modalRef = useRef<any>(null);

    function openAddModal(reAddFood: FoodNutries) {
        setReAddFood(reAddFood);
        setModalOnOff(true);
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (modalRef.current !== null) {
                if (!modalRef.current!.contains(e.target)) {
                    setModalOnOff(false);
                    setReAddFood({});
                    setFoodWeight(0);
                }
            }
        })
    }, [])


    function addFoodAgain() {
        addDoc({
            ...reAddFood,
            consumedFoodWeight: foodWeight,
        }, false);

        setFoodWeight(0);
        setModalOnOff(false);
    }

    return (
        <>
            <div className='foodHistory'>
                <h1>Food History</h1>
                <ul>
                    {foodList.map((food: FoodNutries) => {
                        return (
                            <li key={food.createdAt.seconds}>
                                <p>Food: {food.foodName}</p>
                                <p>Protein: {food.proteinPerHundr}</p>
                                <p>Fat: {food.fatPerHundr}</p>
                                <p>Carbohydrates: {food.carbsPerHundr}</p>
                                <button onClick={() => openAddModal(food)}>Add</button>
                                <button onClick={() => delDoc(food.createdAt.seconds, 'foodHistory')}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {modalOnOff &&
                <div ref={modalRef} className='addModal'>
                    <form className='addModalForm'>
                        <label>{reAddFood?.foodName}</label>
                        <label>Amount of food consumed (g)</label>
                        <input type="number" onChange={(e) => { setFoodWeight(Number(e.target.value)) }} value={`${foodWeight}`} />
                        <button onClick={addFoodAgain}>Add</button>
                    </form>
                </div>
            }
        </>

    )
}

export default FoodHistory;