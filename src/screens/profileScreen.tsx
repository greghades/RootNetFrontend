import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';
import { styles } from '../styles/profileStyles';

// Datos estáticos del usuario (para maquetación)
const userData = {
  username: 'Usuario',
  handle: '@usuarioactual',
  description: 'Programador FullStack Javascript Node.js, Nest, Next.js',
  joinDate: 'septembre 2020',
  initialFollowers: 14,
  following: 20,
};

// Simulación del usuario autenticado
const authenticatedUser = {
  handle: '@pixelsz',
};

// Datos estáticos de las publicaciones (reutilizamos el formato de PostCard)
const userPosts = [
  {
    id: '1',
    username: 'Maximillian',
    handle: '@pixelsz',
    date: '3h',
    content: "Y'ALL ready for this next post?",
    image: 'https://i.pinimg.com/474x/d7/47/f7/d747f70ce52b0df12c1542b280fa8d76.jpg',
    saves: 48,
    likes: 383,
    comments: 0,
    commentsList: [],
    isSaved: false,
    isLiked: false,
    likedBy: 'Zack John',
  },
  {
    id: '2',
    username: 'Maximillian',
    handle: '@maxjacobson',
    date: '3h',
    content: "Y'ALL ready for this next post?",
    saves: 46,
    likes: 383,
    comments: 0,
    commentsList: [],
    isSaved: true,
    isLiked: true,
  },
  {
    id: '3',
    username: 'Maximillian',
    handle: '@pixelsz',
    date: '3h',
    content: "Y'ALL ready for this next post?",
    image: 'https://i.pinimg.com/474x/d7/47/f7/d747f70ce52b0df12c1542b280fa8d76.jpg',
    saves: 48,
    likes: 383,
    comments: 0,
    commentsList: [],
    isSaved: false,
    isLiked: false,
    likedBy: 'Zack John',

  }
];

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { username, handle } = route.params || {};

  // Estados para manejar el botón "Seguir" y el contador de seguidores
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(userData.initialFollowers);

  // Para maquetación, usamos datos estáticos si no se pasan parámetros
  const displayUsername = username || userData.username;
  const displayHandle = handle || userData.handle;

  // Determinar si este perfil pertenece al usuario autenticado
  const isOwnProfile = displayHandle === authenticatedUser.handle;

  // Función para manejar el clic en el botón "Seguir"
  const handleFollowPress = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowers(followers - 1);
    } else {
      setIsFollowing(true);
      setFollowers(followers + 1);
    }
  };

  // Función para manejar el clic en el botón "Ajustes"
  const handleSettingsPress = () => {
    console.log('Navegar a la pantalla de ajustes');
    navigation.navigate('Settings');
  };

  // Función para manejar las acciones del modal de "más opciones"
  const handleMorePress = (postId: string, action: 'delete' | 'edit' | 'report') => {
    switch (action) {
      case 'delete':
        console.log(`Eliminar publicación con ID: ${postId}`);
        // Aquí puedes implementar la lógica para eliminar el post
        break;
      case 'edit':
        console.log(`Editar publicación con ID: ${postId}`);
        // Aquí puedes navegar a una pantalla de edición
        break;
      case 'report':
        console.log(`Reportar publicación con ID: ${postId}`);
        // Aquí puedes implementar la lógica para reportar el post
        break;
      default:
        break;
    }
  };

  const renderPost = ({ item }) => (
    <PostCard
      postId={item.id}
      username={item.username}
      handle={item.handle}
      date={item.date}
      content={item.content}
      image={item.image}
      saves={item.saves}
      likes={item.likes}
      comments={item.comments}
      commentsList={item.commentsList}
      isSaved={item.isSaved}
      isLiked={item.isLiked}
      onSaveToggle={() => {}}
      onLikeToggle={() => {}}
      onCommentAdded={() => {}}
      likedBy={item.likedBy}
      onMorePress={handleMorePress} // Pasamos el callback
      isOwnPost={item.handle === authenticatedUser.handle} // Determinamos si el post pertenece al usuario autenticado
    />
  );

  return (
    <View style={styles.container}>
      {/* Encabezado del perfil */}
      <View style={styles.header}>
        {/* Botón condicional en la parte superior derecha */}
        <View style={styles.buttonContainer}>
          {isOwnProfile ? (
            <TouchableOpacity onPress={handleSettingsPress}>
              <View style={styles.settingsButton}>
                <Text style={styles.settingsButtonText}>Ajustes</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleFollowPress}>
              <View style={[styles.followButton, isFollowing && styles.followButtonFollowing]}>
                <Text style={[styles.followButtonText, isFollowing && styles.followButtonTextFollowing]}>
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Imagen de perfil y datos del usuario */}
        <View style={styles.userInfo}>
          <Image
            source={require('../assets/images/default-profile.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{displayUsername}</Text>
          <Text style={styles.handle}>{displayHandle}</Text>
          <Text style={styles.description}>{userData.description}</Text>
          <Text style={styles.joinDate}>Se unió en {userData.joinDate}</Text>
          <View style={styles.followContainer}>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>{followers}</Text> Seguidores
            </Text>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>{userData.following}</Text> Seguidos
            </Text>
          </View>
        </View>
      </View>

      {/* Lista de publicaciones */}
      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postsContainer}
      />

      {/* Barra de navegación inferior */}
      <BottomNavBar activeScreen="Profile" />
    </View>
  );
};

export default ProfileScreen;