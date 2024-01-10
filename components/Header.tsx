import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const Header: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      setCurrentDateTime(dayjs().format('dddd, MMMM D, YYYY h:mm A'));
    };

    // Update the date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mb-8">
      <h1 className="text-4xl font-bold mb-2">Work Day Scheduler</h1>
      <p className="text-lg">{currentDateTime}</p>
    </div>
  );
};

export default Header;