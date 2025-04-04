import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from '../styles/colors';
import { stylesBottomNavBar } from '../styles/feedStyles';

const BottomNavBar: React.FC = () => {
  return (
    <View style={stylesBottomNavBar.container}>
      <TouchableOpacity style={stylesBottomNavBar.navItem}>
      <Octicons name="home" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <TouchableOpacity style={stylesBottomNavBar.navItem}>
        <AntDesign name="search1" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <TouchableOpacity style={stylesBottomNavBar.navItem}>
      <Octicons name="bookmark" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <TouchableOpacity style={stylesBottomNavBar.navItem}>
        <AntDesign name="user" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );
};


export default BottomNavBar;