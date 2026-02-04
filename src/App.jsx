import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import UserProfile from './pages/UserProfile/UserProfile'
import NewsFeed from './pages/NewsFeed/NewsFeed'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/AuthPages/Register/Register'
import Login from './pages/AuthPages/Login/Login'
import { Button } from '@heroui/react'
import AppProtectedRoutes from './ProtectedRoutes/AppProtectedRoutes'
import AuthProtectedRoutes from './ProtectedRoutes/AuthProtectedRoutes'
import ProfileLayout from './layouts/ProfileLayout'

export default function App() {
  const router = createBrowserRouter([
    {
      // wrapping the mainlayout with its children into the AppProtectedRoutes as its wrapper
      // when a user doesnot have a token it wont allow the user to access the pages of the website other than the login and signup
      path: "", element:<AppProtectedRoutes> <MainLayout/> </AppProtectedRoutes>, children: [
      { index: true , element: <Navigate to={"/home"}/>},
      { path: '/home', element:<NewsFeed/>},
      // { path: '/profile', element: <UserProfile/>},
      ]
    },
    {
      element: (
        <AppProtectedRoutes>
          <ProfileLayout />
        </AppProtectedRoutes>
      ),
      children: [
        { path: "/profile", element: <UserProfile /> },
      ],
    },
    {
      //// wrapping the authlayout with its children into the AuthProtectedRoutes as its wrapper
      // when a user is already logedin (has token) so no way he can return back to signin page or signup
      path: "", element: <AuthProtectedRoutes> <AuthLayout/> </AuthProtectedRoutes>, children: [
      {path: '/register', element: <Register/>},
      {path: '/login', element: <Login/>},
    ]
  },
  { path: '*', element: <NotFound/>}
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
