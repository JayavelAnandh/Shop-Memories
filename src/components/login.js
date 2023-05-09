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
      let res = await fetch("http://localhost:9000/login", {
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
      swal("Logged In successfully","","success");
      navigate("/homepage")
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
          <button type="submit" onClick={(event) => handleSubmit(event)}>
            Log in
          </button>
        </form>
        <br/>
        <p><span onClick={()=>navigate("/forget")}>Forget Password?</span></p>
        <p>Login <a href="" >Credentials</a> </p>
      </div>
    </div>
  );
};
export default LogIn;