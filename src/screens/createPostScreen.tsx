import React, { useState, useEffect } from 'react';
import {
  View, TextInput, TouchableOpacity, Text,
  Image, KeyboardAvoidingView, Platform,
  ScrollView, Keyboard, Animated, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { styles } from '../styles/createPostStyles';
import { getToken, getUserData, URL_API, UserDataResponse } from '../config/constante';


const CreatePostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { addPost } = route.params || {};
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState< UserDataResponse | null>(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const bottomBarPosition = new Animated.Value(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        Animated.timing(bottomBarPosition, {
          toValue: e.endCoordinates.height,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        Animated.timing(bottomBarPosition, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    const fetchToken = async () => {
      const storedToken = await getToken();
        setToken(storedToken);
        };
      
      fetchToken();

    const fetchUserData = async () => {
      const storedUserData = await getUserData();
        setUserData(storedUserData);
        };
      
      fetchUserData();

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleImagePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePublish = async () => {
    if (!postContent.trim()) return;

    try {
      const formData = new FormData();
      formData.append('content', postContent);
      formData.append("title", "null");
      formData.append("author", userData?.username);

      if (selectedImage) {
        const uriParts = selectedImage.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('image', {
          uri: selectedImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      } else {
        formData.append('image', null);
      }

      console.log(userData)
      const response = await fetch(`${URL_API}api/v1/posts/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      
      if (!response.ok) {
        console.log(data)
        throw new Error('Error al crear el post');
      }

      Alert.alert('Éxito', 'Post publicado correctamente');
      if (addPost) addPost(data);
      navigation.goBack();
      setPostContent('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error publicando el post:', error);
      Alert.alert('Error', 'No se pudo publicar el post');
    }
  };

  const handleCancel = () => navigation.goBack();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePublish}
            disabled={!postContent.trim()}
            style={[styles.publishButton, { opacity: postContent.trim() ? 1 : 0.5 }]}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/images/default-profile.jpg')}
              style={styles.profileImage}
            />
            <TextInput
              style={styles.textInput}
              placeholder="¿Qué quieres compartir?"
              placeholderTextColor={COLORS.secondaryText}
              value={postContent}
              onChangeText={setPostContent}
              multiline
              autoFocus
            />
          </View>

          {selectedImage && (
            <View style={{ position: 'relative', marginVertical: 10, alignItems: 'center' }}>
              <Image
                source={{ uri: selectedImage }}
                style={{
                  width: '90%',
                  height: 200,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 20,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: 20,
                  padding: 5,
                }}
              >
                <AntDesign name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        <Animated.View
          style={[
            styles.bottomBar,
            {
              bottom: bottomBarPosition,
            },
          ]}
        >
          <TouchableOpacity style={styles.iconButton} onPress={handleImagePick}>
            <AntDesign name="picture" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;