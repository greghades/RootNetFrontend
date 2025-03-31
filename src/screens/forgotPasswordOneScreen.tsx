import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/forgotPasswordOneStyle';

interface Errors {
    correo?: string;
}

const ForgotPasswordOneScreen = () => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState<Errors>({});
    const [form, setForm] = useState({
        correo: '',
    });

    const validate = (): boolean => {
        let newErrors: Errors = {};
        
        if (!form.correo) {
            newErrors.correo = 'El correo es requerido.';
        } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(form.correo)) {
            newErrors.correo = 'El correo no tiene un formato válido.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };

        const handleForgot = () => {
            if (validate()) {
                console.log('Enviado exitosamente', form);
                navigation.navigate("ForgotTwo");
              // logic - backend
            }
        };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>

                {/* Image */}
                <Image 
                    source={require("../assets/images/email.png")} 
                    style={styles.image} 
                />

                {/* title */}
                <Text style={styles.title}>
                    Continuar con email
                </Text>

                {/* subtitle */}
                <Text style={styles.subtitle}>
                    Ingresa tu correo electrónico para que recibas el código de verificación
                </Text>

                {/* email */}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#888"
                    placeholder="correo@dom.com"
                    value={form.correo}
                    onChangeText={(text) => setForm({ ...form, correo: text })}
                />
                {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}

                <TouchableOpacity style={[styles.sendButton]} onPress={handleForgot}>
                    <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default ForgotPasswordOneScreen;
