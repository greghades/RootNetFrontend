

import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1F39",
        padding: 30,
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 28,
        color: "#fff",
        marginBottom: 20,
        textAlign: "left",
        marginLeft: 8,
    },
    subtitle: {
        color: "#ccc",
        marginBottom: 30,
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 15,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    label: {
        fontFamily: "Roboto",
        color: "#fff",
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    input: {
        backgroundColor: "rgb(62, 62, 85)",
        color: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        fontFamily: "Roboto",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgb(62, 62, 85)",
        borderRadius: 10,
        justifyContent: "space-between",
    },
    icon: {
        marginRight: 10,
      },
    registerButton: {
        backgroundColor: "#3D5CFF",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Roboto",
    },
    
    forgotText: {
        fontFamily: "Roboto",
        color: "#bbb",
        textAlign: "center",
        marginVertical: 20,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    loginText: {
        fontFamily: "Roboto",
        color: COLORS.text,
      },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    loginButton: {
          backgroundColor: COLORS.primary,
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
      },
});
