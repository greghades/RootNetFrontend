import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from '../styles/loginStyles';

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
      <TouchableOpacity style={styles.loginButton} onPress={() => {
          if (validate()) {
            navigation.navigate("Feed");
          }
        }}
      >
        <Text style={styles.loginText}>Acceso</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;