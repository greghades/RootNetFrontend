import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../styles/colors';
import WelcomeScreen from '../screens/welcomeScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ForgotPasswordOneScreen from '../screens/forgotPasswordOneScreen';
import ForgotPasswordTwoScreen from '../screens/forgotPasswordTwoScreen';
import ForgotPasswordThreeScreen from '../screens/forgotPasswordThreeScreen';
import FeedScreen from '../screens/feedScreen';
import MyUser from '../screens/myUserScreen';
import MyPostsUserScreen from '../screens/myPostsUserScreen';
import EditUserScreen from '../screens/editUserScreen';
import PasswordUserScreen from '../screens/passwordUserScreen';
import PilotsUserScreen from '../screens/pilotsUserScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background, // Header background equal to screen background
        },
        headerTintColor: COLORS.text, // Back button color (white)
        headerTitleStyle: {
          fontFamily: 'Roboto',
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }} // Hide the header in WelcomeScreen
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
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="MyUser"
        component={MyUser}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="MyPosts"
        component={MyPostsUserScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="PasswordUser"
        component={PasswordUserScreen}
        options={{
          headerTitle: '', 
        }}
      />
      <Stack.Screen
        name="PilotsUser"
        component={PilotsUserScreen}
        options={{
          headerTitle: '', 
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;