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
      borderRadius: 40,
      marginRight: 10,
    },
    userInfo: {
      flex: 1,
    },
    username: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
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
    commentsSection: {
      marginTop: 10,
    },
    commentContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    commentProfileImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 10,
    },
    commentContent: {
      flex: 1,
      backgroundColor: COLORS.background,
      borderRadius: 15,
      padding: 10,
    },
    commentText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.text,
    },
    noCommentsText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.secondaryText,
      marginBottom: 10,
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingVertical: 5,
    },
    commentInput: {
      flex: 1,
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.text,
      backgroundColor: COLORS.background,
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginRight: 10,
    },
    submitButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    submitButtonText: {
      fontFamily: 'Roboto',
      fontSize: 14,
      color: COLORS.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: COLORS.cardBackground,
      margin: 20,
      borderRadius: 10,
      paddingVertical: 10,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
    },
    modalOptionText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
      marginLeft: 10,
    },
    modalOptionTextDelete: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: '#CE395F', // Texto rojo para "Eliminar Publicación"
      marginLeft: 10,
    },
    modalCancelButton: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: COLORS.secondaryText,
      alignItems: 'center',
    },
    modalCancelText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      color: COLORS.text,
      fontWeight: 'bold',
    },
  });

export const feedStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingTop: 25, // Space for the status bar
    },
    scrollContainer: {
      paddingBottom: 80, // Space for navigation bar and floating button
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
      bottom: 80, // Adjusted to be above the navigation bar
      right: 20,
      backgroundColor: COLORS.primary,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // Shadow on Android
      shadowColor: '#000', // Shadow on iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
  });

  export const stylesCommentInput = StyleSheet.create({
    commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 5,
  },
  commentProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  submitButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: COLORS.text,
  },
  
  });