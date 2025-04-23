import React, {FC} from 'react';
import Header from "../header/Header";
import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer";

const MainLayout: FC = () => {

    return (
        <div>
            <Header/>
          <h1>test</h1>
            <Outlet/>
            <hr/>
            <Footer/>
        </div>
    );
};

export default MainLayout;