//import { Test } from './Thread.styles';

import { useContext, useEffect, useState } from "react";
import { createComment, getComments } from "../../app/services/threads";
import { CommentType } from "../../common/CommentType";
import { UserContext } from "../../app/providers/UserProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

const Thread = () => {
    const [comments, setComments] = useState<CommentType[]>();
    const [newComment, setNewComment] = useState("");
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (!user || user.userName.length <= 1) {
            navigate("/");
        }
        id && getComments(id).then((data) => setComments(data));
    }, [id, user, navigate]);

    const handleSumbit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            user.id &&
                id &&
                (await createComment(id, user.id, newComment).then((data) =>
                    setComments(data)
                ));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="ThreadWrapper">
            <button>
                <Link to={"/threads"}>🧵's</Link>
            </button>
            <h1>Comments</h1>
            {comments &&
                comments.map((comment) => (
                    <p key={comment.id}>{comment.comment}</p>
                ))}
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">SEND</button>
            </form>
        </div>
    );
};

export default Thread;
