import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
        borderRadius: 30,
        borderColor: COLORS.accent,
        borderWidth: 2,
        borderStyle: 'solid',

    },
    title: {
        fontFamily: "Roboto",
        fontSize: 35,
        padding: 30,
        fontWeight: 400,
        color: COLORS.text,
        marginBottom: 10,
        lineHeight: 40,
    },
    subtitle: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: COLORS.secondaryText,
        textAlign: "center",
        marginBottom: 30,
        paddingVertical: 0,
        paddingHorizontal: 30,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
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
    accessButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    accessText: {
        fontFamily: "Roboto",
        color: COLORS.text,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: COLORS.text,
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    registerText: {
        fontFamily: "Roboto",
        color: COLORS.background,
        fontSize: 16,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    loginText: {
        fontFamily: "Roboto",
        color: COLORS.text,
    },
});
