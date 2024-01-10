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

  useEffect(() => {
    const existingEvent = events.find((event) => event.time === time);
    setEventDescription(existingEvent?.event || '');
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

  const currentTime = dayjs();
  const blockTime = dayjs().set('hour', parseInt(time.split(':')[0], 10)).set('minute', 0);
  const isPast = currentTime.isAfter(blockTime, 'hour');
  const isPresent = currentTime.isSame(blockTime, 'hour');

  return (
    <div className="time-block rounded-md cursor-pointer grid grid-cols-12 w-full h-32">
      <div className="col-span-1 flex items-center justify-end w-full border border-y-1 border-x-0 border-dashed border-black">
        <span className="font-bold">{time}</span>
      </div>
      <div className={`col-span-10 border border-white ${isPast ? 'bg-neutral-300' : isPresent ? 'bg-red-400' : 'bg-green-400'}`}>
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