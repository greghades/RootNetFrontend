import AsyncStorage from '@react-native-async-storage/async-storage';
export const URL_API = "https://50e0-96-31-87-164.ngrok-free.app";

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
    author_first_name?: string;
    author_last_name?: string;
    favorites_count?: number;
    likes_count?: number;
    comments_count?: number;
    created_at: string;
    updated_at: string;
    image: string;
    content: string;
    tags_names?: [number];
    created_date: string;
    created_time: string;
}

export interface UserDataProfile {
    username: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
    date_joined: string;
    followers_count: number;
    following_count: number;
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