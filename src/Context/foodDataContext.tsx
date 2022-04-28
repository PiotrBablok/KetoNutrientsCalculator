import { createContext, useReducer } from 'react';


/* Interfaces */
import { ContextProviderChildren } from '../Interfaces/Interfaces';
import { InitialStateType } from '../Interfaces/Interfaces';
import { ActionType } from '../Interfaces/Interfaces';

export const FoodDataContext = createContext<any>(null);

const foodDataReducer = (state: InitialStateType, action: ActionType) => {
    switch (action.type) {
        case 'SET_MULTIPLE':
            return { ...state, foodData: [...state.foodData, ...action.payload] };
        default:
            return state;
    }
}

const initialState: InitialStateType = {
    foodData: []
}

export const FoodDataContextProvider: React.FC<ContextProviderChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(foodDataReducer, initialState);

    return (
        <FoodDataContext.Provider value={{ ...state, dispatch }} >
            {children}
        </FoodDataContext.Provider >
    )
}