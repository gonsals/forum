import { addDoc, collection, db, getDocs, query, where } from "./firebase";

const collectionName = "userThreads";

export const access = async (name: string): Promise<string> => {
    if (!name) {
        throw new Error("name must be something");
    }
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where("name", "==", name)));

    if (result.empty) {
        const docRef = await addDoc(colRef, { name });
        return docRef.id;
    } else {
        return result.docs[0].id;
    }
};
