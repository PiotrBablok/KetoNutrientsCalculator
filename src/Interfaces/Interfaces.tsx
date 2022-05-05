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

export interface ReaddModalProps {
    oponCloseModal: boolean;
    modalHandlerFunc: (reAddFood: Partial<FoodNutries>, openClose: boolean) => void;
    addAgain: Partial<FoodNutries>;
}