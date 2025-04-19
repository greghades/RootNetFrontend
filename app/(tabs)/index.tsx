import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StatusBar, View } from "react-native";
import AppNavigator from "../../src/navigation/AppNavigator";
import * as NavigationBar from 'expo-navigation-bar';

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Carry - font
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("../../src/assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      // Hide the navigation bar
      
      // Change the background color to black when displayed
      NavigationBar.setBackgroundColorAsync('#000000');
      
      // Mostrar temporalmente al deslizar desde abajo
      NavigationBar.setBehaviorAsync('overlay-swipe');
      
      // Light buttons for dark background
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  // Carry
  if (!fontLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1F1F39",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#111111" barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;
