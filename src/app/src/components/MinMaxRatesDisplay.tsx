import React from 'react';
import { ConversionResultContainer, ResultText } from '../styles/MinMaxRatesDisplay.styles';

interface MinMaxRatesDisplayProps {
  maxRate: number | null;
  maxRateDate: string | null;
  minRate: number | null;
  minRateDate: string | null;
}

const MinMaxRatesDisplay: React.FC<MinMaxRatesDisplayProps> = ({
  maxRate,
  maxRateDate,
  minRate,
  minRateDate,
}) => {
  return (
    <ConversionResultContainer>
      <div>
        <ResultText>Maximum Rate: {maxRate}</ResultText>
        <ResultText>Date: {maxRateDate}</ResultText>
      </div>
      <div>
        <ResultText>Minimum Rate: {minRate}</ResultText>
        <ResultText>Date: {minRateDate}</ResultText>
      </div>
    </ConversionResultContainer>
  );
};

export default MinMaxRatesDisplay;
