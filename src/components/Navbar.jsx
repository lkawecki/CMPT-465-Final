import './Navbar.css'; 
import MCLogo from './MCLogo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return ( 
    <>
      <h1 className="banner-container">
        <div className="banner">
          <div className="banner-left">MC</div>
          <div className="MC-logo-container">
            <img className="MC-logo" src={MCLogo} alt="MC Logo" />
          </div>
          <div className="banner-right">Reads</div>
        </div>
      </h1>
      <h1 className="navbar-container">
        <div className="navbar">
          <nav>
            <ul className="nav__links">
              <li className="nav-home">
                <a href="#">Home</a>
              </li>
              <li className="nav-search">
                <Link to="/search">Search</Link>
              </li>
              <li className="nav-log-out">
                <a href="#">Log-out</a>
              </li>
            </ul>
          </nav>
        </div>
      </h1>
    </>
   );
}
 
export default Navbar;