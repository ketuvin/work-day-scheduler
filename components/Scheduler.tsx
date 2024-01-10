import React from 'react';
import Header from './Header';
import TimeBlock from './TimeBlock';

const Scheduler: React.FC = () => {
  const businessHours = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="grid grid-cols-1">
        {businessHours.map((time) => (
          <TimeBlock key={time} time={time} />
        ))}
      </div>
    </div>
  );
};

export default Scheduler;