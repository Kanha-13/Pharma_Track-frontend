import { useEffect, useState } from 'react';
import Ganpatiji from "../../images/ganpatiji.png"
import './header.css'
import { to_dd_monthname_yy } from '../../utils/DateConverter';
const Header = () => {
  return (
    <div id='app-header-container'>
      <div className='app-header-title' >
        <img className='app-header-img' src={Ganpatiji} />
        <p>Agrawal Medical Store</p>
      </div>
      <p className='header-date-time'>{to_dd_monthname_yy()}</p>
    </div>
  );
}
export default Header;