import { Link } from "react-router-dom";
import { Test } from "./LayoutNav.styles";
import { ReactNode } from "react";

type UserProviderProps = {
    children: ReactNode;
};

const LayoutNav = ({ children }: UserProviderProps) => {
    return (
        <div>
            <Test>
                <nav>
                    <ul>
                        <li>
                            <Link to="/threads">Threads</Link>
                        </li>
                        <li>
                            <Link to="create-thread">Create Thread</Link>
                        </li>
                    </ul>
                </nav>
            </Test>
            <main>{children}</main>
        </div>
    );
};

export default LayoutNav;
