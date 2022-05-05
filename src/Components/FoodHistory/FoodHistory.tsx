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

/* Components */
import ReaddModal from './ReaddModal/ReaddModal';


function FoodHistory() {
    /* Hooks */
    const { user } = useAuthContext();
    const { foodList } = useCollection(user.uid, 'foodHistory');
    const { delDoc } = useFirestore();

    /* State */
    const [findFood, setFindFood] = useState('')
    const [modalOnOff, setModalOnOff] = useState(false);
    const [reAddFood, setReAddFood] = useState<Partial<FoodNutries>>({});

    /* Open Readd Modal */
    function openAddModalHanlder(reAddFood: FoodNutries | {}, openClose: boolean) {
        setReAddFood(reAddFood);
        setModalOnOff(openClose);
    }

    return (
        <>
            <div className='foodHistory'>
                <h1>Food History</h1>
                <form className='searchBarForm'>
                    <input type="text" placeholder='Search food' onChange={(e) => setFindFood(e.target.value)} value={findFood} />
                </form>
                <ul>
                    {foodList.map((food: FoodNutries) => {
                        if (food.foodName.toLowerCase().includes(findFood.toLowerCase())) {
                            return (
                                <li key={food.createdAt.seconds}>
                                    <p>Food: {food.foodName}</p>
                                    <p>Protein: {food.proteinPerHundr}</p>
                                    <p>Fat: {food.fatPerHundr}</p>
                                    <p>Carbohydrates: {food.carbsPerHundr}</p>
                                    <button onClick={() => openAddModalHanlder(food, true)}>Add</button>
                                    <button onClick={() => delDoc(food.createdAt.seconds, 'foodHistory')}>Delete</button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            <ReaddModal oponCloseModal={modalOnOff} modalHandlerFunc={openAddModalHanlder} addAgain={reAddFood} />
        </>
    )
}

export default FoodHistory;