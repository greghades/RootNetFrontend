import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { styles } from '../styles/passwordUserStyles';

interface Errors {
    contrasenaActual?: string;
    nuevaContrasena?: string;
    confirmarContrasena?: string;
}

const PasswordUserScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        contrasenaActual: '',
        nuevaContrasena: '',
        confirmarContrasena: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [showPasswordCurrent, setShowPasswordCurrent] = useState(true);
    const [showPasswordNew, setShowPasswordNew] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    // Validate
    const validate = (): boolean => {
        let newErrors: Errors = {};

        if (!form.contrasenaActual) {
            newErrors.contrasenaActual = 'La contraseña actual es requerida.';
        }

        if (!form.nuevaContrasena) {
            newErrors.nuevaContrasena = 'La nueva contraseña es requerida.';
        } else if (form.nuevaContrasena.length < 6) {
            newErrors.nuevaContrasena = 'La nueva contraseña debe tener al menos 6 caracteres.';
        } else if (form.nuevaContrasena === form.contrasenaActual) {
            newErrors.nuevaContrasena = 'La nueva contraseña no puede ser igual a la actual.';
        }

        if (!form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Debe confirmar su nueva contraseña.';
        } else if (form.nuevaContrasena !== form.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdatePassword = () => {
        if (validate()) {
            Alert.alert(
                "Contraseña Actualizada",
                "Tu contraseña ha sido actualizada exitosamente.",
                [{ text: "Aceptar", onPress: () => navigation.navigate("MyUser") }]
            );

            console.log("Actualización exitosa", form);

            // Clear form
            setForm({
                contrasenaActual: '',
                nuevaContrasena: '',
                confirmarContrasena: '',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Actualizar Contraseña</Text>

            {/* Current Password */}
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

            {/* New Password */}
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

            {/* Confirm New Password */}
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

            {/* Save Changes Button */}
            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordUserScreen;