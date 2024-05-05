import { useEffect, useContext, useState } from "react";
import { getThreads } from "../../app/services/threads";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../app/providers/UserProvider";
import { ThreadType } from "../../common/ThreadType";

const Threads = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [threads, setThreads] = useState<ThreadType[]>();

    useEffect(() => {
        const getData = async () => {
            await getThreads().then((data) => setThreads(data));
        };
        if (!user || user.userName.length <= 1) {
            navigate("/");
        }
        try {
            getData();
        } catch (error) {
            console.error(error);
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Threads</h1>
            <ul>
                {threads &&
                    threads.map(
                        (thread) =>
                            thread.id && (
                                <li key={thread.threadName}>
                                    <Link
                                        to={`/thread/${encodeURIComponent(
                                            thread.id
                                        )}`}
                                    >
                                        {thread.threadName}
                                    </Link>
                                </li>
                            )
                    )}
            </ul>
        </div>
    );
};

export default Threads;
