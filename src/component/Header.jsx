import img from '../assets/Vector.svg';


const Header = () => {
    return (
        <header className='Header'>
            <img src={img} alt="Vector icon" />
            <nav className="Nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/menu">Menu</a></li>
                    <li><a href="/reservations">Reservations</a></li>
                    <li><a href="/order">Order Online</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
        </header>)
}

export default Header;
