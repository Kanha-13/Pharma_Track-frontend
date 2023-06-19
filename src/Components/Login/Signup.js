import { useEffect, useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { handleSignupSubmit } from "../../apis/login";
import Loading from "../Loading/Loading";

const Signup = ({ onSwitch, prefill }) => {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setisDisabled] = useState(false);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const onsignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setisDisabled(true)
    const data = {
      userRole: role,
      userEmail: email,
      userName: userName,
      password: password,
      location: "signup"
    }
    try {
      const res = await handleSignupSubmit(data)
      alert(res.data?.message || "Otp sent to your email!")
      onSwitch(2, data)
    } catch (error) {
      console.log(error)
      if (error.response?.data)
        alert(error.response?.data)
      else
        alert("Something went wrong!")
      setisDisabled(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (prefill) {
      setName(prefill.userName || "")
      setPassword(prefill.password || "")
      setRole(prefill.userRole || "")
      setEmail(prefill.userEmail || "")
    }
  }, [prefill])

  return (
    loading ? <Loading /> :
      <div className="login-child-container">
        <div className="right">
          <img src={Ganpatiji} />
          <p>Agrawal Medical</p>
        </div>
        <form onSubmit={onsignup} className="left">
          <h2 style={{ fontSize: "2.1rem" }}>Welcome</h2>
          <p style={{ margin: "0.7vh 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>Name</p>
          <input required placeholder='user name' autoFocus type='text' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "0.7vh 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={userName} onChange={(e) => setName(e.target.value)} />
          <p style={{ margin: "0.7vh 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>E-mail address</p>
          <input required placeholder='example@example.com' type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "0.7vh 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={email} onChange={(e) => setEmail(e.target.value)} />
          <p style={{ margin: "1.4vh 0px 0.7vh 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>Password</p>
          <input required placeholder="***********" type='password' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "0.7vh 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={password} onChange={(e) => setPassword(e.target.value)} />
          <p style={{ margin: "0.7vh 0px", width: "60%", textAlign: "left", fontSize: "0.9rem" }}>Role (optional)</p>
          <input placeholder='Assistant' type='text' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "0.7vh 0px", height: "5%", width: "57%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={role} onChange={(e) => setRole(e.target.value)} />
          <div style={{ marginTop: "2vh", display: "flex", alignItems: "center", flexDirection: "row", width: "60%" }}>
            <input required style={{ height: "110%", width: "5%", margin: "0px" }} type="checkbox" />
            <p style={{ margin: "0px 0px 0px 1.4vh", width: "100%", textAlign: "left", fontSize: "0.9rem" }}>By sigining up you agree to your <span style={{ color: "#489BE8" }}>privacy policy and T&C</span></p>
          </div>
          <button disabled={isDisabled} type="submit" style={{ marginTop: "4.2vh", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "62%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Continue</button>
          <p style={{ margin: "4.2vh 0px 0.5vh -4vw", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Already a member?<span onClick={() => onSwitch(1)} style={{ marginLeft: "0.7vh", cursor: "pointer", color: "#489BE8" }}>Log In</span></p>
          <p style={{ margin: "0.5vh 0px 4.2vh -4vw", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Registered but not verified?<span onClick={() => onSwitch(3)} style={{ marginLeft: "0.7vh", cursor: "pointer", color: "#489BE8" }}>Verify your account</span></p>
        </form>
      </div>
  );
}
export default Signup;