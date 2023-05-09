import {AppBar,Toolbar,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
const DashBoard=({title,description,children})=>{
    let navigate = useNavigate();
    let logoutMethod=()=>{
        navigate("/")
    }
    return(
        <div className='main-component base-component'>

        <AppBar position='static' className='Appbar'>
          <Toolbar variant='dense'>
           <Button className='buttons'
           color='inherit'
           onClick={()=>navigate("/")}>
           
            <span className="nav-name">HomePage</span>
           </Button>

           <Button className='buttons'
           color='inherit' 
           onClick={()=>navigate("/details")}>
             
              <span className="nav-name">Student List</span>
              </Button>
           <Button className='buttons'

           color='inherit' 
           onClick={()=>navigate("/register")}>
            
            <span className="nav-name">Login</span> 
           </Button>
               
                <Button className='buttons'
           color='inherit'
            onClick={()=>navigate("/add-data")}>
             
             
             <span className="nav-name">Add Data</span> 
                </Button>
                
                <Button className='buttons logout'
             color='inherit'
              onClick={logoutMethod}>
             
             <span className="nav-name">Logout</span> 
                </Button>

          </Toolbar>
       </AppBar>
       <header>
           <marquee className="mar">Antique Amaze</marquee>
       </header>
       <main className='main-segment'>
          <h2>{description}</h2>

          
             {children}
          
       </main>
     
   </div>
    )
}
export default DashBoard;