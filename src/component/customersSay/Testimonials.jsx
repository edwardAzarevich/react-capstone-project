import ReviewCard from './ReviewCard';
import './Testimonials.css';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            title: 'Review title',
            body: 'Review body',
            name: 'Victoria',
            date: 'Date'
        },
        {
            id: 2,
            title: 'Review title',
            body: 'Review body',
            name: 'Edward',
            date: 'Date'
        },
        {
            id: 3,
            title: 'Review title',
            body: 'Review body',
            name: 'Ima',
            date: 'Date'
        },
        {
            id: 4,
            title: 'Review title',
            body: 'Review body',
            name: 'Eva',
            date: 'Date'
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <h1 className="testimonials-heading">Our customers love us!</h1>
                <div className="reviews-grid">
                    {reviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            title={review.title}
                            body={review.body}
                            name={review.name}
                            date={review.date}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
