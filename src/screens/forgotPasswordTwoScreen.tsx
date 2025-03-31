import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from '../styles/forgotPasswordTwoStyle';

const ForgotPasswordTwoScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState(["", "", "", ""]);

    const handlePress = (num: string) => {
        const newCode = [...code];
        const emptyIndex = newCode.findIndex((c) => c === "");
        if (emptyIndex !== -1) {
        newCode[emptyIndex] = num;
        setCode(newCode);
        }
    };

    const handleBackspace = () => {
        const newCode = [...code];
        for (let i = newCode.length - 1; i >= 0; i--) {
        if (newCode[i] !== "") {
            newCode[i] = "";
            break;
        }
        }
        setCode(newCode);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificar Correo</Text>
            <Text style={styles.subtitle}>Código enviado a <Text style={styles.bold}>correo@dom.com</Text></Text>
            
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                <View key={index} style={styles.codeBox}>
                    <Text style={styles.codeText}>{digit}</Text>
                </View>
                ))}
            </View>

            <Text style={styles.resendText}>¿No recibí el código? <Text style={styles.resendLink}>Enviar de nuevo</Text></Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ForgotThree")}>
                <Text style={styles.buttonText}>Recuperar contraseña</Text>
            </TouchableOpacity>

            <View style={styles.keyboard}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "", "⌫"].map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.key}
                    onPress={() =>
                    typeof item === "number"
                        ? handlePress(item.toString())
                        : item === "⌫" && handleBackspace()
                    }
                >
                    <Text style={styles.keyText}>{item}</Text>
                </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ForgotPasswordTwoScreen;