import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { COLORS } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons'; // Para el ícono de verificación y usuario
import { styles } from '../styles/searchStyles'; // Asegúrate de que la ruta sea correcta
// Datos  para los resultados de búsqueda inventados 
const searchResults = [
  {
    id: '1',
    username: 'Tibitha P.',
    handle: '@mis_potter',
    role: 'Professional Back End',
    relatedUser: 'Robert Connie',
    isVerified: true,
  },
  {
    id: '2',
    username: 'Gregorio P.',
    handle: '@mis_potter',
    role: 'Professional Frontend',
    relatedUser: 'Robert Connie',
    isVerified: true,
  },
  {
    id: '3',
    username: 'Ricardo D.',
    handle: '@mis_potter',
    role: 'Professional Developer',
    relatedUser: 'Robert Connie',
    isVerified: true,
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image
        source={require('../assets/images/default-profile.jpg')}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{item.username}</Text>
          {item.isVerified && (
            <FontAwesome name="check-circle" size={16} color="#1DA1F2" style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.handle}>{item.handle}</Text>
      </View>
      <View style={styles.roleContainer}>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.relatedUserContainer}>
          <FontAwesome name="user" size={14} color={COLORS.secondaryText} style={styles.userIcon} />
          <Text style={styles.relatedUser}>{item.relatedUser}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Campo de búsqueda */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar"
        placeholderTextColor={COLORS.secondaryText}
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
      />

      {/* Lista de resultados */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsHeader}>Resultados</Text>
        <FlatList
          data={searchResults}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron resultados.</Text>
          }
        />
      </View>

      {/* Barra de navegación inferior */}
      <BottomNavBar activeScreen="Search" />
    </View>
  );
};


export default SearchScreen;