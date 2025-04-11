import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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
import { COLORS } from "../styles/colors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background, // Header background equal to screen background
        },
        headerTintColor: COLORS.text, // Back button color (white)
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ForgotOne"
        component={ForgotPasswordOneScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ForgotTwo"
        component={ForgotPasswordTwoScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="ForgotThree"
        component={ForgotPasswordThreeScreen}
        options={{
          headerTitle: "",
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
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="MyPosts"
        component={MyPostsUserScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="PasswordUser"
        component={PasswordUserScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="PilotsUser"
        component={PilotsUserScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
