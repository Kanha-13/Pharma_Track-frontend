import { useEffect, useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { handleResendOTP } from "../../apis/login";

const VerificationLeft = ({ onSwitch, prefill }) => {
  const [isDisabled, setisDisabled] = useState(false);
  const [email, setEmail] = useState("")

  const onemailsubmit = async (e) => {
    e.preventDefault();
    setisDisabled(true)
    const data = { email: email, location: "verificationleft" }
    try {
      const res = await handleResendOTP(data)
      alert(res?.message||"OTP sent to your email!")
      onSwitch(2, data);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wront!")
      setisDisabled(false)
    }
  }

  useEffect(() => {
    if (prefill)
      setEmail(prefill.email || "")
  }, [prefill])

  return (
    <div className="login-child-container">
      <form onSubmit={onemailsubmit} className="left">
        <h2 style={{ fontSize: "2.1rem" }}>Verify account</h2>
        <p style={{ margin: "5px 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>E-mail address</p>
        <input required placeholder='example@example.com' autoFocus type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button disabled={isDisabled} type="submit" style={{ marginTop: "30px", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Continue</button>
        <p style={{ margin: "4.2vh 0px 0.5vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Already a verified member?<span onClick={() => onSwitch(1)} style={{ marginLeft: "5px", cursor: "pointer", color: "#489BE8" }}>Log In</span></p>
      </form>
      <div className="right">
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
    </div>
  );
}
export default VerificationLeft;