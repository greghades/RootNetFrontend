import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/globalStyles';
import Button from '../components/Button';
import ButtonContainer from '../components/ButtonContainer';
const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={[styles.container, styles.container]}>
          <Image
            source={require('../assets/images/logo.jpg')}
            style={styles.logo}
          />
          <Text style={[styles.title, styles.title]}>
            Te damos la {'\n'} bienvenida
          </Text>
          <Text style={[styles.subtitle, styles.subtitle]}>
            Conecta con los mejores dentro y fuera de tu país, aquí no tenemos fronteras.
          </Text>
    
          <ButtonContainer>
            <Button
              onPress={() => navigation.navigate('Login')}
              title="Acceder"
              style={styles.accessButton}
              textStyle={styles.accessText}
            />
            <Button
              onPress={() => navigation.navigate('Register')}
              title="Registrarse"
              style={styles.registerButton}
              textStyle={styles.registerText}
            />
          </ButtonContainer>
        </View>
      );
};


export default WelcomeScreen;