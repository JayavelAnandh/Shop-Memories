import { useEffect, useState } from "react";
import "./purchase.css";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";

const Purchase = () => {
  let [country, setCountry] = useState("");
  let [fullName, setFullName] = useState("");
  let [contact, setContact] = useState("");
  let [pinCode, setPinCode] = useState("");
  let [address1, setAddress1] = useState("");
  let [address2, setAddress2] = useState("");
  let [city, setCity] = useState("");
  let [state, setState] = useState("");
  let gmail = localStorage.getItem("gmail");
  let location = useLocation();
  let navigate = useNavigate();
  let product_name = location.state;
  const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            let res = await fetch("https://shop-memories-be.vercel.app/shop/purchase",{
                method:"PUT",
                body:JSON.stringify({
                    product_name,
                    gmail,
                    fullName,
                    contact,
                    address1,
                    address2,
                    pinCode,
                    city,
                    state,
                    country
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let response = await res.json();
            navigate("/homepage");

            swal("Your order is confirmed !!!","Don't worry about the payment this time 😉","success")
        } catch (error) {
            console.log(error);
            swal("error occured",error);
        }
  }
  const getUserAddress = async()=>{
        try {
            let res = await fetch(`https://shop-memories-be.vercel.app/shop/address/${gmail}`,{
                method:"GET",
            });
            let response = await res.json();
            console.log(response);
            setFullName(response.fullName);
            setAddress1(response.address1);
            setAddress2(response.address2);
            setCity(response.city);
            setContact(response.contact);
            setCountry(response.country);
            setPinCode(response.pinCode);
            setState(response.state);
        } catch (error) {
            console.log(error);
            swal("error occured",error);
        }
  }
 useEffect(()=>{
    getUserAddress();
 },[])
  function selectedSubjectName() {
    var selectedCountry = document.getElementById('country');
    var value = selectedCountry.value;
    setCountry(value);
    console.log("The selected value=" + value);
 }
  return (
    <div className="container-md purchase">
      <div className="row">
        <div className="col-md-6 addressBox">
          <form className="addressForm">
            <h2>Add Your Delievery Address</h2>
            <label htmlFor="country">Country</label>
            <select id="country" name="country" onChange={()=>selectedSubjectName()}>
              <option value={"India"}>India</option>
              <option value={"Bangladesh"}>Bangladesh</option>
              <option value={"Pakistan"}>Pakistan</option>
            </select>

            <label htmlFor="fullName">FullName</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />

            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              pattern="\d"
              maxLength="10"
              minLength="10"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />

            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={pinCode}
              onChange={(event) => setPinCode(event.target.value)}
              maxLength="6"
            />

            <label htmlFor="address1">Flat, House no., Building, Company, Apartment</label>
            <input
              type="text"
              id="address1"
              name="address1"
              value={address1}
              onChange={(event) => setAddress1(event.target.value)}

            />

            <label htmlFor="address2">Area, Street, Sector, Village</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={address2}
              onChange={(event) => setAddress2(event.target.value)}

            />

            <label htmlFor="city">City / Town</label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}

            />

            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={state}
              onChange={(event) => setState(event.target.value)}

            />
            <br/>
            <button type="submit" onClick={(event)=>handleSubmit(event)}>Confirm Order</button>

          </form>
        </div>
      </div>
    </div>
  );
};
export default Purchase;
