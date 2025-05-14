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

  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
  });
  interface Errors {
    correo?: string;
    contrasena?: string;
  }
  
  interface LoginResponse {
    Token: string;
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

  const handleLogin = async (): Promise<void> => {
    if (!validate()) return;
    
    
    try {
      const response = await fetch(`${URL_API}api/v1/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.correo,
          password: form.contrasena
        }),
      });

      const data: LoginResponse = await response.json();
      
      if (!response.ok) {
        let errorMessage = 'Error en el inicio de sesión';
        if (data.message?.Message) {
          errorMessage = data.message.Message;
        } else if (response.status === 401) {
          errorMessage = 'Credenciales inválidas';
        }
        Alert.alert("Error", errorMessage);
        return;
      }

      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('userToken', data.Token);
      
      // Guardar información del usuario si es necesario
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

      const obt = await AsyncStorage.getItem('userToken')
      console.log("obt", obt)

      // Navegar al feed después de login exitoso
      navigation.navigate("Feed");

    } catch (error) {
      console.error("Error en el login:", error);
      let errorMessage = "Ocurrió un error al iniciar sesión";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);      
      
    } finally {
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Acceso</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;