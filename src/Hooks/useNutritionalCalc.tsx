export const NutritionalCalc = () => {
    function calcNutriFood(nutriPerHundret: number, wholeProductWeight: number, productWeightHundret: number = 100,) {

        const num = (wholeProductWeight * nutriPerHundret) / productWeightHundret;

        return Math.round(num * 100) / 100;
    }

    return { calcNutriFood }
}

