
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './components/addProduct';
import EditPage from './components/editpage';
import HomePage from './components/homepage';

function App() {
  return (
    <div>
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/edit' element={<EditPage/>}/>
    <Route path='/add' element={<AddProduct/>}/>
   </Routes>
   </div>
  );
}

export default App;
