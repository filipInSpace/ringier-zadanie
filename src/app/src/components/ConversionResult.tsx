import React from 'react';
import { StyledList, StyledListItem } from '../styles/ConversionResult.styles';
import ListItemText from '@mui/material/ListItemText';

interface ConversionResultProps {
  conversionResult: { [key: string]: number };
}

const ConversionResult: React.FC<ConversionResultProps> = ({ conversionResult }) => {
  if (!conversionResult || typeof conversionResult !== 'object' || Object.keys(conversionResult).length === 0) {
    return <div>No valid conversion result available</div>;
  }

  return (
    <div>
      <h2>Conversion :</h2>
      <StyledList dense disablePadding>
        {Object.entries(conversionResult).map(([currency, rate]) => (
          <StyledListItem key={currency}>
            <ListItemText primary={`${currency}: ${rate}`} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  );
};

export default ConversionResult;
