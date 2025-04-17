import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    label: {
        fontSize: 18,
        fontFamily: "Roboto",
        marginBottom: 20,
        color: COLORS.text,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.secondaryText,
        borderRadius: 5,
        padding: 10,
        color: COLORS.text,
        backgroundColor: COLORS.input,
        textAlignVertical: 'top',
        minHeight: 200,
        fontFamily: "Roboto",
        marginBottom: 30,
        lineHeight: 25,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 80,
    },
    buttonText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto",
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});