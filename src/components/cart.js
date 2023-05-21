import { useEffect, useState } from "react";
import "./cart.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let total = 0;
  let count = 0;
  let selectedItems = [];
  const getAllData = async () => {
    try {
      let allData = await fetch("https://shop-memories-be.vercel.app/shop/cartItems", {
        method: "GET",
      });
      let response = await allData.json();
      setData(response);
    } catch (error) {
      console.log(error);
      swal("Error occured");
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  const removeFromCart = async (value) => {
    try {
      let res = await fetch("https://shop-memories-be.vercel.app/shop/removeFromCart", {
        method: "POST",
        body: JSON.stringify({
          _id: value._id,
          name: value.name,
          description: value.description,
          price: value.price,
          image: value.image,
        }),
        headers:{
            "Content-Type":"application/json"
          }
      });
      let response = await res.json();
      swal(response.message,"","success");
      getAllData();
    } catch (error) {
      console.log(error);
      swal("Error occured");
    }
  };
  return (
    <div className="container-fluid cart">
      <div className="row main">
        <div className="col-md-9 col-xl-9 cartItems">
          <h2>Shopping Cart <i class="fa-solid fa-cart-shopping"></i></h2>
          <hr />
          <div className="container-fluid">
            <div className="row">
              {data.map((value) => {

                let currentPrice = value.price;
                currentPrice = currentPrice.split(",").join("");
                console.log(currentPrice);
                total += +currentPrice;
                count++;

                selectedItems.push(value.name);
                return (
                  <>
                    <div className="col-md-2 col-xl-2">
                      <img className="cartImage" src={value.image} alt="" />
                    </div>
                    <div className="col-md-10 col-xl-10 details">
                      <p className="description">{value.description}</p>
                      <p className="green">In stock</p>
                      <span
                        title="Anniversay discount sale !!!"
                        className="sale"
                      >
                        Great Festival sale
                      </span>
                      <p>
                        ₹ <span className="description"> {value.price}</span>
                      </p>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(value)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                    <div className="col-md-12 col-xl-12">
                      <hr />
                    </div>
                  </>
                );
              })}
              <div className="subtotal col-md-12 col-xl-12">
                <p>
                  Subtotal ({count} items) ₹ <span>{total}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2 col-xl-2 payment">
            <div>
                <p className="green">Your order is eligible for FREE Delivery.</p>
            </div>
            <p className="total">
                  Subtotal ({count} items) ₹ <span>{total}</span>
            </p>
            <button onClick={()=>navigate("/purchase",{state:selectedItems.join(" , ")})}>Procced to pay</button>
        </div>
      </div>
    </div>
  );
};
export default Cart;
