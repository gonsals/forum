//import { Test } from './Login.styles';
import { useContext, useState } from "react";
import { UserContext } from "../../app/providers/UserProvider";
import { access } from "../../app/services/users";
import { UserType } from "../../common/UserType";
import { useNavigate } from "react-router-dom";
import { Container } from "./Login.styles";
import GoogleSignInButton from "../../components/GoogleSignInButton/GoogleSignInButton";
import { loginWithGoogle } from "../../app/services/googleLogIn";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [userInput, setUserInput] = useState<UserType>({
        userName: "",
        email: "",
    });
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

    const handleSubmitGoogle = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        try {
            const data = await loginWithGoogle();
            setUser({
                id: data.uid,
                email: data.email || "",
                displayName: data.displayName || "",
            });
            console.log("Logged in with Google successfully!");
        } catch (error) {
            console.error("Error signing in with Google:", error);
            if (error instanceof Error) {
                console.error({ message: error.message });
            }
        }
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
                <input
                    type="text"
                    placeholder="Email"
                    value={userInput?.userName}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
            </form>
            <GoogleSignInButton onClick={handleSubmitGoogle} />
        </Container>
    );
};

export default Login;
