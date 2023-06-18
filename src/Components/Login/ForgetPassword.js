import { useEffect, useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { handleForgetPassword, handleResetPassVerifyOTP } from "../../apis/login";

const ForgetPassword = ({ onSwitch, prefill }) => {
  const [isEmailBtnDisabled, setisDisabled] = useState(false);
  const [isOTPBtnDisabled, setisOTPDisabled] = useState(true);
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")

  const onEmailSubmit = async () => {
    setisDisabled(true)
    const data = { email: email }
    try {
      const res = await handleForgetPassword(data)
      alert(res?.message || "Reset otp sent to your email!")
      setisOTPDisabled(false)
    } catch (error) {
      setisDisabled(false)
      alert(error.response?.data?.message || error.response?.data || "Something went wront!")
    }
  }

  const onOTPSubmit = async () => {
    setisOTPDisabled(true)
    const Data = {
      otp: otp,
      email: email
    }
    try {
      const res = await handleResetPassVerifyOTP(Data)
      onSwitch(5, { ...Data, requestId: res.requestId })
    } catch (error) {
      setisDisabled(false)
      alert(error.response?.data?.message || error.response?.data || "Something went wront!")
    }
  }

  useEffect(() => {
    if (prefill)
      setEmail(prefill.email || "")
  }, [prefill])
  return (
    <div className="login-child-container">
      <div className='left'>
        <h2 style={{ fontSize: "2.1rem" }}>Reset Password!</h2>
        <p style={{ margin: "0.7vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>E-mail address</p>
        <input disabled={!isOTPBtnDisabled} required placeholder='example@example.com' autoFocus type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={onEmailSubmit} disabled={isEmailBtnDisabled} type='submit' style={{ marginTop: "2vh", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Continue</button>
        <p style={{ margin: "1.4vh 0px 0.7vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>OTP</p>
        <input disabled={isOTPBtnDisabled} required placeholder="ex: 123456" type='text' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={otp} onChange={(e) => setOtp(e.target.value)} />
        <button onClick={onOTPSubmit} disabled={isOTPBtnDisabled} type='submit' style={{ marginTop: "2vh", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Submit OTP</button>
        <p onClick={() => onSwitch(1)} style={{ color: "#489BE8", cursor: "pointer", margin: "4.2vh 0px 4.2vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Back to Login</p>
      </div>
      <div className='right'>
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
    </div>
  );
}
export default ForgetPassword;