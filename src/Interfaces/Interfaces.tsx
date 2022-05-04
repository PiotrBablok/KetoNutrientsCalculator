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
    proteinPerHundr: number;
    fatPerHundr: number;
    carbsPerHundr: number;
    id: string;
    createdAt: { seconds: string };
}

export interface ContextProviderChildren {
    children?: React.ReactNode;
}