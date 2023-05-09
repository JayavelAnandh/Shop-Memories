import { useState } from "react";
import "./addProduct.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const AddProduct =()=>{
    let [name,setName] = useState("");
    let [description,setDescription]= useState("");
    let [price,setPrice]= useState("");
    let [image,setImage]= useState("");
    let navigate = useNavigate();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            let res = await fetch("http://localhost:9000/shop/newProduct",{
                method:"POST",
                body:JSON.stringify({
                    name,
                    description,
                    price,
                    image
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let response = res.json();
            swal("Product Added to Store");
            navigate("/");
        } catch (error) {
            console.log(error);
            swal("ErrorOccured");
        }
    }
    return(
        <div className="container-lg addPage" >
            <div className="card">
            <form>
                <label htmlFor="name">Product Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(event)=>setName(event.target.value)} required/>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" value={description} onChange={(event)=>setDescription(event.target.value)} required/>
                <label htmlFor="price">Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(event)=>setPrice(event.target.value)} required/>
                <label htmlFor="image">Image Url</label>
                <input type="text" id="image" name="image" value={image} onChange={(event)=>setImage(event.target.value)} required/>
                <br/>
                <button onClick={(event)=>handleSubmit(event)} className="btn btn-dark">Add to Store</button>
                </form>
            </div>
            {image == "" ? "" :<div className="imageDisplay">
            <span>The image you provided is</span>
            <img src={image} alt="Paste a valid url" />
            </div>}
            
        </div>
    )
}
export default AddProduct