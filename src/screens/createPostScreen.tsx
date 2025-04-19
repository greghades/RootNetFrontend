import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Keyboard, Animated, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styles/createPostStyles';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [postContent, setPostContent] = useState('');
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

  const handlePublish = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        username: 'Usuario Actual',
        handle: '@usuarioactual',
        date: new Date().toLocaleDateString(),
        content: postContent,
        image: null,
        saves: 0,
        likes: 0,
        comments: 0,
        commentsList: [], // Nuevo campo para los comentarios
        isSaved: false,
        isLiked: false,
      };

      if (addPost) {
        addPost(newPost);
      }

      navigation.goBack();
      setPostContent('');
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

      <Animated.View
        style={[
          styles.bottomBar,
          {
            bottom: bottomBarPosition,
          },
        ]}
      >
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="picture" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="smileo" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="link" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default CreatePostScreen;