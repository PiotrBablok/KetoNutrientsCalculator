/* Fireastore Config */
import firebase from 'firebase/compat/app';
import { projectFirestore } from "../DataBase/config"
import { timeStamp } from "../DataBase/config";

/* Interfaces */
import { FoodNutries } from "../Interfaces/Interfaces";

/* Hooks */
import { useAuthContext } from "./useAuthContext";

export const useFirestore = () => {

    const { user } = useAuthContext();

    const ref = projectFirestore.collection(user.uid)

    async function addDoc(doc: FoodNutries, newFood: boolean) {
        if (newFood) {
            try {
                const createdAt = timeStamp.fromDate(new Date());
                await ref.doc('consumedFood').set({
                    [`${createdAt.seconds}`]: {
                        ...doc, createdAt
                    }
                }, { merge: true });

                let { consumedFoodWeight, ...newDoc } = doc;

                await ref.doc('foodHistory').set({
                    [`${createdAt.seconds}`]: {
                        ...newDoc, createdAt
                    }
                }, { merge: true });
            } catch (error) {
                console.log(error)
            }
        }

        if (!newFood) {
            try {
                const createdAt = timeStamp.fromDate(new Date());
                await projectFirestore.collection(user.uid).add({ ...doc, createdAt });
            } catch (error) {
                console.log(error)
            }
        }
    }

    function delDoc(id: string | undefined) {
        try {
            ref.doc('consumedFood').set({ [`${id}`]: firebase.firestore.FieldValue.delete() }
                , { merge: true })
        } catch (error) {
            console.log(error)
        }
    }

    return { addDoc, delDoc }
}