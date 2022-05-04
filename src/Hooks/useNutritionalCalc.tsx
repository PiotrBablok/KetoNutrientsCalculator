export const NutritionalCalc = () => {
    function calcNutriFood(nutriPerHundret: number, wholeProductWeight: number, productWeightHundret: number = 100,) {

        const num = (wholeProductWeight * nutriPerHundret) / productWeightHundret;

        return Number(((num * 100) / 100).toFixed(2));
    }

    return { calcNutriFood }
}

