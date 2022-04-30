/* Fireastore Config */
import { projectFirestore } from "../DataBase/config"
import { timeStamp } from "../DataBase/config";

/* Interfaces */
import { FoodNutries } from "../Interfaces/Interfaces";

/* Hooks */
import { useAuthContext } from "./useAuthContext";

export const useFirestore = () => {

    const { user } = useAuthContext();

    async function addDoc(doc: FoodNutries) {
        try {
            const createdAt = timeStamp.fromDate(new Date());
            await projectFirestore.collection(user.uid).add({ ...doc, createdAt });
        } catch (error) {
            console.log(error)
        }
    }

    function delDoc(id: string | undefined) {
        try {
            projectFirestore.collection(user.uid).doc(id).delete();
        } catch (error) {
            console.log(error)
        }
    }

    return { addDoc, delDoc }
}