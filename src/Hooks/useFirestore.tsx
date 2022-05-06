/* Fireastore Config */
import firebase from 'firebase/compat/app';
import { useEffect, useState } from 'react';
import { projectFirestore } from "../DataBase/config"
import { timeStamp } from "../DataBase/config";

/* Interfaces */
import { FoodNutries } from "../Interfaces/Interfaces";

/* Hooks */
import { useAuthContext } from "./useAuthContext";

export const useFirestore = () => {

    /* Hooks */
    const { user } = useAuthContext();

    /* State */
    const [isCancelled, setIsCancelled] = useState(false);

    const ref = projectFirestore.collection(user.uid)

    async function addDoc(doc: Partial<FoodNutries>, newFood: boolean) {
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
            const createdAt = timeStamp.fromDate(new Date());
            await ref.doc('consumedFood').set({
                [`${createdAt.seconds}`]: {
                    ...doc, createdAt
                }
            }, { merge: true });
        }
    }

    function delDoc(id: string, docName: string) {
        try {
            ref.doc(docName).set({ [`${id}`]: firebase.firestore.FieldValue.delete() }
                , { merge: true })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);


    return { addDoc, delDoc }
}