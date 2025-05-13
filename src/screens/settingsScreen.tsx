import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { styles } from '../styles/myUserStyles';

const SettingsScreen = () => {
    const navigation = useNavigation();

     const handleLogout = () => {
        // 1. Aquí va tu lógica de limpieza (token, AsyncStorage, Redux, etc.)
        // Ejemplo:
        // await AsyncStorage.clear();

        // 2. Resetear la pila de navegación
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name:("Login") } // Reemplaza 'Login' con el nombre exacto de tu pantalla
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