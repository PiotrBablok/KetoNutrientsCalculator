import React, { useEffect, useState } from 'react'

/* CSS */
import './Chart.css';

/* Hooks */
import { useCollection } from '../../Hooks/useCollection';

/* Interface */
import { FoodNutries } from '../../Interfaces/Interfaces';

function Chart() {

    /* Hooks */
    const { foodList } = useCollection('foodData');

    /* State */
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbo, setCarbo] = useState(0);

    console.log(foodList)

    useEffect(() => {
        const sumedNutries = {
            protein: 0,
            fat: 0,
            carbo: 0
        }

        foodList.forEach((food: FoodNutries) => {
            sumedNutries.carbo += food.carbsConsumed;
            sumedNutries.fat += food.fatConsumed;
            sumedNutries.protein += food.proteinConsumed;
        })

        const totalNutrients = sumedNutries.protein + sumedNutries.fat + sumedNutries.carbo;

        setProtein(Math.round(sumedNutries.protein / (totalNutrients) * 100))
        setFat(Math.round(sumedNutries.fat / (totalNutrients) * 100))
        setCarbo(Math.round(sumedNutries.carbo / (totalNutrients) * 100))

        if(foodList.length === 0) {
            setProtein(0)
            setFat(0)
            setCarbo(0)
        }
    }, [foodList])

    return (
        <div className='chart'>
            <div className='protein nutritionalValues' style={{ width: `${protein}%` }} />
            <div className='fat nutritionalValues' style={{ width: `${fat}%` }} />
            <div className='carbo nutritionalValues' style={{ width: `${carbo}%` }} />
        </div>
    )
}

export default Chart