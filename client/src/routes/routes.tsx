import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../pages/mainLayout/MainLayout';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import { apiParams, apiUrls, baseUrls } from '../costants/Urls';

import AuthGoogleLogComponent from '../components/loginComponent/AuthGoogleLogComponent';
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
import UpdateArticlePage from "../pages/updateArticlePage/UpdateArticlePage";
import UploadFotoPage from "../pages/uploadFotoPage/UploadFotoPage";
import AllImagesPage from "../pages/allImagesPage/AllImagesPage";
import AllTagsPage from "../pages/allTagsPage/AllTagsPage";
import UpdateTagPage from "../pages/updateTagPage/UpdateTagPage";

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
                path: apiUrls.auth.googleCallback,
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

            // Articles
            {
                path: apiUrls.article.getAll,
                element: <AllArticlesPage />,
            },
            {
                path: `${apiUrls.article.getAll}/:${apiParams.articleId}`,
                element: <ArticlesPage />,
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

            // Users (simple)
            {
                path: apiUrls.users.me,
                element: <UserDetailPage />,
            },

          // admin Dashboard
            {
                path: baseUrls.adminDashboard,
                element: <DashboardLayout />,
                errorElement:  <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <AllArticlesPage dashboard={true} />
                    },
                    {
                        path: apiUrls.admin.articles,
                        element: <AllArticlesPage dashboard={true}/>,
                    },
                    {
                        path: apiUrls.admin.createArticle,
                        element: <CreateArticlePage/>,
                    },
                    {
                        path: `${apiUrls.admin.updateteArticle}/:${apiParams.articleId}`,
                        element: <UpdateArticlePage />,
                    },
                    {
                        path: apiUrls.admin.chronology,
                        element: <AllDatesPage dashboard={true}/>,
                    },
                    {
                        path: apiUrls.admin.createChronology,
                        element: <CreateDatesPage/>,
                    },
                    {
                        path: `${apiUrls.admin.chronology}/:${apiParams.chronologyId}`,
                        element: <UpdateDatePage />,
                    },
                    {
                        path: baseUrls.images,
                        element: <UploadFotoPage/>

                    },
                    {
                        path: apiUrls.images.getAllImages,
                        element: <AllImagesPage/>

                    },
                    {
                        path: apiUrls.uploadGed.uploadGed,
                        element: <UploadGedPage />,
                    },
                    {
                        path: baseUrls.adminUsers,
                        element: <AllUsersPage />,
                    },
                    {
                        path: apiUrls.users.create,
                        element: <CreateUserByAdminPage />,
                    },
                    {
                        path: `${apiUrls.users.update}/:${apiParams.userID}`,
                        element: <UpdateUserPage />,
                    },
                    {
                        path: `${baseUrls.adminUsers}/:${apiParams.userID}`,
                        element: <UsersAdminDetailPage />,
                    },
                    {
                        path: baseUrls.adminTags,
                        element: <AllTagsPage />,
                    },
                    {
                        path: `${apiUrls.tag.update}/:${apiParams.tagId}`,
                        element: <UpdateTagPage />,
                    },
                ]
                }
        ],
    },
]);
