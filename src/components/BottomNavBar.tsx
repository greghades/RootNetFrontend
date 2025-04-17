import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import { COLORS } from '../styles/colors';
import { stylesBottomNavBar } from '../styles/feedStyles';

const BottomNavBar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={stylesBottomNavBar.container}>
      <TouchableOpacity 
        style={stylesBottomNavBar.navItem} 
        onPress={() => navigation.navigate("Feed")}
      >
        <Octicons name="home" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={stylesBottomNavBar.navItem} 
        onPress={() => navigation.navigate("Search")}
      >
        <AntDesign name="search1" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={stylesBottomNavBar.navItem} 
        onPress={() => navigation.navigate("Bookmarks")}
      >
        <Octicons name="bookmark" size={24} color={COLORS.text} />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={stylesBottomNavBar.navItem} 
        onPress={() => navigation.navigate("MyUser")}
      >
        <AntDesign name="user" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;