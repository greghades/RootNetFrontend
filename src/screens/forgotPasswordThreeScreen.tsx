import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/forgotPasswordThreeStyle';
import { AntDesign } from "@expo/vector-icons";

interface Errors {
    contrasena?: string;
    confirmarContrasena?: string;
}

const ForgotPasswordThreeStyle = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        contrasena: '',
        confirmarContrasena: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     // Validate
    const validate = (): boolean => {
    let newErrors: Errors = {};

    if (!form.contrasena) {
        newErrors.contrasena = 'La contraseña es requerida.';
    } else if (form.contrasena.length < 6) {
        newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (!form.confirmarContrasena) {
        newErrors.confirmarContrasena = 'Debe confirmar su contraseña.';
    } else if (form.contrasena !== form.confirmarContrasena) {
        newErrors.confirmarContrasena = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleForgot = () => {
        if (validate()) {
            Alert.alert(
                "Contraseña Restablecida",
                "Ya puedes iniciar sesión con Rootnet.",
                [
                    { text: "Aceptar", onPress: () => navigation.navigate("Login") }
                ]
            );
            
            console.log("Actualización exitosa", form);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Recupera tu contraseña
                </Text>
                <Text style={styles.subtitle}>Por favor ingresa tu nueva contraseña.{'\n'}¡Nuestra comunidad Rootnet te espera!</Text>
                
                {/* Password */}
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

                {/* Confirmation Password */}
                <Text style={styles.label}>Confirme Contraseña</Text>
                <View style={styles.containerInput}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholder="********"
                            placeholderTextColor="#888"
                            value={form.confirmarContrasena}
                            onChangeText={(text) => setForm({ ...form, confirmarContrasena: text })}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={24} color="#888" />
                        </TouchableOpacity>
                    </View>
                    {errors.confirmarContrasena && <Text style={styles.error}>{errors.confirmarContrasena}</Text>}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleForgot}>
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordThreeStyle;
