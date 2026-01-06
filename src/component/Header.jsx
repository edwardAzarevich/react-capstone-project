import img from '../assets/Vector.svg';


const Header = () => {
    return (
        <header className='Header'>
            <img src={img} alt="Vector icon" />
            <div className='Nav'>
                <p>Home</p>
                <p>About</p>
                <p>Menu</p>
                <p>Reservations</p>
                <p>Order Online</p>
                <p>Login</p>
            </div>
        </header>)
}

export default Header;
