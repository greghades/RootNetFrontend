import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
  interface Errors {
      correo?: string;
      contrasena?: string;
  }
  
  const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [form, setForm] = useState({
          correo: "",
          contrasena: "",
    });

  const validateEmail = (email: string): boolean => {
    const re = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  
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

  const handleLogin = () => {
    if (validate()) {
    console.log("Inicio de Sesión exitoso", form);
    }
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
        onChangeText={(text) => setForm({ ...form, correo: text })}
      />
      {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="********"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setForm({ ...form, contrasena: text });
        }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AntDesign name={showPassword ? "eye" : "eyeo"} size={24} color="#888" />
        </TouchableOpacity>
        {errors.contrasena && <Text style={styles.error}>{errors.contrasena}</Text>}
      </View>

      <View style={styles.containerForgot}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.forgotText}>¡Quiero registrarme!</Text>
        </TouchableOpacity>
          
        <TouchableOpacity>
          <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
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
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  containerForgot: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  forgotText: {
    fontFamily: "Roboto",
    color: "#bbb",
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