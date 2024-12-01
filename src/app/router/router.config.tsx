import { createBrowserRouter } from 'react-router-dom'
import {MainPage} from "@/pages/main";
import {LoginPage} from "@/pages/login";
import {RegisterPage} from "@/pages/register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
]);
