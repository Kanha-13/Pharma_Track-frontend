import { useEffect, useState } from 'react';
import Ganpatiji from "../../images/ganpatiji.png"
import './header.css'
const Header = () => {
  const [date, setDate] = useState("")
  useEffect(() => {
    setDate(new Date().toLocaleDateString())
  }, []);
  return (
    <div id='app-header-container'>
      <div className='app-header-title' >
        <img className='app-header-img' src={Ganpatiji} />
        <h2>Agrawal Medical Store</h2>
      </div>
      <p className='header-date-time'>{date}</p>
    </div>
  );
}
export default Header;