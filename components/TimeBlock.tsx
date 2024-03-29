import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useEventStore } from '../store';
import SaveIcon from './SaveIcon';

interface TimeBlockProps {
  time: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time }) => {
  const { events, setEvent } = useEventStore();
  const [eventDescription, setEventDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPast, setIsPast] = useState<boolean>(false);
  const [isPresent, setIsPresent] = useState<boolean>(false);

  useEffect(() => {
    const existingEvent = events.find((event) => event.time === time);
    setEventDescription(existingEvent?.event || '');

    // Set time-related states
    const currentTime = dayjs();
    const blockTime = dayjs().set('hour', parseInt(time.split(':')[0], 10)).set('minute', 0);
    setIsPast(currentTime.isAfter(blockTime, 'hour'));
    setIsPresent(currentTime.isSame(blockTime, 'hour'));
  }, [events, time]);

  const handleSave = () => {
    if (eventDescription.trim() === '') {
      // If textarea is empty, clear the event
      setEvent(time, '');
    } else {
      setEvent(time, eventDescription);
    }
    setIsEditing(false);
  };

  return (
    <div className="time-block rounded-md cursor-pointer grid grid-cols-6 md:grid-cols-12 w-full h-20 md:h-32">
      <div className="col-span-1 flex items-center justify-end w-full border border-y-1 border-x-0 border-dashed border-black">
        <span className="font-bold text-xs md:text-base">{time}</span>
      </div>
      <div className={`${isPast ? 'bg-neutral-300' : isPresent ? 'bg-red-400' : 'bg-green-400'} col-span-4 md:col-span-10 text-sm md:text-base border border-white`}>
        {isEditing ? (
          <textarea placeholder="Enter event..." value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} className={`border rounded p-2 w-full h-full ${isPast ? 'bg-neutral-300' : isPresent ? 'bg-red-400' : 'bg-green-400'}`} />
        ) : (
          <div className="m-2 h-full" onClick={() => setIsEditing(true)}>{eventDescription}</div>
        )}
      </div>
      <div className="col-span-1 flex justify-center border border-white">
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-r-3xl w-full h-full">
          <span className="w-full flex justify-center">
            <SaveIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TimeBlock;