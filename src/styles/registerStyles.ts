import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 30,
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 28,
        color: COLORS.text,
        marginBottom: 20,
        textAlign: "left",
        marginLeft: 8,
    },
    subtitle: {
        color: COLORS.secondaryText,
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
        color: COLORS.text,
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.input,
        color: COLORS.text,
        padding: 12,
        borderRadius: 10,
        fontFamily: "Roboto",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.input,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
    icon: {
        marginLeft: 10,
        alignSelf: "center",
    },
    registerButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    registerText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto",
    },
    
    forgotText: {
        fontFamily: "Roboto",
        color: COLORS.textLittle,
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
});
