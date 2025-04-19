import { StyleSheet } from 'react-native';
import { COLORS } from './colors'; // Asegúrate de que la ruta sea correcta
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    searchInput: {
      backgroundColor: COLORS.cardBackground,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      margin: 15,
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
    },
    resultsContainer: {
      flex: 1,
      paddingHorizontal: 15,
      paddingBottom: 80, // Espacio para la barra de navegación inferior
    },
    resultsHeader: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.text,
      marginBottom: 10,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#2A2F3A', // Fondo oscuro para el contenedor
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
    },
    profileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    username: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.text,
    },
    verifiedIcon: {
      marginLeft: 5,
    },
    handle: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.secondaryText,
    },
    roleContainer: {
      alignItems: 'flex-end',
    },
    role: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.text,
    },
    relatedUserContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    userIcon: {
      marginRight: 5,
    },
    relatedUser: {
      fontFamily: 'Roboto',
      fontSize: 12,
      color: COLORS.secondaryText,
    },
    emptyText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.secondaryText,
      textAlign: 'center',
      marginTop: 20,
    },
  });