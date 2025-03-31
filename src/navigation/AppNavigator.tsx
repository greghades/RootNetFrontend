import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ForgotPasswordOneScreen from '../screens/forgotPasswordOneScreen';
import ForgotPasswordTwoScreen from '../screens/forgotPasswordTwoScreen';
import ForgotPasswordThreeScreen from '../screens/forgotPasswordThreeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotOne" component={ForgotPasswordOneScreen} />
        <Stack.Screen name="ForgotTwo" component={ForgotPasswordTwoScreen} />
        <Stack.Screen name="ForgotThree" component={ForgotPasswordThreeScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;