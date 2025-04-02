import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import * as Font from "expo-font";
import AppNavigator from "../../src/navigation/AppNavigator";


const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Carry - font
  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto": require("../../src/assets/fonts/Roboto-VariableFont_wdth,wght.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
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
    <AppNavigator />
    
    </>
  );
};

export default App;