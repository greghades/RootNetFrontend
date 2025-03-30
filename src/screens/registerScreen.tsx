import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../styles/registerStyles';
import InputField from '../components/InputField';
import PasswordInput from '../components/PasswordInput';
import Button from '../components/Button';
import ButtonContainer from '../components/ButtonContainer';

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
  const navigation = useNavigation();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    usuario: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validate
  const validate = (): boolean => {
    let newErrors: Errors = {};

    if (!form.nombre) {
      newErrors.nombre = 'El nombre es requerido.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras.';
    }

    if (!form.apellido) {
      newErrors.apellido = 'El apellido es requerido.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellido)) {
      newErrors.apellido = 'El apellido solo debe contener letras.';
    }

    if (!form.direccion) {
      newErrors.direccion = 'La dirección es requerida.';
    }

    if (!form.usuario) {
      newErrors.usuario = 'El usuario es requerido.';
    } else if (!/^@[\w\d]+$/.test(form.usuario)) {
      newErrors.usuario = "El usuario debe comenzar con '@'.";
    }

    if (!form.correo) {
      newErrors.correo = 'El correo es requerido.';
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) {
      newErrors.correo = 'El correo no tiene un formato válido.';
    }

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

  const handleRegister = () => {
    if (validate()) {
      console.log('Registro exitoso', form);
      // logic - backend
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container]}>
        <Text style={[styles.title]}>
          Registrarse
        </Text>

        <Text style={[styles.subtitle]}>
          Ingrese sus datos a continuación y regístrese gratis como ingeniero informático de RootNet. ¡Conéctate con nosotros!
        </Text>

        {/* Name - Last name */}
        <View style={styles.row}>
          <InputField
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={form.nombre}
            onChangeText={(text) => setForm({ ...form, nombre: text })}
            error={errors.nombre}
          />
          <InputField
            label="Apellido"
            placeholder="Ingresa tu apellido"
            value={form.apellido}
            onChangeText={(text) => setForm({ ...form, apellido: text })}
            error={errors.apellido}
          />
        </View>

        {/* User */}
        <InputField
          label="Usuario"
          placeholder="Ingresa un usuario (debe comenzar con @)"
          value={form.usuario}
          onChangeText={(text) => setForm({ ...form, usuario: text })}
          error={errors.usuario}
        />

        {/* Address */}
        <InputField
          label="Dirección"
          placeholder="Ingresa tu dirección"
          value={form.direccion}
          onChangeText={(text) => setForm({ ...form, direccion: text })}
          error={errors.direccion}
        />

        {/* Email */}
        <InputField
          label="Correo"
          placeholder="Ingresa tu correo"
          value={form.correo}
          onChangeText={(text) => setForm({ ...form, correo: text })}
          error={errors.correo}
        />

        {/* Password */}
        <PasswordInput
          label="Contraseña"
          placeholder="********"
          value={form.contrasena}
          onChangeText={(text) => setForm({ ...form, contrasena: text })}
          error={errors.contrasena}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Confirmation Password */}
        <PasswordInput
          label="Confirmar Contraseña"
          placeholder="********"
          value={form.confirmarContrasena}
          onChangeText={(text) => setForm({ ...form, confirmarContrasena: text })}
          error={errors.confirmarContrasena}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />

        {/* Button */}
        <ButtonContainer style={styles.buttonContainer}>
          <Button
            onPress={handleRegister}
            title="Crear Cuenta"
            style={styles.registerButton}
            textStyle={styles.registerText}
          />
          <Button
            onPress={() => navigation.navigate('Login')}
            title="¡Ya tengo una cuenta!"
            style={styles.forgotText}
            textStyle={styles.loginText}
          />
        </ButtonContainer>
      </View>
    </ScrollView>
  );
};


export default RegisterScreen;