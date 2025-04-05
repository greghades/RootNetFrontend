import { StyleSheet } from 'react-native';
import { COLORS } from './colors'; 

export const  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        color: COLORS.text,
        fontSize: 30,
        fontFamily: "Roboto",
        marginBottom: 20,
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: COLORS.text,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#444",
    },
    optionText: {
        color: COLORS.text,
        fontSize: 16,
        fontFamily: "Roboto"
    },
        arrow: {
        color: COLORS.text,
        fontSize: 18,
    },
});