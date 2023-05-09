
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/addProduct';
import EditPage from './components/editpage';
import ForgetPassword from './components/forgetPassword';
import HomePage from './components/homepage';
import LogIn from './components/login';
import ResetPassword from './components/resetPassword';

function App() {
  return (
    <div>
   <Routes>
   <Route path='/' element={<LogIn/>}/>
    <Route path="/homepage" element={<HomePage/>}/>
    <Route path='/edit' element={<EditPage/>}/>
    <Route path='/add' element={<AddProduct/>}/>
    <Route path='/forget' element={<ForgetPassword/>}/>
    <Route path='/reset' element={<ResetPassword/>}/>
    
    
   </Routes>
   </div>
  );
}

export default App;
