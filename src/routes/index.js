import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
// import Login from "../screens/login/login";
// import Singup from "../screens/singup/singup";

// const Private = ({ Item }) => {
//     const signed = false;
//     return signed ? <Item /> : <Login />;
// };

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route index element={<Home />} />

                </Route>
            </Routes>
        </BrowserRouter>

    );
};

export default RouterApp;


