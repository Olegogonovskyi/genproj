import React, {FC} from 'react';
import Header from "../header/Header";
import {Outlet} from "react-router-dom";
import style from './MainLayout.module.css'

const MainLayout: FC = () => {

    return (
        <div>
            <div className={style.mainContainer}>
              <Header/>
              <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;