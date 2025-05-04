import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../pages/mainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { ancestors, articleUrls, authUrls } from '../costants/Urls';
import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
import GoogleCallback from '../components/googleCallbackComponent/GoogleCallback';
import LogOutComponent from '../components/logoutComponent/LogOutComponent';
import ArticlesPage from '../pages/articlesPage/articlesPage';
import AllAncestorsHocPage from '../pages/allAncestorsHocPage/AllAncestorsHocPage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import LoginPage from '../pages/loginPage/LoginPage';
import AllArticlesHocPage from '../pages/AllArticlesHocPage/AllArticlesHocPage';


export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [

            {
                path: authUrls.googleLogin, element: <AuthGoogleLogComponent/>
            },
            {
                path: authUrls.register, element: <RegisterPage/>
            },
            {
                path: authUrls.login, element: <LoginPage/>
            },
            {
                path: authUrls.googleCallback, element: <GoogleCallback/>
            },
            {
                path: authUrls.logout, element: <LogOutComponent/>
            },
            {
                path: articleUrls.getAllArticles, element: <AllArticlesHocPage/>
            },
            {
                path: articleUrls.getAllArticles + '/:articleId', element: <ArticlesPage/>
            },
            {
                path: ancestors.allancestors, element: <AllAncestorsHocPage/>
            },
        ]
    }
])