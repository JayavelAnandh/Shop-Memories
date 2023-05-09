import { useEffect, useState } from "react";
import "./homepage.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import DashBoard from "./dashboard";
const HomePage = () => {
  const [data, setData] = useState([]);
  let userName = localStorage.getItem("userName");
  
  const navigate = useNavigate();
  useEffect(() => {
    retriveAllData();
  }, []);
  const retriveAllData = async () => {
    try {
      let res = await fetch("http://localhost:9000/shop", {
        method: "GET",
      });
      const response = await res.json();
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("Error occured", error);
    }
  };

  const removeData=async(id)=>{
      try {
         let res = await fetch(`http://localhost:9000/shop/remove/${id}`,{
            method:"DELETE",

         });
         let response = await res.json();
         swal(response.message);
         retriveAllData();
      } catch (error) {
         console.log(error);
         alert("Error occured", error);
      }
  }
  return (
   <DashBoard>
    <div className="container-lg homepage">
      <div className="row">
        {data.map((value, idx) => {
          return (
            <div className="card col-xl-3 col-lg-4 col-sm-6 col-xs-12" key={idx}>
              <img src={value.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">
                  {value.description}
                </p>
                <span className="sale" title="Anniversay discount sale !!!">Great Festival Sale</span>
                <p className="card-text">₹ <span style={{fontSize:"24px"}} title="Prices may increase after the sale ends">{value.price}</span></p>
                <p className="card-text">Get it by <b title="Guaranteed 1 week delievery"> next Wednesday</b></p>
                {userName == "Admin" ? <span><button className="btn btn-primary" onClick={()=>navigate("/edit",{state:value._id})}>Edit</button>
                <button className="btn btn-danger" onClick={()=>removeData(value._id)}>Remove</button></span>:""}
                <button className="btn btn-info" title="Add" >Add To Cart</button>
              </div>
            </div>
            
          );
        })}
      </div>
    </div>
    </DashBoard>
  );
};
export default HomePage;
