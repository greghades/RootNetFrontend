import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ForgotPasswordOneScreen from '../screens/forgotPasswordOneScreen';
import ForgotPasswordTwoScreen from '../screens/forgotPasswordTwoScreen';
import ForgotPasswordThreeScreen from '../screens/forgotPasswordThreeScreen';
import FeedScreen from '../screens/feedScreen';
import { COLORS } from '../styles/colors';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background, // Fondo del encabezado igual al fondo de la pantalla
        },
        headerTintColor: COLORS.text, // Color del botón de regresar (blanco)
        headerTitleStyle: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }} // Ocultar el encabezado en WelcomeScreen
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="ForgotOne"
        component={ForgotPasswordOneScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="ForgotTwo"
        component={ForgotPasswordTwoScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="ForgotThree"
        component={ForgotPasswordThreeScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;