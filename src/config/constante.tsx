import AsyncStorage from '@react-native-async-storage/async-storage';
export const URL_API = "https://a7e2-66-232-126-52.ngrok-free.app";

export interface UserDataResponse {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface PostResponse {
    id: number;
    author: string;
    created_at: string;
    updated_at: string;
    image: string;
    content: string;
    tag: [number];
    created_date: string;
    created_time: string;
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
};

export const getRefreshToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        return refreshToken;
    } catch (error) {
        console.error('Error al obtener el token refresh:', error);
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