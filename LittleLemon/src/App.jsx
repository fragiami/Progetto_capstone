import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import BookingPage from './BookingPage';
import Footer from './Footer';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<BookingPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
