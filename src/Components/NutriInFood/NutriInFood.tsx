import React, { useState } from 'react'

/* Custom Hooks */
import { NutritionalCalc } from '../../Hooks/useNutritionalCalc';
import { useFirestore } from '../../Hooks/useFirestore';

/* CSS */
import './NutriInFood.css';

const NutriInFood: React.FC = () => {

    /* Custom Hooks */
    const { calcNutriFood } = NutritionalCalc();
    const { addDoc } = useFirestore();

    /* State */
    const [foodName, setFoodName] = useState('')
    const [foodWeight, setFoodWeight] = useState(0);
    const [carbPerHundr, setCarbPerHundr] = useState(0)
    const [fatPerHundr, setFatPerHundr] = useState(0);
    const [proteinPerHundr, setProteinPerHundr] = useState(0)

    function addNutriHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (foodWeight + carbPerHundr + fatPerHundr + proteinPerHundr !== 0 && foodName !== '') {
            addDoc({
                foodName,
                consumedFoodWeight: foodWeight,
                proteinConsumed: calcNutriFood(proteinPerHundr, foodWeight),
                fatConsumed: calcNutriFood(fatPerHundr, foodWeight),
                carbsConsumed: calcNutriFood(carbPerHundr, foodWeight),
            })
        }

        setFoodName('');
        setFoodWeight(0);
        setCarbPerHundr(0);
        setFatPerHundr(0);
        setProteinPerHundr(0);
    }

    return (
        <div className='nutriCalc'>
            <form className='nutriCalcForm'>
                <label>Food Name</label>
                <input onChange={(e) => { setFoodName(e.target.value) }} value={foodName} />
                <label>Amount of food consumed (g)</label>
                <input  type="number" onChange={(e) => { setFoodWeight(Number(e.target.value)) }} value={`${foodWeight}`}/>
                <label>Protein per 100g of food (g)</label>
                <input type="number" onChange={(e) => { setProteinPerHundr(Number(e.target.value)) }} value={proteinPerHundr} />
                <label>Fat per 100g of food (g)</label>
                <input type="number" onChange={(e) => { setFatPerHundr(Number(e.target.value)) }} value={fatPerHundr} />
                <label>Carbs per 100g of food (g)</label>
                <input type="number" onChange={(e) => { setCarbPerHundr(Number(e.target.value)) }} value={carbPerHundr} />
                <button onClick={addNutriHandler}>Add</button>
            </form>
        </div>
    )
}

export default NutriInFood;