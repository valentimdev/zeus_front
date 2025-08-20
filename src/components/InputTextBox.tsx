import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Label } from './ui/label';

function InputTextBox() {
  return (
    <div className='w-full border border bg-amber-100'>
      <Label htmlFor="email">XXXX</Label>
      <Input className="w-full"></Input>
    </div>
  );
}

export { InputTextBox };
