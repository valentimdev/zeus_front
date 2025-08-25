import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { type Dispatch, type SetStateAction } from 'react';

function DayPicker({date, setDate}: {date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined>>}) {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex w-full border border-amber-300'>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
          >
            <CalendarIcon />
            {date ? format(date, 'yyyy-MM-dd') : <span>Pick a date</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            setOpen(false);
          }}



        />
      </PopoverContent>
    </Popover>
  );
}

export default DayPicker;
