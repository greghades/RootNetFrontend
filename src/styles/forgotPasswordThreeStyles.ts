import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const  styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
        justifyContent: "flex-start",
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 30,
        paddingVertical: 20,
        marginBottom: 0,
        color: COLORS.text,
    },
    subtitle: {
        color: COLORS.secondaryText,
        marginBottom: 30,
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 15,
        lineHeight: 20,
    },
    label: {
        fontFamily: "Roboto",
        color: COLORS.text,
        marginBottom: 15,
    },
    containerInput: {
        marginBottom: 30,
    },
    input: {
        fontFamily: "Roboto",
        backgroundColor: COLORS.input,
        color: COLORS.text,
        padding: 10,
        borderRadius: 5,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.input,
        padding: 10,
        borderRadius: 5,
        width: "100%",
    },
    inputPassword: {
        fontFamily: "Roboto",
        flex: 1,
        color: COLORS.text,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 15,
        fontFamily: "Roboto",
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto",
    },
});