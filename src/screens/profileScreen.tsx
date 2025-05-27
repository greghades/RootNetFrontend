import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';
import { styles } from '../styles/profileStyles';
import { getToken, getUserData, PostResponse, UserDataResponse, URL_API, UserDataProfile } from '../config/constante';

// Datos estáticos del usuario (para maquetación)
const userDataDummy = {
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

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { username, handle } = route.params || {};

  // Estados para manejar el botón "Seguir" y el contador de seguidores
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(userDataDummy.initialFollowers);

  // Para maquetación, usamos datos estáticos si no se pasan parámetros
  const displayUsername = username || userDataDummy.username;
  const displayHandle = handle || userDataDummy.handle;

  // Determinar si este perfil pertenece al usuario autenticado
  const isOwnProfile = displayHandle === authenticatedUser.handle;
  const [token, setToken] = useState<string | null>(null);
  const [myPost, setMyPost] = useState<[PostResponse] | []>([]);
  const [userData, setUserData] = useState< UserDataResponse | null>(null);

  const [dataProfile, setDataProfile] = useState< UserDataProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async (): Promise<{ token: string; userData: UserDataResponse } | null> => {
      try {
        const storedToken = await getToken();
        if (!storedToken) {
          console.warn('Token no disponible');
          return null;
        }
        
        const storedUserData = await getUserData();
        if (!storedUserData) {
          console.warn('storedUserData no disponible');
          return null;
        }
        
        // Actualizar estados
        setToken(storedToken);
        setUserData(storedUserData);
        
        // Retornar los valores directamente
        return { token: storedToken, userData: storedUserData };
      } catch (error) {
        console.error('Error en fetchUserData:', error);
        return null;
      }
    };

    const getUserProfile = async (token: string, username: string): Promise<void> => {
      console.log(`${URL_API}/api/v1/users/user/${username}`);
      try {
        const response = await fetch(`${URL_API}/api/v1/users/user/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          console.error('Error al obtener perfil:', data);
          return;
        }
        
        setDataProfile(data);
      } catch (error) {
        console.error('Error al obtener perfil:', error);
      }
    };

    const fetchPosts = async (token: string, userId: number): Promise<void> => {
      try {
        const queryParams = `?user_id=${userId}`;
        const response = await fetch(`${URL_API}/api/v1/posts/get-owner-posts/${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.error('Error al obtener posts:', data);
          return;
        }

        const formattedPosts = data.map((post: any) => {
          const [day, month, year, hourStr, minute] = post.created_at.split('/');
          const hour = parseInt(hourStr, 10);
          const hour12 = hour % 12 === 0 ? 12 : hour % 12;
          const ampm = hour >= 12 ? 'pm' : 'am';
          
          return {
            ...post,
            created_date: `${day}/${month}/${year}`,
            created_time: `${hour12.toString().padStart(2, '0')}:${minute}${ampm}`,
          };
        });
        
        setMyPost(formattedPosts);
      } catch (error) {
        console.error('Error al obtener posts:', error);
      }
    };

    const loadData = async (): Promise<void> => {
      try {
        // 1. Primero obtenemos token y userData
        const result = await fetchUserData();
        if (!result) return;
        
        const { token, userData } = result;
        
        // 2. Luego obtenemos el perfil (usamos el username de los parámetros o del usuario)
        const profileUsername = userData.username;
        await getUserProfile(token, profileUsername);
        
        // 3. Finalmente obtenemos los posts
        await fetchPosts(token, userData.id);
      } catch (error) {
        console.error('Error en loadData:', error);
      }
    };

    loadData();
  }, []); // Añadimos username como dependencia


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
      profile_photo={""}
      postId={item.id}
      username={`${item.author_first_name} ${item.author_last_name} `}
      handle={item.author}
      date={item.created_date+" "+item.created_time}
      content={item.content}
      image={URL_API + item.image}
      saves={item.favorites_count}
      likes={item.likes_count}
      comments={item.comments_count}
      commentsList={[]}
      isSaved={true}
      isLiked={true}
      onSaveToggle={() => {}}
      onLikeToggle={() => {}}
      onCommentAdded={() => {}}
      likedBy={item.likedBy}
      onMorePress={handleMorePress} // Pasamos el callback
      isOwnPost={item.author === authenticatedUser.handle} // Determinamos si el post pertenece al usuario autenticado
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
            source={dataProfile?.profile_photo ? `${URL_API}${dataProfile?.profile_photo}` : require('../assets/images/default-profile.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{`${dataProfile?.first_name} ${dataProfile?.last_name}`}</Text>
          <Text style={styles.handle}>{dataProfile?.username}</Text>
          <Text style={styles.description}>{userDataDummy.description}</Text>
          <Text style={styles.joinDate}>Se unió en {dataProfile?.date_joined}</Text>
          <View style={styles.followContainer}>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>{dataProfile?.followers_count}</Text> Seguidores
            </Text>
            <Text style={styles.followText}>
              <Text style={styles.followNumber}>{dataProfile?.following_count}</Text> Seguidos
            </Text>
          </View>
        </View>
      </View>

      {/* Lista de publicaciones */}
      <FlatList
        data={myPost}
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