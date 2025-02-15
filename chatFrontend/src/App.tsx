import { lazy, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Register = lazy(() => import('./Components/Register'));
const Login = lazy(() => import('./Components/Login'));
const IndexPage=lazy(()=>import("./Pages/IndexPage"))
const HomePage = lazy(() => import('./Pages/HomePage'));
const ProfilePage = lazy(() => import('./Pages/ProfilePage'));
const SettingPage = lazy(() => import('./Pages/SettingPage'));

const fallBackUi = () => {
  return <>
    <div>Loading...</div>
  </>
}

function App() {

  const route = createBrowserRouter([
    {
      path: "/",
      Component: IndexPage,
      HydrateFallback: fallBackUi,
      children: [
        {
          path: "/",
          Component: Register
        },
        {
          path: "/login",
          Component: Login
        },
        {
          path: "/setting",
          Component: SettingPage
        },
        {
          path: "/profile",
          Component: ProfilePage
        },
        {
          path:"/home",
          Component:HomePage
        }
      ]
    }
  ])

  return (
    <>
      <Suspense fallback={<div>Loading app...</div>}>

        <RouterProvider router={route} />
      </Suspense>
    </>
  )
}

export default App
