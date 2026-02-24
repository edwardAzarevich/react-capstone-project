import CallToActionCard from './CallToActionCard';
import pic from '../../assets/Pic.svg';
import './CallAction.css';

const CallToActionMain = () => {
    return (
        <div className="cta-outer">
            <div className="CallToActionMain">
                <CallToActionCard />
                <img className="cta-image" src={pic} alt="Vector icon" />
            </div>
        </div>
    );
};

export default CallToActionMain;
