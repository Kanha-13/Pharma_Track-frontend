import { useEffect, useState } from "react";
import Ganpatiji from "../../images/ganpatiji.svg"
import { handleSubmitNewPassword } from "../../apis/login";

const NewPassword = ({ onSwitch, prefill }) => {
  const [password, setPassword] = useState("");
  const [isDisabled, setisDisabled] = useState(false);

  const onsubmitnewpassword = async (e) => {
    e.preventDefault()
    setisDisabled(true)
    const Data = {
      newPassword:password,
      reId: prefill.requestId
    }
    try {
      const res = await handleSubmitNewPassword(Data)
      alert(res.message || "Password reset successfully. Login to continue!")
      onSwitch(1)
    } catch (error) {
      setisDisabled(false)
      alert(error.response?.data?.message || error.response?.data || "Something went wront!")
    }
  }
  return (
    <div className="login-child-container">
      <div className='right'>
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
      <form onSubmit={onsubmitnewpassword} className='left'>
        <h2 style={{ fontSize: "2.1rem" }}>Enter new Password</h2>
        <p style={{ margin: "1.4vh 0px 0.7vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Password</p>
        <input required placeholder="***********" type='password' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={isDisabled} type='submit' style={{ marginTop: "2vh", cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Submit</button>
      </form>
    </div>
  );
}
export default NewPassword;