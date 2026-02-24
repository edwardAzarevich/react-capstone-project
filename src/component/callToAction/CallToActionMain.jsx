import CallToActionCard from './CallToActionCard';
import pic from '../../assets/Pic.svg';
import './CallAction.css';

const CallToActionMain = () => {
    return (
        <div style={{ display: 'flex', width: '900px', justifyContent: 'center' }}>
            <div className='CallToActionMain'>
                <CallToActionCard />
                <img style={{ width: '310px', maxWidth: '100%' }} src={pic} alt="Vector icon" />
            </div>
        </div>
    );
};

export default CallToActionMain;
