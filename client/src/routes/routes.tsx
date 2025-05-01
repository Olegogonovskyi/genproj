import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../pages/mainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { ancestors, articleUrls, authUrls } from '../costants/Urls';
import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
import GoogleCallback from '../components/googleCallbackComponent/GoogleCallback';
import LogOutComponent from '../components/logoutComponent/LogOutComponent';
import AllArticlesPage from '../pages/AllArticlesPage/AllArticlesPage';
import ArticlesPage from '../pages/articlesPage/articlesPage';
import AllAncestorsPage from '../pages/allAncestorsPage/AllAncestorsPage';


export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [

            {
                path: authUrls.googleLogin, element: <AuthGoogleLogComponent/>
            },
            {
                path: authUrls.googleCallback, element: <GoogleCallback/>
            },
            {
                path: authUrls.logout, element: <LogOutComponent/>
            },
            {
                path: articleUrls.getAllArticles, element: <AllArticlesPage/>
            },
            {
                path: articleUrls.getAllArticles + '/:articleId', element: <ArticlesPage/>
            },
            {
                path: ancestors.allancestors, element: <AllAncestorsPage/>
            },
        ]
    }
])