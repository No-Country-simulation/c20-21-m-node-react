import React from 'react';
import {Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home/Home";

const MyRoutes = ()=>{
    return(
        <Routes>
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default MyRoutes;