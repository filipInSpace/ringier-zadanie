import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Title, FormContainer, ConversionResultContainer } from '../styles/HomePage.styles';
import CurrencySelector from '../components/CurrencySelect';
import HistoryDatePicker from '../components/DatePicker';
import CustomButton from '../components/CustomButton';
import ConversionResult from '../components/ConversionResult';
import { DefaultApi, ApiRatesCurrencyDateGetRequest } from '../api_client/apis/DefaultApi';

interface FormData {
  selectedCurrency: string;
  selectedDate: Date | null;
}

const HomePage: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      selectedCurrency: 'USD',
      selectedDate: new Date(),
    },
  });

  const [conversionRates, setConversionRates] = useState<{ [key: string]: number }>({});
  const [conversionResult, setConversionResult] = useState<{ [key: string]: number }>({});
  const [showConversionResult, setShowConversionResult] = useState(false);

  useEffect(() => {
    fetchData('USD', new Date());
  }, []);

  const fetchData = (currency: string, date: Date | null) => {
    if (!date) return;

    const api = new DefaultApi();
    const requestParameters: ApiRatesCurrencyDateGetRequest = {
      currency,
      date: date.toISOString().split('T')[0],
    };

    api.apiRatesCurrencyDateGet(requestParameters)
      .then(response => {
        setConversionRates(response);
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`);
      });
  };

  const navigate = useNavigate();

  const handleRouteToExtremes = () => {
  navigate('/extremes');
};

  const onSubmit = (data: FormData) => {
    fetchData(data.selectedCurrency, data.selectedDate);

    const api = new DefaultApi();
    const requestParameters: ApiRatesCurrencyDateGetRequest = {
      currency: data.selectedCurrency,
      date: data.selectedDate ? data.selectedDate.toISOString().split('T')[0] : '',
    };

    api.apiRatesCurrencyDateGet(requestParameters)
      .then(response => {
        setConversionResult(response);
        setShowConversionResult(true);
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`);
      });
  };

  return (
    <Container>
      <Title>Currency Exchange App</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <Controller
            name="selectedCurrency"
            control={control}
            render={({ field }) => (
              <CurrencySelector
                conversionRates={conversionRates}
                selectedCurrency={field.value}
                handleCurrencyChange={(event) => setValue('selectedCurrency', event.target.value)}
              />
            )}
          />
          <Controller
            name="selectedDate"
            control={control}
            render={({ field }) => (
              <HistoryDatePicker
                label="Select a date"
                value={field.value}
                onChange={(newDate) => setValue('selectedDate', newDate)}
              />
            )}
          />
          <CustomButton onClick={handleSubmit(onSubmit)} color="primary" text="Submit" />
          <CustomButton onClick={handleRouteToExtremes} color="secondary" text="Find Extremes" />
        </FormContainer>
      </form>
      {showConversionResult && (
        <ConversionResultContainer>
          <ConversionResult conversionResult={conversionResult} />
        </ConversionResultContainer>
      )}
    </Container>
  );
};

export default HomePage;
