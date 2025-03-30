import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/logo.jpg")} style={styles.logo} />
            <Text style={styles.title}>Te damos la {"\n"} bienvenida</Text>
            <Text style={styles.subtitle}>
                Conecta con los mejores dentro y fuera de tu país, aquí no tenemos fronteras.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accessButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.accessText}>Acceder</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.registerText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1F39",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 180,
        height: 180,
        marginBottom: 20,
        borderRadius: 30,
        borderColor: 'rgb(166, 61, 251)',
        borderWidth: 2,
        borderStyle: 'solid',

    },
    title: {
        fontFamily: "Roboto",
        fontSize: 35,
        padding: 30,
        fontWeight: 400,
        color: "#fff",
        marginBottom: 10,
        lineHeight: 40,
    },
    subtitle: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: "#ccc",
        textAlign: "center",
        marginBottom: 30,
        paddingVertical: 0,
        paddingHorizontal: 30,
        lineHeight: 20,
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    
    accessButton: {
        backgroundColor: "#3D5CFF",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    accessText: {
        fontFamily: "Roboto",
        color: "#fff",
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    registerText: {
        fontFamily: "Roboto",
        color: "#1F1F39",
        fontSize: 16,
    },
});

export default WelcomeScreen;