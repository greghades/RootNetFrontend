import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from 'react-native';
import logo from "../assets/images/logo-header.png";
import { COLORS } from "../styles/colors";
import EditUserScreen from "../screens/editUserScreen";
import FeedScreen from "../screens/feedScreen";
import ForgotPasswordOneScreen from "../screens/forgotPasswordOneScreen";
import ForgotPasswordThreeScreen from "../screens/forgotPasswordThreeScreen";
import ForgotPasswordTwoScreen from "../screens/forgotPasswordTwoScreen";
import LoginScreen from "../screens/loginScreen";
import MyPostsUserScreen from "../screens/myPostsUserScreen";
import MyUser from "../screens/myUserScreen";
import PasswordUserScreen from "../screens/passwordUserScreen";
import PilotsUserScreen from "../screens/pilotsUserScreen";
import RegisterScreen from "../screens/registerScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.background,
      },
      headerTintColor: COLORS.text,
      headerTitle: () => (
        <Image
          source={logo}
          style={{ width: 120, height: 40, resizeMode: 'contain' }}
        />
      ),
    }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 200, resizeMode: 'contain' }} />
          ),
          headerLeft: () => null,
          gestureEnabled: false, 
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="ForgotOne"
        component={ForgotPasswordOneScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="ForgotTwo"
        component={ForgotPasswordTwoScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="ForgotThree"
        component={ForgotPasswordThreeScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyUser"
        component={MyUser}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="MyPosts"
        component={MyPostsUserScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="PasswordUser"
        component={PasswordUserScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
      <Stack.Screen
        name="PilotsUser"
        component={PilotsUserScreen}
        options={{
          headerTitle: () => (
            <Image source={logo} style={{ width: 120, height: 40, marginLeft: 160, resizeMode: 'contain' }} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
