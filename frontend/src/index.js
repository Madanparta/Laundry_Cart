import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import {createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import RegisterForm from "./screen/RegisterForm";
import Header from './Main/Header/Header';
import LoginForm from "./screen/LoginForm";
import Error from './ErrorComponents/Error';
import Footer from './Main/Footer/Footer';
import Forgot from './screen/Forgot';

import OHeader from "./screen/order/OrderHeader/OHeader";
import SideBar from './screen/order/sideBar/SideBar';
import MainOrderDashBord from "./screen/order/MainOrderDashBord";


const App = () => {
  return (
    <>
    <div>
      <OHeader/>
      <div className="mainContainer">
        <SideBar/>
        <MainOrderDashBord/>
      </div>
    </div>
    
    {/* <div>
      <Header />
      <Outlet/>
      <Footer/>
    </div> */}
    </>
  );
};

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
        // element: <LoginForm/>,
//       },
//       {
//         path: "/register",
//         element: <RegisterForm />,
//       },
//       {
//         path: "/forgotpassword",
//         element: <Forgot />,
//       },
//     ],
//     errorElement: <Error />,
//   },
// ]);
  
const appRouter2 = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement: <Error />,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<RouterProvider router={appRouter}/>);
root.render(<RouterProvider router={appRouter2}/>);

