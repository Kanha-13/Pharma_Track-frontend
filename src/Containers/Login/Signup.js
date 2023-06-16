import { useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { useNavigate } from "react-router-dom";

const Signup = ({ tosignin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const onloginclick = () => {

  }

  return (
    <div className="login-child-container">
      <div className="right">
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
      <div className="left">
        <h2 style={{ fontSize: "2.1rem" }}>Welcome</h2>
        <p style={{ margin: "5px 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>E-mail address</p>
        <input placeholder='example@example.com' autoFocus type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <p style={{ margin: "10px 0px 5px 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>Password</p>
        <input placeholder="***********" type='password' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <p style={{ margin: "5px 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>Role</p>
        <input placeholder='Assistant' type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={role} onChange={(e) => setRole(e.target.value)} />
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", flexDirection: "row", width: "60%" }}>
          <input style={{ height: "110%", width: "5%", margin: "0px" }} type="checkbox" />
          <p style={{ margin: "0px 0px 0px 10px", width: "100%", textAlign: "left", fontSize: "0.9rem" }}>By sigining up you agree to your Privacy policy and T&C</p>
        </div>
        <button style={{ marginTop: "30px", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "60%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }} onClick={onloginclick}>Continue</button>
        <p style={{ margin: "30px 0px 30px 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Already a member?<span onClick={tosignin} style={{ marginLeft: "5px", cursor: "pointer", color: "#489BE8" }}>Log In</span></p>

      </div>
    </div>
  );
}
export default Signup;