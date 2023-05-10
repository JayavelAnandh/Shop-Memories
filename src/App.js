
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/addProduct';
import DashBoard from './components/dashboard';
import EditPage from './components/editpage';
import ForgetPassword from './components/forgetPassword';
import HomePage from './components/homepage';
import LogIn from './components/login';
import ResetPassword from './components/resetPassword';
import SignUp from './components/signup';

function App() {
  return (
    <div>
   <Routes>
   <Route path='/' element={<DashBoard><LogIn/></DashBoard>}/>
    <Route path="/homepage" element={<DashBoard><HomePage/></DashBoard>}/>
    <Route path='/edit' element={<DashBoard><EditPage/></DashBoard>}/>
    <Route path='/add' element={<DashBoard><AddProduct/></DashBoard>}/>
    <Route path='/forget' element={<DashBoard><ForgetPassword/></DashBoard>}/>
    <Route path='/reset' element={<DashBoard><ResetPassword/></DashBoard>}/>
    <Route path='/signup' element={<DashBoard><SignUp/></DashBoard>}/>

    
    
   </Routes>
   </div>
  );
}

export default App;
