import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

const RegisterScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Registrar</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1F1F39",
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
});

export default RegisterScreen;