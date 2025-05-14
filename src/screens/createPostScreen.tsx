import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Keyboard, Animated, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/createPostStyles';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // NUEVO estado para la imagen
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { addPost } = route.params || {};

  const bottomBarPosition = new Animated.Value(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
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

    const keyboardDidHideListener = Keyboard.addListener(
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

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // FUNCIÓN para abrir galería
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
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

  const handlePublish = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        username: 'Usuario Actual',
        handle: '@usuarioactual',
        date: new Date().toLocaleDateString(),
        content: postContent,
        image: selectedImage || null, // INCLUYE la imagen seleccionada
        saves: 0,
        likes: 0,
        comments: 0,
        commentsList: [],
        isSaved: false,
        isLiked: false,
      };

      if (addPost) {
        addPost(newPost);
      }

      navigation.goBack();
      setPostContent('');
      setSelectedImage(null);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
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

      <View style={[styles.inputContainer, { paddingBottom: keyboardHeight }]}>
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
{typeof selectedImage === 'string' && selectedImage.trim() !== '' && (
  <View style={{ position: 'relative', alignSelf: 'center', marginVertical: 10 }}>
    <Image
      source={{ uri: selectedImage }}
      style={{
        width: 300,
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
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        padding: 5,
      }}
    >
      <AntDesign name="close" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
)}
     
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
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="link" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CreatePostScreen;
