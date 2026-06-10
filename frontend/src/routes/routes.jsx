import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Detail } from "../pages/Detail/Detail";
import HomeLayout from '../layouts/HomeLayout';
import Error404 from '../pages/Error/Error404';
import { LandingPage } from '../pages/Landing/Landing';
import CreateProduct from '../pages/Product/CreateProduct';
import { Chat } from '../pages/Chat/Chat';
import Register from "../pages/Register/Register";
import Cart from "../pages/Cart/Cart";
import { Post } from "../pages/Post/Post";
import EditPost from "../pages/EditPost/EdithPost";

const MyRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path=":id" element={<Detail />} />
                </Route>
                
                <Route path="/chat/:chatId" element={<Chat />} />
                
                <Route path="*" element={<Error404 />} />
                <Route path="" element={<LandingPage />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/product">
                    <Route path='create' element={<CreateProduct />} />
                </Route>
                <Route path="/post" element={<Post/>}/>
                <Route path="/edit">
                    <Route path=':id' element={<EditPost/>} />
                </Route>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </>
    );
};

export default MyRoutes;
