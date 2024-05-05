import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { ThreadType } from "../../common/ThreadType";
import { createThread } from "../../app/services/threads";
import { Container } from "./CreateThread.styles";
import { useNavigate } from "react-router-dom";

const CreateThreads = () => {
    const { user } = useContext(UserContext);
    const [newThread, setNewThread] = useState<ThreadType>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.userName.length <= 1) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (user.id && newThread) {
                await createThread(user.id, newThread);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h1>Hi {user.userName}</h1>
            <p>Create new thread</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) =>
                        user.id &&
                        setNewThread({
                            ...newThread,
                            userId: user.id,
                            threadName: e.target.value,
                        })
                    }
                />
                <button type="submit">CREATE</button>
            </form>
        </Container>
    );
};

export default CreateThreads;
