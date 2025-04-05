import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Props for component Button
type ButtonProps = {
  onPress: () => void;
  title: string;
  style?: object;
  textStyle?: object;
};

const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <Text style={[textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;