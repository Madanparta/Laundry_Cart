import React from 'react';
import ReactDOM from 'react-dom/client';

import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import RegisterForm from "./screen/RegisterForm";
import Header from './Main/Header/Header';
import LoginForm from "./screen/LoginForm";
import Error from './ErrorComponents/Error';


const App = () => {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
    ],
    errorElement: <Error />,
  },
]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);

