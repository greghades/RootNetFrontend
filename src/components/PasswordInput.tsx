import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { styles } from '../styles/registerStyles';
// Props para el componente PasswordInput
type PasswordInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  showPassword,
  setShowPassword,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondaryText}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AntDesign
            name={showPassword ? 'eye' : 'eyeo'}
            size={24}
            color={COLORS.secondaryText}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;