import { useState } from "react";
import "./login.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  let [gmail, setGmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch("https://shop-memories-be.vercel.app/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          gmail,
          password,
        }),
      });
      let response =await res.json();
      localStorage.setItem("userName",response.userName);
      localStorage.setItem("gmail",response.gmail);

      swal("Logged In successfully","","success");
      navigate("/homepage")
      swal("Welcome to ' ANTIQUE AMAZE '   All our products are antique and historical items 💯" ,      "Our website doesn't has any 🚫 replicas")

    } catch (error) {
      console.log(error);
      swal({
        text:"Error Occuured",
        icon:"warning",
        dangerMode:true
      })
    }
  };
  return (
    <div className="container-md loginPage">
      <div className="card col-lg-8">
        <h1>Log-in...</h1>
        <form>
          <label htmlFor="gmail">Gmail</label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            value={gmail}
            onChange={(event) => setGmail(event.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <br />
          <div style={{display:"flex",justifyContent:"center"}}>
          <button type="submit" onClick={(event) => handleSubmit(event)}>
            Log in
          </button>
          </div>
          
        </form>
        <br/>
        <div style={{display:"flex",justifyContent:"center"}}><p><span onClick={()=>navigate("/forget")} >Forget Password?</span></p></div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>Login <a href="https://github.com/JayavelAnandh/Shop-Memories#readme" target="_blank">Credentials</a></p>
        <p>Create Your Own Account <span onClick={()=>navigate("/signup")}>HERE!</span></p>
        </div>
        
      </div>
    </div>
  );
};
export default LogIn;