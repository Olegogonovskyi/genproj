import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../pages/mainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { authUrls } from '../costants/Urls';
import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
import GoogleCallback from '../components/googleCallbackComponent/GoogleCallback';
import LogOutComponent from '../components/logoutComponent/LogOutComponent';


export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, errorElement: <ErrorPage/>, children: [
            {
                index: true, element: <MainPage/>
            },
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
                path: 'movie/:id', element: <MovieDetailPage/>
            },
            {
                path: 'genre/:id', element: <GenrePage/>
            }
        ]
    }
])