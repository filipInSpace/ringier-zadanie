import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Title, FormContainer, ButtonContainer } from '../styles/ExtremesPage.styles';
import CurrencySelector from '../components/CurrencySelect';
import HistoryDatePicker from '../components/DatePicker';
import CustomButton from '../components/CustomButton';
import { DefaultApi } from '../api_client/apis/DefaultApi';
import MinMaxRatesDisplay from '../components/MinMaxRatesDisplay';

interface FormData {
  selectedCurrency1: string;
  selectedCurrency2: string;
  startDate: Date | null;
  endDate: Date | null;
}

const ExtremesPage: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      selectedCurrency1: 'USD',
      selectedCurrency2: 'EUR',
      startDate: null,
      endDate: null,
    },
  });

  const [conversionRates1, setConversionRates1] = useState<{ [key: string]: number }>({});
  const [conversionRates2, setConversionRates2] = useState<{ [key: string]: number }>({});
  const [maxRate, setMaxRate] = useState<number | null>(null);
  const [minRate, setMinRate] = useState<number | null>(null);
  const [maxRateDate, setMaxRateDate] = useState<string | null>(null);
  const [minRateDate, setMinRateDate] = useState<string | null>(null);

  const selectedCurrency1 = watch("selectedCurrency1");
  const selectedCurrency2 = watch("selectedCurrency2");

  useEffect(() => {
    const fetchInitialData = async () => {
      const api = new DefaultApi();

      try {
        const response1 = await api.apiRatesCurrencyDateGet({
          currency: selectedCurrency1,
          date: new Date().toISOString().split('T')[0],
        });
        const response2 = await api.apiRatesCurrencyDateGet({
          currency: selectedCurrency2,
          date: new Date().toISOString().split('T')[0],
        });

        setConversionRates1(response1);
        setConversionRates2(response2);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchInitialData();
  }, [selectedCurrency1, selectedCurrency2]);

  const fetchData = async (currency: string, date: Date | null) => {
    if (!date) return;

    const api = new DefaultApi();
    const requestParameters = {
      currency,
      date: date.toISOString().split('T')[0],
    };

    try {
      const response = await api.apiRatesCurrencyDateGet(requestParameters);
      return response;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  const onSubmit = async (data: FormData) => {
    const { selectedCurrency1, selectedCurrency2, startDate, endDate } = data;
    if (!startDate || !endDate) return;

    const dateRange: Date[] = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const promises1 = dateRange.map((date) => fetchData(selectedCurrency1, date));
    const promises2 = dateRange.map((date) => fetchData(selectedCurrency2, date));

    const responses1 = await Promise.all(promises1);
    const responses2 = await Promise.all(promises2);

    const rates1 = responses1.map((response, index) => ({
      date: dateRange[index].toISOString().split('T')[0],
      rate: response?.[selectedCurrency2] || 0,
    }));
    const rates2 = responses2.map((response, index) => ({
      date: dateRange[index].toISOString().split('T')[0],
      rate: response?.[selectedCurrency1] || 0,
    }));

    const allRates = [...rates1, ...rates2];

    const maxRateEntry = allRates.reduce((max, entry) => (entry.rate > max.rate ? entry : max), { date: '', rate: -Infinity });
    const minRateEntry = allRates.reduce((min, entry) => (entry.rate < min.rate ? entry : min), { date: '', rate: Infinity });

    setConversionRates1(responses1[responses1.length - 1] || {});
    setConversionRates2(responses2[responses2.length - 1] || {});

    setMaxRate(maxRateEntry.rate);
    setMinRate(minRateEntry.rate);
    setMaxRateDate(maxRateEntry.date);
    setMinRateDate(minRateEntry.date);
  };

  return (
    <Container>
      <Title>Find Extremes</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Controller
            name="selectedCurrency1"
            control={control}
            render={({ field }) => (
              <CurrencySelector
                conversionRates={conversionRates1}
                selectedCurrency={field.value}
                handleCurrencyChange={(event) => setValue('selectedCurrency1', event.target.value)}
              />
            )}
          />
          <Controller
            name="selectedCurrency2"
            control={control}
            render={({ field }) => (
              <CurrencySelector
                conversionRates={conversionRates2}
                selectedCurrency={field.value}
                handleCurrencyChange={(event) => setValue('selectedCurrency2', event.target.value)}
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <HistoryDatePicker
                label="Start Date"
                value={field.value}
                onChange={(newDate) => setValue('startDate', newDate)}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <HistoryDatePicker
                label="End Date"
                value={field.value}
                onChange={(newDate) => setValue('endDate', newDate)}
              />
            )}
          />
        </FormContainer>
        <ButtonContainer>
          <CustomButton onClick={handleSubmit(onSubmit)} color="primary" text="Submit" />
        </ButtonContainer>
      </form>
      {maxRate !== null && minRate !== null && (
        <MinMaxRatesDisplay
          maxRate={maxRate}
          maxRateDate={maxRateDate}
          minRate={minRate}
          minRateDate={minRateDate}
        />
      )}
    </Container>
  );
};

export default ExtremesPage;
