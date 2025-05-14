import AsyncStorage from '@react-native-async-storage/async-storage';
export const URL_API = "https://d272-104-223-104-245.ngrok-free.app/";

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};