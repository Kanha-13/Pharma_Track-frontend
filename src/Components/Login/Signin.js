import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sigin.css'
import Ganpatiji from "../../images/ganpatiji.svg"
import { handleLoginSubmit } from '../../apis/login';
import { ROUTES } from '../../Constants/routes_frontend';

const Signin = ({ onSwitch }) => {
  const [isDisabled, setisDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onloginclick = async (e) => {
    e.preventDefault()
    setisDisabled(true)
    const data = {
      email: email,
      password: password
    }
    try {
      const res = await handleLoginSubmit(data)
      if (res.token) {
        localStorage.setItem(process.env.REACT_APP_SESSION, res.token)
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.DASHBOARD, { replace: true });
      } else {
        alert("Something wrong in the server!")
        setisDisabled(false)
      }
    } catch (error) {
      if (error.response?.data.Error_message)
        alert(error.response?.data.Error_message)
      else
        alert("Something went wrong!")
      setisDisabled(false)
    }
  }
  return (
    <div className="login-child-container">
      <form onSubmit={onloginclick} className='left'>
        <h2 style={{ fontSize: "2.1rem" }}>Welcome back!</h2>
        <p style={{ margin: "0.7vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>E-mail address</p>
        <input required placeholder='example@example.com' autoFocus type='email' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={email} onChange={(e) => setEmail(e.target.value)} />
        <p style={{ margin: "1.4vh 0px 0.7vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>Password</p>
        <input required placeholder="***********" type='password' style={{ padding: "0px 2%", fontSize: "1.1rem", margin: "5px 0px", height: "5%", width: "46%", border: "2px solid #D6D8E7", borderRadius: "0.2rem", fontSize: "1.2rem" }} value={password} onChange={(e) => setPassword(e.target.value)} />
        <p onClick={()=>onSwitch(4)} style={{ margin: "1.4vh 0px 4.2vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem", color: "#489BE8", cursor: "pointer" }}>forget password?</p>
        <button disabled={isDisabled} type='submit' style={{ cursor: "pointer", backgroundColor: "#5E48E8", color: "#ffffff", width: "50%", height: "5%", borderRadius: "0.2rem", outline: "none", border: "none" }}>Continue</button>
        <p style={{ margin: "4.2vh 0px 4.2vh 0px", width: "50%", textAlign: "left", fontSize: "0.9rem" }}>New here?<span onClick={() => onSwitch(0)} style={{ marginLeft: "5px", cursor: "pointer", color: "#489BE8" }}>Register</span></p>
      </form>
      <div className='right'>
        <img src={Ganpatiji} />
        <p>Agrawal Medical</p>
      </div>
    </div>
  );
}
export default Signin;