import { lazy, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const Register = lazy(() => import('./Components/Register'));
const Login = lazy(() => import('./Components/Login'));
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
      Component: HomePage,
      HydrateFallback: fallBackUi,
      children: [
        {
          path: "/register",
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
        }
      ]
    }
  ])

  return (
    <>
      <Suspense fallback={<div>Loading app...</div>}>

        <RouterProvider router={route} />
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
      </Suspense>
    </>
  )
}

export default App
