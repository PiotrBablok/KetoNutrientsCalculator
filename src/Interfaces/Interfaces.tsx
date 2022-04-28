export interface InitialStateType {
    foodData: FoodNutries[];
}

export interface ActionType {
    type: string;
    payload: FoodNutries[];
}

export interface FoodNutries {
    foodName: string;
    consumedFoodWeight: number;
    proteinConsumed: number;
    fatConsumed: number;
    carbsConsumed: number;
    id?: string;
}

export interface ContextProviderChildren {
    children?: React.ReactNode;
}