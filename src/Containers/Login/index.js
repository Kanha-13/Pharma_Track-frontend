import './index.css'
import { useEffect, useRef, useState } from "react";
import COLORS from "../../Constants/colors";
import Signup from './Signup';
import Signin from './Sigin';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Constants/routes_frontend';
import Loading from '../../Components/Loading/Loading';
const Login = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const loginContainer = useRef()
  const [mode, setMode] = useState(1)

  // const checkSession = () => {
  //   const session = localStorage.getItem(process.env.REACT_APP_SESSION)
  //   if (session)
  //     return true
  //   else
  //     return false
  // }

  // const resolveNavigation = () => {
  //   if (checkSession())
  //     navigate(ROUTES.DASHBOARD)
  //   else
  //     setLoading(false)
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     resolveNavigation();
  //   }, 1000);
  // }, [])

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  },[])

  useEffect(() => {
    loginContainer.current.style.setProperty('--login-container-bg', COLORS.LOGIN_CONTAINER_BG);
  }, []);

  return (
    <div id="login-container" ref={loginContainer}>
      {
        loading ? <Loading /> :
          <>{
            mode ?
              <Signin tosignup={() => setMode((prev) => !prev)} /> :
              <Signup tosignin={() => setMode((prev) => !prev)} />
          }
          </>
      }
    </div>
  );
}
export default Login;