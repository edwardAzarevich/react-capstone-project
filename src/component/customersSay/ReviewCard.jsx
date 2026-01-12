import './ReviewCard.css';
import imgShape from "../../assets/Shape.png";
import Rating from '../../component/rating/Rating';

const ReviewCard = ({ title, body, name, date, avatar }) => {
    return (
        <div className="review-card">
            <Rating />
            <div className="review-body">
                <h3 className="review-title">{title}</h3>
                <p className="review-text">{body}</p>
            </div>
            <div className="avatar-block">
                <div className="avatar">
                    <img src={avatar || imgShape} alt={name} />
                </div>
                <div className="info">
                    <p className="info-name">{name}</p>
                    <p className="info-date">{date}</p>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
