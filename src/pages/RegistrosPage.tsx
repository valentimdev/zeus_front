import React from 'react';
import DayPicker from '@/components/DayPicker';
import Combobox from '@/components/Combobox';
import { InputTextBox } from '@/components/InputTextBox';
import { Button } from '@/components/ui/button';

function RegistrosPage() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex flex-col items-center justify-center h-full w-[60%] gap-5 border border-amber-300">
      <Combobox />
      <DayPicker />
      <InputTextBox></InputTextBox>
      <InputTextBox></InputTextBox>
      <Button>Confirmar</Button>
    </div>
  );
}

export default RegistrosPage;
