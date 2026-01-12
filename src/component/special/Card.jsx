import './Card.css';
import deliveryIcon from '../../assets/Delivery.svg';


const Card = ({ image, title, price, description }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={image} alt={title} />
            </div>
            <div className="card-content">
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                    <span className="card-price">{price}</span>
                </div>
                <p className="card-description">{description}</p>
                <div className="card-footer">
                    <span className="card-delivery">Order Delivery</span>
                    <img
                        src={deliveryIcon}
                        alt="Delivery"
                        className="delivery-icon"
                        style={{ width: '20px', height: '20px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;
