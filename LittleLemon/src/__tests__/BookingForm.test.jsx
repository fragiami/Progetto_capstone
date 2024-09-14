import React from 'react';  import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';  import BookingForm from '../BookingForm';
import '@testing-library/jest-dom';  
describe('BookingForm Component', () => {
    const mockAvailableTimes = ['17:00', '18:00', '19:00'];
    const mockOnDateChange = vi.fn();

    beforeEach(() => {
        mockOnDateChange.mockClear();      });

    it('renders the form inputs correctly', () => {
        render(<BookingForm availableTimes={mockAvailableTimes} onDateChange={mockOnDateChange} />);

        expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
    });

    it('enables the time input when a date is selected', () => {
        render(<BookingForm availableTimes={mockAvailableTimes} onDateChange={mockOnDateChange} />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);

        expect(timeSelect).toBeDisabled();

        fireEvent.change(dateInput, { target: { value: '2023-09-01' } });
        expect(mockOnDateChange).toHaveBeenCalledWith('2023-09-01');
        expect(timeSelect).not.toBeDisabled();
    });

    it('shows the confirmation modal on successful form submission', () => {
        render(<BookingForm availableTimes={mockAvailableTimes} onDateChange={mockOnDateChange} />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i);
        const submitButton = screen.getByRole('button', { name: /make your reservation/i });

        fireEvent.change(dateInput, { target: { value: '2023-09-01' } });
        fireEvent.change(timeSelect, { target: { value: '18:00' } });
        fireEvent.change(guestsInput, { target: { value: '3' } });
        fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });

        fireEvent.click(submitButton);

        expect(screen.getByText(/reservation confirmed/i)).toBeInTheDocument();
    });
});
