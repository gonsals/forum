import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutNav from "../Layout/LayoutNav/index";
import Login from "../../pages/Login";
import Threads from "../../pages/Threads";
import CreateThread from "../../pages/CreateThread";
import Thread from "../../pages/Thread/Thread";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/threads/*"
                element={
                    <LayoutNav>
                        <Routes>
                            <Route path="/" element={<Threads />} />
                            <Route
                                path="/create-thread"
                                element={<CreateThread />}
                            />
                        </Routes>
                    </LayoutNav>
                }
            />
            <Route path="/thread/:id" element={<Thread />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </BrowserRouter>
);

export default Router;
