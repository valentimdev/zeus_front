import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

function DayPicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);
  const [displayMonth, setDisplayMonth] = useState<Date>(date || new Date());

  useEffect(() => {
    if (date) {
      setDisplayMonth(date);
    }
  }, [date]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex w-full">
          <Button
            type="button"
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
          >
            <CalendarIcon />
            {date ? format(date, 'dd/MM/yyyy') : <span>Pick a date</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        side="top"
        sideOffset={4}
        avoidCollisions={false}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
            setOpen(false);
          }}
          toDate={new Date()}
          disabled={{ after: new Date() }}
          fixedWeeks
          // toMonth={new Date()}
          // month={date}
          month={displayMonth}
          onMonthChange={setDisplayMonth}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DayPicker;
