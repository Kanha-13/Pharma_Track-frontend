import LostNavigation from "../../images/illustrations/404Illustrator.jpg"
import './index.css'
const Error = () =>{
  
  return(
    <div id="lost-nav-container" >
      <h1>404 Page Not Found!</h1>
      <img style={{height:"50%"}} src={LostNavigation} />
    </div>
  );
}
export default Error;