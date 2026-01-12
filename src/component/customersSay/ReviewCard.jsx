import './ReviewCard.css';
import imgShape from "../../assets/Shape.png";

function Star() {
    return (
        <div className="star">
            <svg className="star-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g>
                    <path
                        stroke="#2C2C2C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    />
                </g>
            </svg>
        </div>
    );
}

function Rating() {
    return (
        <div className="rating">
            {[...Array(5).keys()].map((_, i) => (
                <Star key={i} />
            ))}
        </div>
    );
}

const ReviewCard = ({ title, body, name, date, avatar }) => {
    return (
        <div className="review-card">
            {/* <Rating /> */}
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
