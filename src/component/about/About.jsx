import imgTeam from "../../assets/Images.png";
import './About.css';

function Images() {
    return (
        <div className="images-container" data-name="Images">
            <img src={imgTeam} alt="Restaurant team" className="team-image" />
        </div>
    );
}

function HeroText() {
    return (
        <div className="hero-text-container" data-name="Hero Text">
            <p className="hero-title">Little Lemon</p>
            <p className="hero-subtitle">Chicago</p>
            <p className="hero-description">
                Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment the restaurant features a locally sourced menu with daily specials.Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment the restaurant features a locally sourced menu with daily specials.
            </p>
        </div>
    );
}

const About = () => {
    return (
        <div className="about-container" data-name="About">
            <div className="about-background" data-name="About" />
            <HeroText />
            <Images />
        </div>
    );
}

export default About;
