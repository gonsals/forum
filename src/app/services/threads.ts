import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ThreadType } from "../../common/ThreadType";
import { CommentType } from "../../common/CommentType";

const collectionName = "threads";

export const createThread = async (
    userId: string,
    threadObj: ThreadType
): Promise<string> => {
    try {
        if (!threadObj.threadName && !threadObj.userId) {
            throw new Error("The thread is empty");
        }
        const colRef = collection(db, collectionName);

        const threads = await getThreads();

        if (
            threadObj.threadName &&
            threads.some(
                (existingThread) =>
                    existingThread.threadName === threadObj.threadName
            )
        ) {
            throw new Error("Thread already exist");
        }

        const docRef = await addDoc(colRef, { ...threadObj, userId: userId });
        return docRef.id;
    } catch (error) {
        console.error("Error creating thread:", error);
        throw error;
    }
};

export const getThreads = async (): Promise<ThreadType[]> => {
    try {
        const colRef = collection(db, collectionName);
        const querySnapshot = await getDocs(colRef);
        return querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as ThreadType;
        });
    } catch (error) {
        console.error("Error al obtener los pacientes:", error);
        throw error;
    }
};

export const createComment = async (
    threadId: string,
    userId: string,
    comment: string
): Promise<CommentType[]> => {
    try {
        if (!comment) {
            throw new Error("The comment is empty");
        }
        const colRef = collection(db, collectionName, threadId, "comments");

        await addDoc(colRef, { userId, comment });
        const newComments = await getComments(threadId);
        return newComments;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

export const getComments = async (threadId: string): Promise<CommentType[]> => {
    try {
        const colRef = collection(db, collectionName, threadId, "comments");
        const querySnapshot = await getDocs(colRef);
        return querySnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id } as CommentType;
        });
    } catch (error) {
        console.error("Error obtaining comments:", error);
        throw error;
    }
};
