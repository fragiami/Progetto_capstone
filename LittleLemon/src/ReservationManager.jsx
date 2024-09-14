import React, { useState } from 'react';
import BookingForm from './BookingForm';

const ReservationManager = () => {
    const [availableTimes, setAvailableTimes] = useState(["17:00", "18:00", "19:00", "20:00", "21:00"]);

    const handleDateChange = (date) => {
        setAvailableTimes(["17:00", "18:00", "19:00", "20:00", "21:00"]); // Replace with fetch logic
    };

    return (
        <BookingForm availableTimes={availableTimes} onDateChange={handleDateChange} />
    );
};

export default ReservationManager;
