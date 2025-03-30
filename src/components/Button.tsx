import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

// Props para el componente Button
type ButtonProps = {
  onPress: () => void;
  title: string;
  style?: object; // Estilo personalizado para el botón
  textStyle?: object; // Estilo personalizado para el texto
};

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;