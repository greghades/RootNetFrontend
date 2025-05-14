import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/myUserStyles';
import { getToken, URL_API } from '../config/constante';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
        const storedToken = await getToken();
        setToken(storedToken);
        };
        
        fetchToken();
    }, []);

    const handleLogout = async (): Promise<void> => {
        console.log("token", token)
        try {
        const response = await fetch(`${URL_API}api/v1/auth/logout/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            Token: token,
            }),
        });

        if (!response.ok) {
            let errorMessage = 'Error al cerrar sesión';
            Alert.alert("Error", errorMessage);
            return;
        }

        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');
        
        // Navegar al login después de cerrar
        navigation.navigate("Login");

        } catch (error) {
        console.error("Error al cerrar sesión:", error);
        let errorMessage = "Ocurrió un error al cerrar sesión";
        
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        Alert.alert("Error", errorMessage);      
        
    } finally {
    }

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name:("Login") }
                ],
            })
        );
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Mi perfil</Text>

        <View style={styles.profileContainer}>
            <Image
                source={require("../assets/images/profile-user.png")}
                style={styles.profileImage}
            />
        </View>

        {/* <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("MyPosts")}>
            <Text style={styles.optionText}>Mis Publicaciones</Text>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("EditUser")}>
            <Text style={styles.optionText}>Editar Mi Perfil</Text>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PasswordUser")}>
            <Text style={styles.optionText}>Cambiar Contraseña</Text>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PilotsUser")}>
            <Text style={styles.optionText}>Políticas de privacidad</Text>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Text style={styles.optionText}>Cerrar Sesión</Text>
            <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        </View>
    );
};

export default SettingsScreen;