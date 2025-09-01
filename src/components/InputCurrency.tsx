import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import type { CurrencyInputProps } from 'react-currency-input-field';

const inputClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const InputCurrency = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onValueChange, ...props }, ref) => {
    const handleValueChange: CurrencyInputProps['onValueChange'] = (
      value,
      name,
      values
    ) => {
      if (values && values.float && values.float > 9999.99) {
        return;
      }
      if (onValueChange) {
        onValueChange(value, name, values);
      }
    };

    return (
      <CurrencyInput
        ref={ref}
        className={inputClassName}
        prefix="R$ "
        decimalSeparator=","
        groupSeparator="."
        decimalsLimit={2}
        allowNegativeValue={false}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        onValueChange={handleValueChange}
        {...props}
      />
    );
  }
);

InputCurrency.displayName = 'InputCurrency';

export default InputCurrency;
