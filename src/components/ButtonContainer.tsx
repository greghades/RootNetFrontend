import React from 'react';
import { View } from 'react-native';

import { styles } from '../styles/globalStyles';
// Props for component ButtonContainer
type ButtonContainerProps = {
  children: React.ReactNode;
  style?: object;
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children, style }) => {
  return <View style={[styles.buttonContainer, style]}>{children}</View>;
};

export default ButtonContainer;