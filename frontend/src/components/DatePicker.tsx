import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface HistoryDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (newValue: Date | null) => void;
}

const HistoryDatePicker: React.FC<HistoryDatePickerProps> = ({ label, value, onChange }) => {
  const dayjsValue: Dayjs | null = value ? dayjs(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={dayjsValue}
        onChange={(newDate) => onChange(newDate ? newDate.toDate() : null)}
      />
    </LocalizationProvider>
  );
};

export default HistoryDatePicker;
