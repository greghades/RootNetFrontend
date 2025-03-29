import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
  
    if (!email || !validateEmail(email)) {
      Alert.alert("Error", "Ingresa un correo válido.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    Alert.alert("Éxito", "Inicio de sesión exitoso");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso</Text>

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="********"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Acceso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F39",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
  },
  label: {
    fontFamily: "Roboto",
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    fontFamily: "Roboto",
    backgroundColor: 'rgb(62, 62, 85)',
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'rgb(62, 62, 85)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    fontFamily: "Roboto",
    flex: 1,
    color: "#fff",
  },
  forgotText: {
    fontFamily: "Roboto",
    color: "#bbb",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#3D5CFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontFamily: "Roboto",
    color: "#fff",
  },
});

export default LoginScreen;
