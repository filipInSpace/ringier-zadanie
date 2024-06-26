import React from 'react';
import { StyledFormControl } from '../styles/CurrencySelector.styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  conversionRates: { [key: string]: number };
  selectedCurrency: string;
  handleCurrencyChange: (event: SelectChangeEvent) => void;
}

const CurrencySelector: React.FC<Props> = ({ conversionRates, selectedCurrency, handleCurrencyChange }) => {
  const currencyCodes = Object.keys(conversionRates);

  return (
    <StyledFormControl>
      <InputLabel id="currency-selector-label">Currency</InputLabel>
      <Select
        labelId="currency-selector-label"
        id="currency-selector"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        {currencyCodes.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default CurrencySelector;
