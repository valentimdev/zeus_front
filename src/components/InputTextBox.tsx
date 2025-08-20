import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Label } from './ui/label';

function InputTextBox() {
  return (
    <div>
      <Label htmlFor="email">XXXX</Label>
      <Input className="w-80"></Input>
    </div>
  );
}

export { InputTextBox };
