/* Fireastore Config */
import { projectFirestore } from "../DataBase/config"
import { timeStamp } from "../DataBase/config";

/* Interfaces */
import { FoodNutries } from "../Interfaces/Interfaces";

export const useFirestore = () => {
    async function addDoc(doc: FoodNutries) {
        try {
            const createdAt = timeStamp.fromDate(new Date());
            await projectFirestore.collection('foodData').add({ ...doc, createdAt });
        } catch (error) {
            console.log(error)
        }
    }

    function delDoc(id: string | undefined) {
        try {
            projectFirestore.collection('foodData').doc(id).delete();
        } catch (error) {
            console.log(error)
        }
    }

    return { addDoc, delDoc }
}