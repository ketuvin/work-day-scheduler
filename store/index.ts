import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Events {
  time: string;
  event: string;
};

type EventStore = {
  events: Events[];
  setEvent: (time: string, event: string) => void;
};

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      setEvent: (time, event) => {
        set((state) => {
          const existingEventIndex = state.events.findIndex((e) => e.time === time);
          const updatedEvents =
            existingEventIndex !== -1
              ? [
                  ...state.events.slice(0, existingEventIndex),
                  { time, event },
                  ...state.events.slice(existingEventIndex + 1),
                ]
              : [...state.events, { time, event }];

          return { events: updatedEvents };
        });
      },
    }),
    {
      name: 'events-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);