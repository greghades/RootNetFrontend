import React from 'react';
import { View } from 'react-native';

import { styles } from '../styles/globalStyles'; // Asegúrate de que la ruta sea correcta
// Props para el componente ButtonContainer
type ButtonContainerProps = {
  children: React.ReactNode;
  style?: object; // Estilo personalizado para el contenedor
};

const ButtonContainer: React.FC<ButtonContainerProps> = ({ children, style }) => {
  return <View style={[styles.buttonContainer, style]}>{children}</View>;
};

// Estilos para el contenedor de botone

export default ButtonContainer;