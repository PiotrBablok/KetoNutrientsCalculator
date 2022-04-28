import { useContext } from 'react'
import { FoodDataContext } from '../Context/foodDataContext';

export function useFoodDataContext() {

    const context = useContext(FoodDataContext);

    if (!context) {
        throw new Error('useFoodDataContext must be used within FoodDataContextProvider');
    }

    return context;
}

