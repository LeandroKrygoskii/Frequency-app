import styled from 'styled-components/native';
import { theme } from '../../styles/theme';
export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-Items: center;
  background-color: #212028;
`;

export const Footer = styled.View`
 width: 120px;
 height: 120px;
 position: absolute;
 justify-content: space-between;
 width: 100%;
 flex-direction: row;
 bottom: 35px;
`;

export const Btn = styled.TouchableOpacity`
 position: relative;
 
`;