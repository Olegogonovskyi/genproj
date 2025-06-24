import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../pages/mainLayout/MainLayout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { apiParams, apiUrls, baseUrls } from '../costants/Urls';

import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
import GoogleCallback from '../components/googleCallbackComponent/GoogleCallback';
import LogOutComponent from '../components/logoutComponent/LogOutComponent';
import ArticlesPage from '../pages/articlesDetailPage/ArticlesDetailPage';
import AllAncestorsPage from '../pages/allAncestorsPage/AllAncestorsPage';
import RegisterPage from '../pages/registerPage/RegisterPage';
import LoginPage from '../pages/loginPage/LoginPage';
import CreateArticlePage from '../pages/createArticlePage/CreateArticlePage';
import CreateDatesPage from '../pages/createDatesPage/CreateDatesPage';
import UpdateDatePage from '../pages/updateDatePage/UpdateDatePage';
import AncestorDetailPage from '../pages/ancestorDetailPage/AncestorDetailPage';
import AllArticlesPage from '../pages/AllArticlesPage/AllArticlesPage';
import AllDatesPage from '../pages/allDatesPage/AllDatesPage';
import UploadGedPage from '../pages/uploadGedPage/uploadGedPage';
import DatesDetailPage from '../pages/datesDetailPage/DatesDetailPage';
import UserDetailPage from '../pages/userDetailPage/UserDetailPage';
import CreateUserByAdminPage from '../pages/createUserByAdminPage/CreateUserByAdminPage';
import UsersAdminDetailPage from '../pages/usersAdminDetailPage/UsersAdminDetailPage';
import AllUsersPage from '../pages/allUsersPage/AllUsersPage';
import UpdateUserPage from '../pages/updateUserPage/UpdateUserPage';
import AllAncestorsDataPage from '../pages/allAncestorsDataPage/AllAncestorsDataPage';
import AncestorsDateDetailPage from '../pages/ancestorsDateDetailPage/AncestorsDateDetailPage';
import MainPage from '../pages/mainPage/MainPage';
import { DashboardLayout } from '../pages/DashboardLayout/DashboardLayout';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [

            {
                index: true,
                element: <MainPage/>
            },
            // errors
            {
                path: apiUrls.errorsUrls.ForbiddenException,
                element: <ErrorPage />,
            },

            // Auth
            {
                path: apiUrls.auth.googleLogin,
                element: <AuthGoogleLogComponent />,
            },
            {
                path: apiUrls.auth.register,
                element: <RegisterPage />,
            },
            {
                path: apiUrls.auth.login,
                element: <LoginPage />,
            },
            {
                path: apiUrls.auth.googleCallback,
                element: <GoogleCallback />,
            },
            {
                path: apiUrls.auth.logout,
                element: <LogOutComponent />,
            },

            // Articles
            {
                path: apiUrls.article.getAll,
                element: <AllArticlesPage />,
            },
            {
                path: `${apiUrls.article.getAll}/:${apiParams.articleId}`,
                element: <ArticlesPage />,
            },
            {
                path: `${apiUrls.article.update}/:${apiParams.articleId}`,
                element: <ArticlesPage />,
            },
            {
                path: apiUrls.article.create,
                element: <CreateArticlePage />,
            },

            // Ancestors
            {
                path: apiUrls.ancestors.getAllAncestors,
                element: <AllAncestorsPage />,
            },
            {
                path: `${baseUrls.ancestors}/:${apiParams.ancestorId}`,
                element: <AncestorDetailPage />,
            },
            {
                path: apiUrls.ancestors.getAllAncestorsDates,
                element: <AllAncestorsDataPage />,
            },
            {
                path: `${apiUrls.ancestors.getAncestorDate}/:${apiParams.eventId}`,
                element: <AncestorsDateDetailPage />,
            },

            // Chronology
            {
                path: baseUrls.chronology,
                element: <AllDatesPage />,
            },
            {
                path: `${baseUrls.chronology}/:${apiParams.chronologyId}`,
                element: <DatesDetailPage />,
            },
            {
                path: apiUrls.chronology.create,
                element: <CreateDatesPage />,
            },
            {
                path: `${baseUrls.chronologyAdmin}/:${apiParams.chronologyId}`,
                element: <UpdateDatePage />,
            },

            // Upload GED
            {
                path: apiUrls.uploadGed.upload,
                element: <UploadGedPage />,
            },

            // Users (simple)
            {
                path: apiUrls.users.me,
                element: <UserDetailPage />,
            },

            // Users (byAdmin)
            {
                path: apiUrls.users.create,
                element: <CreateUserByAdminPage />,
            },
            {
                path: `${apiUrls.users.update}/:${apiParams.userID}`,
                element: <UpdateUserPage />,
            },
            {
                path: baseUrls.adminUsers,
                element: <AllUsersPage />,
            },
            {
                path: `${baseUrls.adminUsers}/:${apiParams.userID}`,
                element: <UsersAdminDetailPage />,
            },
          // admin Dashboard
            {
                path: baseUrls.adminDashboard,
                element: <DashboardLayout />,
                errorElement:  <ErrorPage />,
                children: [
                    {
                        path: apiUrls.admin.articles,
                        element: <AllArticlesPage dashboard={true}/>,
                    }
                ]
                }
        ],
    },
]);


