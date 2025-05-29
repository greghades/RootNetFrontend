import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/forgotPasswordThreeStyles";
import { AntDesign } from "@expo/vector-icons";
import { URL_API } from "../config/constante";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Errors {
    contrasena?: string;
    confirmarContrasena?: string;
}

const ForgotPasswordThreeScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        contrasena: "",
        confirmarContrasena: "",
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        let newErrors: Errors = {};

        if (!form.contrasena) {
            newErrors.contrasena = "La contraseña es requerida.";
        } else if (form.contrasena.length < 6) {
            newErrors.contrasena = "Debe tener al menos 6 caracteres.";
        }

        if (!form.confirmarContrasena) {
            newErrors.confirmarContrasena = "Debe confirmar su contraseña.";
        } else if (form.contrasena !== form.confirmarContrasena) {
            newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForgot = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const email = await AsyncStorage.getItem("resetEmail");
            const code = await AsyncStorage.getItem("resetCode");

            console.log("DEBUG email:", email);
            console.log("DEBUG code:", code);

            if (!email || !code) {
                Alert.alert("Error", "Faltan datos para restablecer la contraseña.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${URL_API}/api/v1/auth/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    code,
                    new_password: form.contrasena,
                    confirm_password: form.confirmarContrasena,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    "Contraseña restablecida",
                    "Ya puedes iniciar sesión con Rootnet.",
                    [{ text: "Aceptar", onPress: () => navigation.navigate("Login") }]
                );
                await AsyncStorage.removeItem("resetEmail");
                await AsyncStorage.removeItem("resetCode");
            } else {
                Alert.alert("Error", data?.detail || "Ocurrió un error inesperado.");
            }
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            Alert.alert("Error", "No se pudo cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Recupera tu contraseña</Text>
                <Text style={styles.subtitle}>
                    Por favor ingresa tu nueva contraseña.{"\n"}¡Nuestra comunidad Rootnet te espera!
                </Text>

                <Text style={styles.label}>Nueva Contraseña</Text>
                <View style={styles.containerInput}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder="********"
                            placeholderTextColor="#888"
                            secureTextEntry={!showPassword}
                            value={form.contrasena}
                            onChangeText={(text) => setForm({ ...form, contrasena: text })}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="#888" />
                        </TouchableOpacity>
                    </View>
                    {errors.contrasena && <Text style={styles.error}>{errors.contrasena}</Text>}
                </View>

                <Text style={styles.label}>Confirme Contraseña</Text>
                <View style={styles.containerInput}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholder="********"
                            placeholderTextColor="#888"
                            value={form.confirmarContrasena}
                            onChangeText={(text) =>
                                setForm({ ...form, confirmarContrasena: text })
                            }
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={24} color="#888" />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmarContrasena && (
                        <Text style={styles.error}>{errors.confirmarContrasena}</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleForgot} disabled={loading}>
                    <Text style={styles.buttonText}>
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordThreeScreen;