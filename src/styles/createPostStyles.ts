// Estilos
import { StyleSheet } from 'react-native';
import { COLORS } from './colors'; // Asegúrate de que la ruta sea correcta 

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondaryText,
      
    },
    cancelButton: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: "#4C9EEB",
    },
    publishButton: {
      backgroundColor: "#B9DCF7",
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
    },
    publishButtonText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: "#1F1F39",
    },
    textInput: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 19,
      color: COLORS.text,
      padding: 15,
      textAlignVertical: 'top',
    },
    inputContainer: {
        flexDirection: 'row', // Alinea la imagen y el TextInput horizontalmente
        alignItems: 'flex-start', // Alinea los elementos al inicio verticalmente
        padding: 15,
        flex: 1, // Ocupa el espacio disponible
      },
      profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
        marginTop: 8, // Espacio superior para alinear con el TextInput
      },
    iconButton: {
      marginRight: 20,
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderTopWidth: 1,
      borderTopColor: COLORS.secondaryText,
    },

  });