import Card from './Card';
import './Special.css';
import salad from '../../assets/Salad.svg';
import Bruche from '../../assets/Bruche.svg';
import LemonDessert from '../../assets/LemonDessert.svg';


const Special = () => {
    const specialItems = [
        {
            id: 1,
            title: 'Greek salad',
            price: '$12.99',
            description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
            image: salad
        },
        {
            id: 2,
            title: 'Bruchetta',
            price: '$5.99',
            description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
            image: Bruche
        },
        {
            id: 3,
            title: 'Lemon Dessert',
            price: '$5.00',
            description: 'This comes straight from grandma\'s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
            image: LemonDessert
        }
    ];

    return (
        <section className="special-section">
            <div className="special-header">
                <h1 className="special-title">This week's specials!</h1>
                <a href="/reservations" style={{ textDecoration: 'none' }}>
                    <button className="special-button">Reserve a Table</button>
                </a>
            </div>
            <div className="special-cards">
                {specialItems.map(item => (
                    <Card
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                        image={item.image}
                    />
                ))}
            </div>
        </section>
    );
}

export default Special;
