import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface Errors {
    nombre?: string;
    apellido?: string;
    direccion?: string;
    usuario?: string;
    correo?: string;
    contrasena?: string;
    confirmarContrasena?: string;
    }

    const RegisterScreen: React.FC = () => {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        direccion: "",
        usuario: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validate = (): boolean => {
        let newErrors: Errors = {};

        // Validate name
        if (!form.nombre) {
        newErrors.nombre = "El nombre es requerido.";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
        newErrors.nombre = "El nombre solo debe contener letras.";
        }

        // Validate last name
        if (!form.apellido) {
        newErrors.apellido = "El apellido es requerido.";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellido)) {
        newErrors.apellido = "El apellido solo debe contener letras.";
        }

        // Validate address
        if (!form.direccion) {
        newErrors.direccion = "La dirección es requerida.";
        }

        // validate user (@)
        if (!form.usuario) {
        newErrors.usuario = "El usuario es requerido.";
        } else if (!/^@[\w\d]+$/.test(form.usuario)) {
        newErrors.usuario = "El usuario debe comenzar con '@'.";
        }

        // validate email
        if (!form.correo) {
        newErrors.correo = "El correo es requerido.";
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) {
        newErrors.correo = "El correo no tiene un formato válido.";
        }

        // validate password (min 6 characters)
        if (!form.contrasena) {
        newErrors.contrasena = "La contraseña es requerida.";
        } else if (form.contrasena.length < 6) {
        newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
        }

        // validate confirmation password (equal)
        if (!form.confirmarContrasena) {
        newErrors.confirmarContrasena = "Debe confirmar su contraseña.";
        } else if (form.contrasena !== form.confirmarContrasena) {
        newErrors.confirmarContrasena = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        if (validate()) {
        console.log("Registro exitoso", form);
        }
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Registrarse</Text>
            <Text style={styles.subtitle}>Ingrese sus datos a continuación y regístrese gratis</Text>

            {/* Name y Last name */}
            <View style={styles.row}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, nombre: text })}
                />
                {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Apellido</Text>
                <TextInput
                placeholder="Ingresa tu apellido"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, apellido: text })}
                />
                {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}
            </View>
            </View>

            {/* User */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
                placeholder="Ingresa un usuario debe comenzar con @"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, usuario: text })}
            />
            {errors.usuario && <Text style={styles.error}>{errors.usuario}</Text>}
            </View>

            {/* Address */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
                placeholder="Ingresa tu dirección"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, direccion: text })}
            />
            {errors.direccion && <Text style={styles.error}>{errors.direccion}</Text>}
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
                placeholder="Ingresa tu correo"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, correo: text })}
            />
            {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.input}
                placeholderTextColor="#888"
                placeholder="********"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setForm({ ...form, contrasena: text });
                }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="#888" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>
            {errors.contrasena && <Text style={styles.error}>{errors.contrasena}</Text>}
            </View>

            {/* confirmation password */}
            <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.input}
                placeholderTextColor="#888"
                placeholder="********"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setForm({ ...form, confirmarContrasena: text });
                }}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <AntDesign name={showConfirmPassword ? "eye" : "eyeo"} size={24} color="#888" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            </View>
            {errors.confirmarContrasena && <Text style={styles.error}>{errors.confirmarContrasena}</Text>}
            </View>

            {/* button - register */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerText}>Crear Cuenta</Text>
            </TouchableOpacity>

            {/* login */}
            <TouchableOpacity>
            <Text style={styles.forgotText}>¡Ya tengo una cuenta!</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1F1F39",
        padding: 30,
    },
    title: {
        fontFamily: "Roboto",
        fontSize: 28,
        color: "#fff",
        marginBottom: 20,
        textAlign: "left",
        marginLeft: 8,
    },
    subtitle: {
        color: "#ccc",
        marginBottom: 30,
        textAlign: "left",
        fontFamily: "Roboto",
        fontSize: 15,
        paddingHorizontal: 10,
        lineHeight: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    label: {
        fontFamily: "Roboto",
        color: "#fff",
        marginBottom: 10,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 20,
    },
    input: {
        backgroundColor: "rgb(62, 62, 85)",
        color: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        fontFamily: "Roboto",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgb(62, 62, 85)",
        borderRadius: 10,
        justifyContent: "space-between",
    },
    registerButton: {
        backgroundColor: "#3D5CFF",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
    },
    registerText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Roboto",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginBottom: 20,
        fontFamily: "Roboto",
    },
    forgotText: {
        fontFamily: "Roboto",
        color: "#bbb",
        textAlign: "center",
        marginVertical: 20,
    },
});

export default RegisterScreen;