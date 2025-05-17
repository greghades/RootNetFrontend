import AsyncStorage from '@react-native-async-storage/async-storage';
export const URL_API = "https://f950-66-232-126-116.ngrok-free.app/";

export interface UserDataResponse {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};

export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData)
            return JSON.parse(userData)
        return userData;
    } catch (error) {
        console.error('Error al obtener el userData:', error);
        return null;
    }
};