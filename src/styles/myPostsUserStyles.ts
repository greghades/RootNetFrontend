import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    profileHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        marginVertical: 10,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 8,
        borderColor: COLORS.accent,
        borderWidth: 1,
        borderStyle: "solid",
        marginBottom: 12,
    },
    userInfo: {
        alignItems: "center"

    },
    username: {
        fontSize: 20,
        fontFamily: "Roboto",
        color: COLORS.text,
        marginBottom: 4,
    },
    handle: {
        fontSize: 16,
        color: COLORS.secondaryText,
        fontFamily: "Roboto"
    },
    followStats: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    followStatText: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginRight: 16,
        fontFamily: "Roboto",
    },
});