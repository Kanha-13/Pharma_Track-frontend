import './index.css'
import { useEffect, useRef, useState } from "react";
import COLORS from "../../Constants/colors";
import Signup from '../../Components/Login/Signup';
import Signin from '../../Components/Login/Signin';
import Loading from '../../Components/Loading/Loading';
import OTP from '../../Components/Login/Otp';
import VerificationLeft from '../../Components/Login/VerificationLeft';
import ForgetPassword from '../../Components/Login/ForgetPassword';
import NewPassword from '../../Components/Login/NewPassword';

const Login = () => {
  const [loading, setLoading] = useState(true)
  const loginContainer = useRef()
  const [mode, setMode] = useState(1)
  const [preFilldata, setPreFill] = useState([])

  const changemode = (mod, prefilldata = {}) => {
    setPreFill(prefilldata)
    setMode(mod)
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  useEffect(() => {
    loginContainer.current.style.setProperty('--login-container-bg', COLORS.LOGIN_CONTAINER_BG);
  }, []);

  return (
    <div id="login-container" ref={loginContainer}>
      {
        loading ? <Loading /> :
          <>
            {
              mode === 0 ? <Signup onSwitch={changemode} prefill={preFilldata} /> :
                mode === 1 ? <Signin onSwitch={changemode} /> :
                  mode === 2 ? <OTP onSwitch={changemode} data={preFilldata} /> :
                    mode === 3 ? <VerificationLeft onSwitch={changemode} prefill={preFilldata} /> :
                      mode === 4 ? <ForgetPassword onSwitch={changemode} prefill={preFilldata} /> :
                        mode === 5 ? <NewPassword onSwitch={changemode} prefill={preFilldata} /> : <></>
            }
          </>
      }
    </div>
  );
}
export default Login;