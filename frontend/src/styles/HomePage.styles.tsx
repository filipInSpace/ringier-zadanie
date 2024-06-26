import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const ConversionResultContainer = styled.div`
  margin-top: 20px;
`;
