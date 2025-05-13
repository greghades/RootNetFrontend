import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, View } from 'react-native'; // Añadimos View para centrar el logo
import Logo from "../assets/images/logo-header.png";
import { COLORS } from "../styles/colors";
import EditUserScreen from "../screens/editUserScreen";
import FeedScreen from "../screens/feedScreen";
import ForgotPasswordOneScreen from "../screens/forgotPasswordOneScreen";
import ForgotPasswordThreeScreen from "../screens/forgotPasswordThreeScreen";
import ForgotPasswordTwoScreen from "../screens/forgotPasswordTwoScreen";
import LoginScreen from "../screens/loginScreen";
import MyPostsUserScreen from "../screens/myPostsUserScreen";
import EditPostsUserScreen from "../screens/editPostsUserScreen";
import SettingsScreen from "../screens/settingsScreen";
import PasswordUserScreen from "../screens/passwordUserScreen";
import PilotsUserScreen from "../screens/pilotsUserScreen";
import RegisterScreen from "../screens/registerScreen";
import CreatePostScreen from "../screens/createPostScreen";
import FavoritesScreen from '../screens/favoritesScreen';
import SearchScreen from '../screens/searchScreen'; 
import ProfileScreen from "../screens/profileScreen";

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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image
              source={Logo}
              style={{ width: 120, height: 65, resizeMode: 'contain' }}
            />
          </View>
        ),
        headerTitleAlign: 'center', // Centrar el título (logo) en el header
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotOne"
        component={ForgotPasswordOneScreen}
      />
      <Stack.Screen
        name="ForgotTwo"
        component={ForgotPasswordTwoScreen}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotThree"
        component={ForgotPasswordThreeScreen}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="MyPosts"
        component={MyPostsUserScreen}
      />
      <Stack.Screen
        name="EditPosts"
        component={EditPostsUserScreen}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
      />
      <Stack.Screen
        name="PasswordUser"
        component={PasswordUserScreen}
      />
      <Stack.Screen
        name="PilotsUser"
        component={PilotsUserScreen}
      />
    
    </Stack.Navigator>
  );
};

export default AppNavigator;