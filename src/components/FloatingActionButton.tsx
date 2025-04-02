import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { stylesFloatingActionButton } from '../styles/feedStyles';

type FloatingActionButtonProps = {
  onPress: () => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={stylesFloatingActionButton.button} onPress={onPress}>
      <AntDesign name="plus" size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;