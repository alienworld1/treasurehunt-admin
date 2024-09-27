import { redirect } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Error from "./pages/error";
import { deleteToken, getToken } from "./tokenHandler";

const authLoader = () => {
  if(!getToken()) {
    return redirect('/login');
  }
  return null;
}

const routes = [
  {
    path: '/',
    loader: () => redirect('/login'),
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    loader: authLoader,
    element: <Dashboard />,
  },
  {
    path: '/logout',
    loader: () => {
      deleteToken();
      return redirect('/login');
    }
  }
];

export default routes;