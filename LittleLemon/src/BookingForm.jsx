import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { submitAPI } from './api';
import './BookingForm.css';

const BookingForm = ({ availableTimes, onDateChange }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '17:00',
        guests: 1,
        occasion: 'Birthday',
    });

    const [isTimeEnabled, setIsTimeEnabled] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'date') {
            onDateChange(value);
            setIsTimeEnabled(value !== '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);

        const success = submitAPI(formData);
        if (success) {
            setShowModal(true);
        } else {
            alert('Failed to submit reservation.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        window.location.reload();
    };

    useEffect(() => {
        const handleScroll = () => {
            document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showModal) {
            const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [showModal]);

    return (
        <div className="form-container">
            <form
                style={{ display: 'grid', maxWidth: '300px', gap: '20px' }}
                onSubmit={handleSubmit}
                aria-label="Reservation Form"
            >
                <label htmlFor="date">Choose date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                />

                <label htmlFor="time">Choose time</label>
                <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    disabled={!isTimeEnabled}
                    aria-required="true"
                    aria-disabled={!isTimeEnabled}
                >
                    {Array.isArray(availableTimes) && availableTimes.length > 0 ? (
                        availableTimes.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))
                    ) : (
                        <option value="">No available times</option>
                    )}
                </select>

                <label htmlFor="guests">Number of guests</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                    aria-required="true"
                />

                <label htmlFor="occasion">Occasion</label>
                <select
                    id="occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                >
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>

                <input type="submit" value="Make Your Reservation" />
            </form>

            {showModal && (
                <div className="modal-overlay" role="dialog" aria-modal="true">
                    <div className="modal-content">
                        <h2>Reservation Confirmed</h2>
                        <p>Your reservation has been submitted successfully!</p>
                        <p><strong>Date:</strong> {formData.date}</p>
                        <p><strong>Time:</strong> {formData.time}</p>
                        <p><strong>Guests:</strong> {formData.guests}</p>
                        <p><strong>Occasion:</strong> {formData.occasion}</p>
                        <button onClick={closeModal} aria-label="Close confirmation dialog">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

BookingForm.propTypes = {
    availableTimes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDateChange: PropTypes.func.isRequired,
};

export default BookingForm;
