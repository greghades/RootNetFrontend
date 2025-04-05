import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const  styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 35,
        paddingVertical: 30,
        color: COLORS.text,
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 20,
        borderRadius: 30,
        borderColor: COLORS.accent,
        borderWidth: 2,
        borderStyle: 'solid',
    },
    subtitle: {
        color: COLORS.secondaryText,
        marginBottom: 30,
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 15,
        lineHeight: 20,
    },
    input: {
        fontFamily: "Roboto",
        backgroundColor: 'rgb(62, 62, 85)',
        color: COLORS.text,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        width: "100%",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 20,
        width: "100%"
    },
    sendText: {
        color: COLORS.text,
        fontSize: 15,
        fontFamily: "Roboto"
    },
});