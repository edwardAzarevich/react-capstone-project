import img from "../assets/Vector.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="Header" role="banner">
      <div className="logo-container">
        <img src={img} alt="Little Lemon Logo" className="logo" />
      </div>

      <nav className="Nav" aria-label="Main navigation">
        <ul>
          <li>
            <a href="/" aria-current="page">
              Home
            </a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/menu">Menu</a>
          </li>
          <li>
            <a href="/reservations">Reservations</a>
          </li>
          <li>
            <a href="/order">Order Online</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
