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
    sectionTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontFamily: "Roboto",
        marginTop: 20,
    },
    text: {
        fontFamily: "Roboto",
        color: COLORS.textLittle,
        fontSize: 14,
        marginTop: 5,
        lineHeight: 20,
    },
    textLast: {
        paddingBottom: 50,
    },
});