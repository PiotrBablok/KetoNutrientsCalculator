import { constants } from 'buffer';
import firebase from 'firebase/compat/app';
import { useEffect, useRef, useState } from "react";

/* Fireastore Config */
import { projectFirestore } from "../DataBase/config"

export const useCollection = (collectionId: string) => {

    /* State */
    const [foodList, setFoodList] = useState<any>([]);

    function destructuredocs(docs: any) {
        const destructuredDocs: any = [];

        docs.forEach((doc: any) => {
            for (const key in doc) {
                destructuredDocs.push(doc[key]);
            }
        })

        return destructuredDocs;
    }


    useEffect(() => {
        /* Collection ref */
        let ref: any = projectFirestore.collection(collectionId)
        /* .orderBy('createdAt', 'desc'); */

        /* Get expenses by collection name */
        ref = ref.where(firebase.firestore.FieldPath.documentId(), 'in', ['consumedFood']);


        const unsub = ref.onSnapshot((snapshot: any) => {
            const docs = snapshot.docs.map((doc: any) => ({
                ...doc.data(),
            }));

            setFoodList(destructuredocs(docs));
        });

        return () => unsub();
    }, [collectionId]);

    return { foodList };
}
