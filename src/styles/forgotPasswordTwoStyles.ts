import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const  styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: 30,
        fontFamily: "Roboto",
        color: COLORS.text,
        marginBottom: 10,
    },
    subtitle: {
        color: COLORS.text,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    bold: {
        fontFamily: "Roboto",
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    codeBox: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.input,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    codeText: {
        fontSize: 24,
        color: COLORS.text,
        fontFamily: "Roboto",
    },
    resendText: {
        color: COLORS.text,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    resendLink: {
        color: COLORS.primary,
        fontFamily: "Roboto",
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto",
    },
    keyboard: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "80%",
        justifyContent: "center",
    },
    key: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        borderRadius: 5,
        backgroundColor: COLORS.input,
    },
    keyText: {
        fontSize: 24,
        color: COLORS.text,
        fontFamily: "Roboto",
    },
});