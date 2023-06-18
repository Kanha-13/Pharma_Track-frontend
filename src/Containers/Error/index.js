import { useNavigate } from "react-router-dom";
import LostNavigation from "../../images/illustrations/404Illustrator.jpg"
import './index.css'
const Error = () =>{
  const navigate = useNavigate()
  
  return(
    <div id="lost-nav-container" >
      <h1>404 Page Not Found!</h1>
      <img style={{height:"50%"}} src={LostNavigation} />
    </div>
  );
}
export default Error;