import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../pages/mainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { ancestors, articleUrls, authUrls, baseUrls, chronologyUrls, uploadGed } from '../costants/Urls';
import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
import GoogleCallback from '../components/googleCallbackComponent/GoogleCallback';
import LogOutComponent from '../components/logoutComponent/LogOutComponent';
import ArticlesPage from '../pages/articlesDetailPage/ArticlesDetailPage';
import AllAncestorsPage from '../pages/allAncestorsPage/AllAncestorsPage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import LoginPage from '../pages/loginPage/LoginPage';
import CreateArticlePage from '../pages/createArticlePage/CreateArticlePage';
import CreateDatesPage from '../pages/createDatesPage/CreateDatesPage';
import DatesPage from "../pages/datesPage/DatesPage";
import UpdateDatePage from '../pages/updateDatePage/UpdateDatePage';
import AncestorDetailPage from '../pages/ancestorDetailPage/AncestorDetailPage';
import AllArticlesPage from '../pages/AllArticlesPage/AllArticlesPage';
import AllDatesPage from '../pages/allDatesPage/AllDatesPage';
import UploadGedPage from '../pages/uploadGedPage/uploadGedPage';



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
                path: articleUrls.getAllArticles, element: <AllArticlesPage/>
            },
            {
                path: articleUrls.getAllArticles + '/:articleId', element: <ArticlesPage/>
            },
            {
                path: articleUrls.createArticle, element: <CreateArticlePage/>
            },
            {
                path: ancestors.allancestors, element: <AllAncestorsPage/>
            },
            {
                path: baseUrls.baseAncestors + '/:ancestorId', element: <AncestorDetailPage/>
            },
            {
                path: baseUrls.baseChronology, element: <AllDatesPage/>
            },
            {
                path: baseUrls.baseChronology + '/:dateId', element: <DatesPage/>
            },
            {
                path: chronologyUrls.createDate, element: <CreateDatesPage/>
            },
            {
                path: baseUrls.baseChronologyAdmin + '/:dateId', element: <UpdateDatePage/>
            },
            {
                path: uploadGed.uploadFile, element: <UploadGedPage/>
            },
        ]
    }
])