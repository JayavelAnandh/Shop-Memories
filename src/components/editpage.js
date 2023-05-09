import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./editpage.css";
import swal from "sweetalert";
const EditPage=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    let [name,setName] = useState("");
    let [description,setDescription]= useState("");
    let [price,setPrice]= useState("");
    let [image,setImage]= useState("");

    const getdata=async()=>{
        try {
            let productData = await fetch(`http://localhost:9000/shop/id/${location.state}`,{
                method:"GET",
            });
            let response = await productData.json();
            console.log(response);
            setName(response.name);
            setDescription(response.description);
            setPrice(response.price);
            setImage(response.image);
        } catch (error) {
            console.log(error);
            alert("Error occured", error);
        }
    }
    useEffect(()=>{
        getdata()
    },[])
     
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            let update = await fetch(`http://localhost:9000/shop/edit/${location.state}`,{
                method:"PUT",
                body:JSON.stringify({
                    name,
                    description,
                    price,
                    image
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }); 
            let response = await update.json();
            console.log(response.message)
            swal("Updated Successfully");
            navigate("/homepage");
        } catch (error) {
            console.log(error);
            alert("Error occured", error);
        }
        
    }
    return(
       <div className="container-lg editpage">
            <div className="card">
                <form>
                <label htmlFor="name">Product Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(event)=>setName(event.target.value)}/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(event)=>setPrice(event.target.value)}/>
                <label htmlFor="image">Image Url</label>
                <input type="text" id="image" name="image" value={image} onChange={(event)=>setImage(event.target.value)}/>
                <br/>
                <button onClick={(event)=>handleSubmit(event)} className="btn btn-dark">Update Changes</button>
                </form>
            </div>
       </div>
    )
}
export default EditPage;