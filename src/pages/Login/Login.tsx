//import { Test } from './Login.styles';
import { useContext, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { access } from "../../app/services/users";
import { UserType } from "../../common/UserType";
import { useNavigate } from "react-router-dom";
import { Container } from "./Login.styles";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState<UserType>({ userName: "" });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            userInput &&
                (await access(userInput.userName).then((data) => {
                    setUser({
                        id: data,
                        userName: userInput.userName,
                    });
                    navigate("/threads");
                }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({ ...userInput, userName: e.target.value });
    };

    return (
        <Container>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={userInput?.userName}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
            </form>
        </Container>
    );
};

export default Login;
