import React from 'react';
import { StyledButton } from '../styles/SubmitButton.styles';

interface CustomButtonProps {
  onClick: () => void;
  color?: 'primary' | 'secondary';
  text?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, color = 'primary', text = 'Submit' }) => {
  return (
    <StyledButton variant="contained" color={color} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default CustomButton;
