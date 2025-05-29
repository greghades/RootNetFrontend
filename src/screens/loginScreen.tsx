import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from '../styles/loginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { URL_API } from "../config/constante";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });
  interface Errors {
    correo?: string;
    contrasena?: string;
  }
  
  interface LoginResponse {
    access: string;
    refresh: string;
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
    };
    message: {
      Message: string;
    };
  }

  const validate = (): boolean => {
    let newErrors: Errors = {};
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

    setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (loading) return; // ⛔ Evita ejecutar la función si ya está en proceso
    if (!validate()) return;

    setLoading(true); // 🔒 Bloquea el botón
    try {
        const response = await fetch(`${URL_API}/api/v1/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.correo,
                password: form.contrasena
            }),
        });

        const responseText = await response.text();
        console.log("Respuesta del servidor:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (error) {
            console.error("Error al convertir a JSON:", error);
            Alert.alert("Error", "El servidor devolvió una respuesta inesperada.");
            setLoading(false); // Reactiva el botón si hay error
            return;
        }

        if (!response.ok) {
            let errorMessage = data.message?.Message || "Error en el inicio de sesión";
            Alert.alert("Error", errorMessage);
            setLoading(false);
            return;
        }

        await AsyncStorage.setItem('accessToken', data.access);
        await AsyncStorage.setItem('refreshToken', data.refresh);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));

        navigation.navigate("Feed");

      } catch (error) {
          console.error("Error en el login:", error);
          Alert.alert("Error", "Ocurrió un error al iniciar sesión.");
      } finally {
          setLoading(false); // Reactiva el botón después de la solicitud
      }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Acceso
        </Text>
        <Text style={[styles.subtitle]}>
          Rootnet te abre las puertas a un mundo de ingenieros en informática, apasionados y colaborativos. ¡Conéctate con nosotros!
        </Text>
      </View>

      <View>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#888"
          onChangeText={(text) => setForm({ ...form, correo: text })}
        />
        {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
      </View>

      <View>
        <Text style={styles.label}>Contraseña</Text>
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

      <View style={styles.containerForgot}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.forgotText}>¡Quiero registrarme!</Text>
        </TouchableOpacity>
          
        <TouchableOpacity onPress={() => navigation.navigate("ForgotOne")}>
          <Text style={styles.forgotText}>¡Olvide mi contraseña!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginText}>{loading ? "Procesando..." : "Acceso"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;