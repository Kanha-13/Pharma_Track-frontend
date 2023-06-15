import './index.css'
import { useEffect, useRef, useState } from "react";
import COLORS from "../../Constants/colors";
import Signup from './Signup';
import Signin from './Sigin';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD } from '../../Constants/routes_frontend';
const Login = () => {
  const navigate = useNavigate()
  const loginContainer = useRef()
  const [mode, setMode] = useState(1)

  useEffect(() => {
    const mytoken = process.env.REACT_APP_SESSION
    const session = localStorage.getItem(mytoken)
    if (session) {
      navigate(DASHBOARD)
    }
    loginContainer.current.style.setProperty('--login-container-bg', COLORS.LOGIN_CONTAINER_BG);
  }, [])
  return (
    <div id="login-container" ref={loginContainer}>
      {
        mode ?
          <Signin tosignup={() => setMode((prev) => !prev)} /> :
          <Signup tosignin={() => setMode((prev) => !prev)} />
      }
    </div>
  );
}
export default Login;