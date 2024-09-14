import ReservationManager from './ReservationManager';
import './BookingPage.css';

const BookingPage = () => {
    return (
        <main> {/* Main content area for better accessibility */}
            <section className="hero-section" aria-labelledby="booking-header"> {/* aria-labelledby points to the header for better description */}
                <header className="booking-header">
                    <h1 id="booking-header">Reserve a Table</h1> {/* Added id for aria-labelledby */}
                </header>
            </section>
            <div className="booking-container">
                <section
                    className="booking-form"
                    aria-labelledby="booking-form-title"
                    aria-describedby="booking-form-description"
                > {/* Section that describes the booking form */}
                    <p id="booking-form-description">Please fill out the form below to book a table at Little Lemon.</p> {/* Description of the form */}
                    <ReservationManager /> {/* Component for managing reservation */}
                </section>
            </div>
        </main>
    );
};

export default BookingPage;
