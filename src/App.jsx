import React, { useState } from 'react';
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import ChuChuTrain from '../src/assets/ChuChuTrain.gif';
import Giff from '../src/assets/Giff1.gif';
import PopUp from './PopUp'; // Import PopUp component

const App = () => {
  const rows = [
    ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
    ['S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14'],
    ['S15', 'S16', 'S17', 'S18', 'S19', 'S20', 'S21'],
    ['S22', 'S23', 'S24', 'S25', 'S26', 'S27', 'S28'],
    ['S29', 'S30', 'S31', 'S32', 'S33', 'S34', 'S35'],
    ['S36', 'S37', 'S38', 'S39', 'S40', 'S41', 'S42'],
    ['S43', 'S44', 'S45', 'S46', 'S47', 'S48', 'S49'],
    ['S50', 'S51', 'S52', 'S53', 'S54', 'S55', 'S56'],
    ['S57', 'S58', 'S59', 'S60', 'S61', 'S62', 'S63'],
    ['S64', 'S65', 'S66', 'S67', 'S68', 'S69', 'S70'],
    ['S71', 'S72', 'S73', 'S74', 'S75', 'S76', 'S77'],
    ['S78', 'S79', 'S80']
  ];

  const [seats, setSeats] = useState(
    rows.map(row => row.map(seat => ({ seat, status: 'unbooked' })))
  );
  const [seatsToBook, setSeatsToBook] = useState(1);
  const [totalSeatsBooked, setTotalSeatsBooked] = useState(0);
  const [popUpMessage, setPopUpMessage] = useState(null); // Track the pop-up message

  const handleBooking = () => {
    if (seatsToBook < 1 || seatsToBook > 7) {
      setPopUpMessage('You can only book between 1 to 7 seats');
      return;
    }

    let seatsRemaining = seatsToBook;
    const newSeats = [...seats];
    let successfullyBooked = 0;

    outerLoop: for (let rowIndex = 0; rowIndex < newSeats.length; rowIndex++) {
      const row = newSeats[rowIndex];
      const unbookedSeats = row.filter(seat => seat.status === 'unbooked');

      if (unbookedSeats.length >= seatsRemaining) {
        for (let colIndex = 0; colIndex < row.length; colIndex++) {
          if (row[colIndex].status === 'unbooked' && seatsRemaining > 0) {
            row[colIndex].status = 'booked';
            seatsRemaining--;
            successfullyBooked++;
            if (seatsRemaining === 0) break outerLoop;
          }
        }
      }
    }

    if (successfullyBooked === 0) {
      setPopUpMessage('No available seats to book!');
    }

    const newTotalSeatsBooked = totalSeatsBooked + successfullyBooked;
    if (newTotalSeatsBooked > 80) {
      setPopUpMessage('Cannot book more than 80 seats.');
      return;
    }

    if (successfullyBooked > 0) {
      setSeats(newSeats);
      setTotalSeatsBooked(newTotalSeatsBooked);
    }
  };

  const handleReset = () => {
    setSeats(
      rows.map(row => row.map(seat => ({ seat, status: 'unbooked' })))
    );
    setTotalSeatsBooked(0);
    setPopUpMessage(null); // Reset the pop-up message on reset
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, Math.min(7, e.target.value));
    setSeatsToBook(value);
  };

  const totalUnbookedSeats = seats.reduce((count, row) => {
    return count + row.filter(seat => seat.status === 'unbooked').length;
  }, 0);

  return (
    <div className="flex flex-col lg:flex-row justify-between p-8 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <div className="relative w-full lg:w-2/3 p-4 bg-white shadow-xl rounded-lg">
      <h2 className="text-lg md:text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 flex items-center">
        Available Seats
    <img className="w-36 h-20 ml-2" src={ChuChuTrain} alt="Train" />
  </h2>
        <div>
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-1">
              {row.map(({ seat, status }, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-12 h-12 md:w-12 md:h-12 flex flex-col justify-center items-center cursor-pointer mx-1 border-2 shadow-md $ {
                    status === 'booked'
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                  } text-white rounded-lg`}
                >
                  <MdAirlineSeatReclineExtra className={`text-lg md:text-2xl ${
                    status === 'booked'
                      ? 'text-yellow-400'
                      : 'text-gray-400'
                  }`} />
                  <span className="text-xs text-black md:text-sm font-medium mt-1">{seat}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <img src={Giff} alt="GIF" className="absolute bottom-4 right-4 w-20 h-20 md:w-52 md:h-52" />
      </div>

      <div className="w-full lg:w-1/3 p-6 border-l-2 border-gray-300 bg-white shadow-xl rounded-lg mt-6 lg:mt-0">
        <h2 className="text-lg md:text-2xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Booking Information</h2>
        <div>
          <label className="block mb-4">
            <span className="text-sm md:text-lg font-medium">Number of seats to book:</span>
            <input
              type="number"
              value={seatsToBook}
              onChange={handleInputChange}
              className="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              min="1"
              max="7"
            />
          </label>
          <button
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold p-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Book Seats
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold p-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-200 mt-4"
          >
            Reset Seats
          </button>
          <div className="mt-6">
            <p className="font-bold text-sm md:text-lg text-gray-700">Total Seats Selected: <span className="text-blue-500">{totalSeatsBooked}</span></p>
            <p className="font-bold text-sm md:text-lg text-gray-700">Total Seats Left: <span className="text-green-500">{totalUnbookedSeats}</span></p>
          </div>
        </div>
      </div>

      {/* Display PopUp if there's a message */}
      {popUpMessage && <PopUp message={popUpMessage} onClose={() => setPopUpMessage(null)} />}
    </div>
  );
};

export default App;
