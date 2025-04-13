import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.accent,
        marginRight: 15,
    },
    title: {
        fontSize: 30,
        fontFamily: "Roboto",
        color: COLORS.text,
    },
    editPhoto: {
        textAlign: "center",
        color: COLORS.accent,
        marginVertical: 10,
        fontFamily: "Roboto",
        fontSize: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        color: COLORS.text,
        fontFamily: "Roboto",
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        backgroundColor: COLORS.input,
        color: COLORS.text,
        padding: 10,
        borderRadius: 8,
        fontFamily: "Roboto",
        flex: 1,
    },
    characterCount: {
        fontSize: 12,
        color: COLORS.secondaryText,
        marginTop: 5,
        fontFamily: "Roboto",
    },
    pickerContainer: {
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.input,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        color: COLORS.text,
        fontFamily: "Roboto",
    },
    containerPhone: {
        marginBottom: 15,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    countryPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.input,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    callingCode: {
        marginLeft: 6,
        fontSize: 14,
        color: COLORS.text,
        fontFamily: "Roboto",
    },
    phoneInput: {
        flex: 1,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 10,
        marginTop: 10,
        marginBottom: 20,
    },
    option: {
        borderColor: COLORS.text,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 12,
        width: "32%",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedOption: {
        backgroundColor: COLORS.primary
    },
    optionText: {
        color: COLORS.text,
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 10,
        lineHeight: 15,
        paddingHorizontal: 10,
    },
    selectedOptionText: {
        color: COLORS.text
    },
    optionsSelect: {
        backgroundColor: COLORS.input,
        borderRadius: 8,
        marginBottom: 15,
        minHeight: 80,
        paddingBottom: 12,
        paddingHorizontal: 10,
        justifyContent: "center",
        width: "100%"
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.text,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: 5
    },
    chipText: {
        marginRight: 6,
        color: COLORS.primary,
        fontFamily: "Roboto",
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
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    flagAndCode: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});