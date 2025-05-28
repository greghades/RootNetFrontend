import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from '../styles/passwordUserStyles';
import { URL_API } from "../config/constante";

const PasswordUserScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: '',
    });

    const [errors, setErrors] = useState({});
    const [showPasswordCurrent, setShowPasswordCurrent] = useState(true);
    const [showPasswordNew, setShowPasswordNew] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        let newErrors = {};

        if (!form.contrasenaActual) {
            newErrors.contrasenaActual = 'La contraseña actual es requerida.';
        }

        if (!form.nuevaContrasena) {
            newErrors.nuevaContrasena = 'La nueva contraseña es requerida.';
        } else if (form.nuevaContrasena.length < 6) {
            newErrors.nuevaContrasena = 'Debe tener al menos 6 caracteres.';
        } else if (form.nuevaContrasena === form.contrasenaActual) {
            newErrors.nuevaContrasena = 'No puede ser igual a la actual.';
        }

        if (!form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Debe confirmar la contraseña.';
        } else if (form.nuevaContrasena !== form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdatePassword = async () => {
        if (!validate()) return;

        setLoading(true);

        try {
            const token = await AsyncStorage.getItem('accessToken');

            if (!token) {
                Alert.alert("Error", "No se encontró el token de autenticación.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${URL_API}/api/v1/auth/change-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: form.contrasenaActual,
                    new_password: form.nuevaContrasena,
                    confirm_password: form.confirmarContrasena,
                }),
            });

            const responseData = await response.json();
            console.log("Respuesta del servidor:", responseData);

            if (response.ok) {
                Alert.alert("Contraseña Actualizada", "Tu contraseña ha sido actualizada exitosamente.");
                setForm({
                    contrasenaActual: '',
                    nuevaContrasena: '',
                    confirmarContrasena: '',
                });
                navigation.navigate("Settings");
            } else {
                if (response.status === 400) {
                    Alert.alert("Error", "Datos inválidos o contraseñas no coinciden.");
                } else if (response.status === 401) {
                    Alert.alert("Error", "Contraseña actual incorrecta o token inválido.");
                } else {
                    Alert.alert("Error", "Ocurrió un error al actualizar la contraseña.");
                }
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            Alert.alert("Error", "No se pudo conectar al servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Actualizar Contraseña</Text>

            {/* Contraseña actual */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña Actual</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={showPasswordCurrent}
                        value={form.contrasenaActual}
                        onChangeText={(text) => setForm({ ...form, contrasenaActual: text })}
                        placeholder="Ingrese su contraseña actual"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={() => setShowPasswordCurrent(!showPasswordCurrent)}>
                        <AntDesign name={showPasswordCurrent ? "eye" : "eyeo"} size={22} color="#bbb" />
                    </TouchableOpacity>
                </View>
                {errors.contrasenaActual && <Text style={styles.error}>{errors.contrasenaActual}</Text>}
            </View>

            {/* Nueva contraseña */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nueva Contraseña</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={showPasswordNew}
                        value={form.nuevaContrasena}
                        onChangeText={(text) => setForm({ ...form, nuevaContrasena: text })}
                        placeholder="Ingrese su nueva contraseña"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={() => setShowPasswordNew(!showPasswordNew)}>
                        <AntDesign name={showPasswordNew ? "eye" : "eyeo"} size={22} color="#bbb" />
                    </TouchableOpacity>
                </View>
                {errors.nuevaContrasena && <Text style={styles.error}>{errors.nuevaContrasena}</Text>}
            </View>

            {/* Confirmar nueva contraseña */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={showConfirmPassword}
                        value={form.confirmarContrasena}
                        onChangeText={(text) => setForm({ ...form, confirmarContrasena: text })}
                        placeholder="Confirme su nueva contraseña"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={22} color="#bbb" />
                    </TouchableOpacity>
                </View>
                {errors.confirmarContrasena && <Text style={styles.error}>{errors.confirmarContrasena}</Text>}
            </View>

            {/* Botón guardar */}
            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword} disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? "Procesando..." : "Guardar Cambios"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordUserScreen;
