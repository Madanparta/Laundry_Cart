import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './componants/login-registertion/login/login';
import Registration from './componants/login-registertion/registeration/registeration';
import OrderMain from './componants/order/mainOrderDashboard';
import ForgotPassword from './componants/login-registertion/forgotPassword/forgotpwd';

import CreateOrder from "./componants/order/CreateOrder/CreateOrder";
import Error from './ErrorComponents/Error';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/order' element={<OrderMain/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path="/createorder" element={<CreateOrder/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
