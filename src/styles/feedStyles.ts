// Estilos para el componente
import {StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const styles = StyleSheet.create({
    container: {
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    header: {
      flexDirection: 'row',
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
    username: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
      fontWeight: 'bold',
    },
    handle: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.secondaryText,
    },
    date: {
      fontFamily: 'Roboto',
      fontSize: 12,
      color: COLORS.secondaryText,
    },
    content: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
      marginBottom: 10,
    },
    postImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    actions: {
      flexDirection: 'row',
      marginTop: 10,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 25,
    },
    actionText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.secondaryText,
      marginLeft: 5,
    },
    divider: {
      height: 1,
      backgroundColor: COLORS.secondaryText,
      opacity: 0.2,
      marginTop: 15,
    },
  });

export const feedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: 25, // Espacio para la barra de estado
    },
    scrollContainer: {
      paddingBottom: 80, // Espacio para la barra de navegación y el botón flotante
    },
  });

  export const stylesBottomNavBar = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#111111",
        paddingVertical: 10,
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      navItem: {
        padding: 10,
      },
});
  export const stylesFloatingActionButton = StyleSheet.create({
    button: {
      position: 'absolute',
      bottom: 80, // Ajustado para que esté por encima de la barra de navegación
      right: 20,
      backgroundColor: COLORS.primary,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Sombra en Android
      shadowColor: '#000', // Sombra en iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });