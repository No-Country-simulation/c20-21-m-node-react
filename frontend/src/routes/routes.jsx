import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Detail } from "../pages/Detail/Detail";
import Error404 from '../pages/Error/Error404';

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Detail />} />
            <Route path="/*" element={<Error404/>}/>
        </Routes>
    );
};

export default MyRoutes;
