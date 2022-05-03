import React, { useEffect, useState } from 'react'

/* CSS */
import './Chart.css';

/* Hooks */
import { useCollection } from '../../Hooks/useCollection';
import { useAuthContext } from '../../Hooks/useAuthContext';

/* Interface */
import { FoodNutries } from '../../Interfaces/Interfaces';

interface SumedNutrients {
    protein: number;
    fat: number;
    carbo: number;
}

function Chart() {

    const sumedNutriesTemp = {
        protein: 0,
        fat: 0,
        carbo: 0
    }

    /* Hooks */
    const { user } = useAuthContext();
    const { foodList } = useCollection(user.uid);

    /* State */
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbo, setCarbo] = useState(0);

    const [sumedNutrients, setSumedNutrients] = useState<SumedNutrients>(sumedNutriesTemp)

    useEffect(() => {

        foodList.forEach((food: FoodNutries) => {
            sumedNutriesTemp.carbo += food.carbsConsumed;
            sumedNutriesTemp.fat += food.fatConsumed;
            sumedNutriesTemp.protein += food.proteinConsumed;
        })

        const totalNutrients = sumedNutriesTemp.protein + sumedNutriesTemp.fat + sumedNutriesTemp.carbo;

        if (totalNutrients > 0) {
            setProtein(Number(((sumedNutriesTemp.protein / totalNutrients) * 100).toFixed(2)));
            setFat(Number(((sumedNutriesTemp.fat / totalNutrients) * 100).toFixed(2)));
            setCarbo(Number(((sumedNutriesTemp.carbo / totalNutrients) * 100).toFixed(2)));
        }

        /* Reset percentage split */
        if (foodList.length === 0) {
            setProtein(0)
            setFat(0)
            setCarbo(0)
        }

        setSumedNutrients(sumedNutriesTemp);
    }, [foodList])

    return (
        <div className='chart'>
            <div className='sumedNutrients'>
                <p className='sumedNutrientsVal'>Sum of:</p>
                <div className='nutrientsVal'>
                    <p className='sumedNutrientsVal  '><span style={{ 'color': '#E2C044' }}>Protein</span> - {sumedNutrients.protein.toFixed(2)}g</p>
                    <p className='sumedNutrientsVal '><span style={{ 'color': '#BFDBF7' }}>Fat</span> - {sumedNutrients.fat.toFixed(2)}g</p>
                    <p className='sumedNutrientsVal '><span style={{ 'color': '#EF959D' }}>Carbo</span> - {sumedNutrients.carbo.toFixed(2)}g</p>
                </div>
            </div>
            <div className='calories'>
                <p className='sumedNutrientsVal'>Sum of calories:</p>
                <p className='sumedNutrientsVal'>{(Number(sumedNutrients.fat.toFixed(2)) * 9) + (Number(sumedNutrients.protein.toFixed(2)) * 4) + (Number(sumedNutrients.carbo.toFixed(2)) * 4)} kCal</p>
            </div>
            <div className='percentageNutrients'>
                <p className='percentage'>Protein - {protein}%</p>
                <p className='percentage'>Fat - {fat}%</p>
                <p className='percentage'>Carbo - {carbo}%</p>
            </div>
            <div className='chartBar'>
                <p className='protein nutritionalValues' style={{ width: `${protein}%` }} />
                <p className='fat nutritionalValues' style={{ width: `${fat}%` }} />
                <p className='carbo nutritionalValues' style={{ width: `${carbo}%` }} />
            </div>
        </div>

    )
}

export default Chart