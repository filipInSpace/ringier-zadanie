import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export const StyledList = styled(List)`
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 400px;
  overflow-y: auto;
`;


export const StyledListItem = styled(ListItem)`
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
