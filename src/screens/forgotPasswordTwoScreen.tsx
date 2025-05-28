import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/forgotPasswordTwoStyles';
import { URL_API } from "../config/constante";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordTwoScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState(["", "", "", ""]);
    const [loading, setLoading] = useState(false);

    const handlePress = (num: string) => {
        const newCode = [...code];
        const emptyIndex = newCode.findIndex((c) => c === "");
        if (emptyIndex !== -1) {
            newCode[emptyIndex] = num;
            setCode(newCode);
        }
    };

    const handleBackspace = () => {
        const newCode = [...code];
        for (let i = newCode.length - 1; i >= 0; i--) {
            if (newCode[i] !== "") {
                newCode[i] = "";
                break;
            }
        }
        setCode(newCode);
    };

    const validateCode = async () => {
        if (loading) return;

        const fullCode = code.join("");
        if (fullCode.length !== 4) {
            Alert.alert("Código incompleto", "Por favor ingresa los 4 dígitos del código.");
            return;
        }

        setLoading(true);
        try {
            const email = await AsyncStorage.getItem("resetEmail");
            if (!email) {
                Alert.alert("Error", "No se encontró el correo electrónico para validar el código.");
                setLoading(false);
                return;
            }

            console.log("Validando código con email:", email);
            const response = await fetch(`${URL_API}/api/v1/auth/validate-code/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: fullCode, email }),
            });

            const data = await response.json();
            console.log("Respuesta validación código:", data);

            if (response.status === 202) {
                await AsyncStorage.setItem("resetCode", fullCode);
                Alert.alert("Código correcto", "Código validado correctamente.");
                navigation.navigate("ForgotThree"); // Navega a la siguiente pantalla
            } else {
                Alert.alert("Error", data?.detail || "Código inválido o expirado.");
            }
        } catch (error) {
            console.error("Error al validar código:", error);
            Alert.alert("Error", "No se pudo validar el código. Verifica tu conexión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar Correo</Text>

            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <View key={index} style={styles.codeBox}>
                        <Text style={styles.codeText}>{digit}</Text>
                    </View>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={validateCode} disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? "Validando..." : "Recuperar contraseña"}
                </Text>
            </TouchableOpacity>

            <View style={styles.keyboard}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "", "⌫"].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.key}
                        onPress={() =>
                            typeof item === "number"
                                ? handlePress(item.toString())
                                : item === "⌫" && handleBackspace()
                        }
                    >
                        <Text style={styles.keyText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ForgotPasswordTwoScreen;