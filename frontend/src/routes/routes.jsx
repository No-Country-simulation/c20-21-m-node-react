import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Detail } from "../pages/Detail/Detail";
import HomeLayout from '../layouts/HomeLayout';
import Error404 from '../pages/Error/Error404';
import { LandingPage } from '../pages/Landing/Landing';
import CreateProduct from '../pages/Product/CreateProduct';
import { Chat } from '../pages/Chat/Chat'; // Importar el componente Chat

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
                
                <Route path="/chat/:sellerId" element={<Chat />} />
                
                <Route path="*" element={<Error404 />} />
                <Route path='' element={<LandingPage />} />
                <Route path="/product">
                    <Route path='create' element={<CreateProduct />} />
                </Route>
            </Routes>
        </>
    );
};

export default MyRoutes;
