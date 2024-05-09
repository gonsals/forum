import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";

export type User = {
    id?: string;
    userName: string;
    email: string;
    displayName?: string;
};

export interface UserContextInterface {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const defaultState: UserContextInterface = {
    user: {
        userName: "",
        email: "",
    },
    setUser: () => {},
};

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>({ userName: "", email: "" });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
