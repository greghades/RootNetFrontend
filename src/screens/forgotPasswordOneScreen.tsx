import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/forgotPasswordOneStyles";
import { URL_API } from "../config/constante";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Si usas AsyncStorage o contexto para el token:
// import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordOneScreen = () => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({ correo: "" });
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};

        if (!form.correo) {
            newErrors.correo = "El correo es requerido.";
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) {
            newErrors.correo = "El correo no tiene un formato válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForgot = async () => {
        if (loading) return;
        if (!validate()) return;

        setLoading(true);

        try {
            const response = await fetch(`${URL_API}/api/v1/auth/send-code/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.correo,
            }),
            });

            const responseText = await response.text();
            console.log("Texto de respuesta del servidor:", responseText);

            let data;
            try {
            data = JSON.parse(responseText);
            } catch (error) {
            console.error("Error al convertir respuesta a JSON:", error);
            Alert.alert("Error", "El servidor devolvió una respuesta inesperada.");
            return;
            }

            if (!response.ok) {
            let errorMessage = data?.detail || "Error en el envío del código";
            if (response.status === 401) {
                errorMessage = "Credenciales inválidas";
            }
            Alert.alert("Error", errorMessage);
            return;
            }

            Alert.alert("Código enviado", "Revisa tu correo electrónico para recuperar tu cuenta.");
            navigation.navigate("ForgotTwo");

        } catch (error) {
            console.error("Error en el envío:", error);
            Alert.alert("Error", "Ocurrió un problema al enviar el código de recuperación.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={require("../assets/images/email.png")} style={styles.image} />

                <Text style={styles.title}>Continuar con email</Text>

                <Text style={styles.subtitle}>
                    Ingresa tu correo electrónico para que recibas el código de verificación
                </Text>

                <TextInput
                    style={styles.input}
                    placeholderTextColor="#888"
                    placeholder="correo@dom.com"
                    value={form.correo}
                    onChangeText={(text) =>
                        setForm({ ...form, correo: text.trim() })
                    }
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleForgot}
                    disabled={loading}
                >
                    <Text style={styles.sendText}>
                        {loading ? "Procesando..." : "Enviar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordOneScreen;