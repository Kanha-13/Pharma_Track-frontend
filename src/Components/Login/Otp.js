import { useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { useNavigate } from "react-router-dom";
import { handleVerifyOTP } from "../../apis/login";
import { ROUTES } from "../../Constants/routes_frontend";

const OTP = ({ onSwitch, data = {} }) => {
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(false);
  const [otp, setOTP] = useState("")


  const changeEmail = () => {
    if (data.location === "signup")
      onSwitch(0, data)
    else
      onSwitch(3, data)
  }

  const onOTPsubmit = async (e) => {
    e.preventDefault();
    setisDisabled(true)

    const Data = {
      userEmail: data.email || data.userEmail || "",
      otp: otp || ""
    }

    try {
      const res = await handleVerifyOTP(Data)
      if (res.token) {
        sessionStorage.setItem(process.env.REACT_APP_SESSION, res.token)
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.DASHBOARD, { replace: true });
      } else {
        alert("Something wrong in the server!")
        setisDisabled(false)
      }
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data || "Something went wront!")
      setisDisabled(false)
    }
  }

  return (
    <div className="login-child-container">
      <form onSubmit={onOTPsubmit} className="left">
        <h2 style={{ fontSize: "2.1rem" }}>Enter OTP</h2>
        <p style={{ margin: "5px 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Otp</p>
        <input required placeholder='ex:123456' autoFocus type='text' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={otp} onChange={(e) => setOTP(e.target.value)} />
        <button disabled={isDisabled} type="submit" style={{ marginTop: "30px", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Continue</button>
        <p style={{ margin: "4.2vh 0px 0.5vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Want to change email?<span onClick={changeEmail} style={{ marginLeft: "5px", cursor: "pointer", color: "#489BE8" }}> click here</span></p>
      </form>
      <div className="right">
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
    </div>
  );
}
export default OTP;