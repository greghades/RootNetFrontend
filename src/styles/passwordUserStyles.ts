import {StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        color: COLORS.text,
        fontSize: 22,
        fontFamily: "Roboto",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: COLORS.text,
        fontFamily: "Roboto",
        fontSize: 14,
        marginBottom: 5,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.input,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontFamily: "Roboto",
        color: COLORS.text,
        paddingVertical: 10,
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 15,
        fontFamily: "Roboto",
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto",
    },
});