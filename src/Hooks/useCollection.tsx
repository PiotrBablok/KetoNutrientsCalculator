import { useEffect, useState } from "react";

/* Fireastore Config */
import { projectFirestore } from "../DataBase/config"

export const useCollection = (collectionId: string) => {

    /* State */
    const [foodList, setFoodList] = useState<any>([]);

    useEffect(() => {
        /* Collection ref */
        let ref = projectFirestore.collection(collectionId);
        ref.orderBy('createdAt', 'desc');

        const unsub = ref.onSnapshot(snapshot => {
            const docs = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setFoodList(docs);
        });

        return () => unsub();
    }, [collectionId]);

    return { foodList };
}
