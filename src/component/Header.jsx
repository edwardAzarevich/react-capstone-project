import img from '../assets/Vector.svg';


const Header = () => {
    return (
        <header className='Header'>
            <img src={img} alt="Vector icon" />
            <div className='Nav'>
                <h3>Home</h3>
                <h3>About</h3>
                <h3>Menu</h3>
                <h3>Reservations</h3>
                <h3>Order Online</h3>
                <h3>Login</h3>
            </div>
        </header>)
}

export default Header;
