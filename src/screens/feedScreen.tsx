import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { feedStyles } from '../styles/feedStyles';
import { useNavigation } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';
import FloatingActionButton from '../components/FloatingActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, getUserData, PostResponse, URL_API, UserDataResponse } from '../config/constante';

const FeedScreen: React.FC = () => {
  const navigation = useNavigation();
  const [mockPosts, setMockPosts] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const [myPost, setMyPost] = useState<[PostResponse] | []>([]);

  // Cargar posts desde AsyncStorage al montar el componente
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const storedToken = await getToken();
        if (!storedToken) {
          console.warn('Token no disponible');
          return;
        }
        setToken(storedToken);

        const response = await fetch(`${URL_API}/api/v1/posts/get-posts/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Error al obtener posts del servidor:', data);
          return;
        }

      const postsConCamposExtra = data.map((post) => {
        const [day, month, year, hourStr, minute] = post.created_at.split('/');
        const hour = parseInt(hourStr, 10);
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedTime = `${hour12.toString().padStart(2, '0')}:${minute}${ampm}`;
        const formattedDate = `${day}/${month}/${year}`;

        return {
          ...post,
          created_date: formattedDate,
          created_time: formattedTime,
        };
      });
        setMyPost(postsConCamposExtra);

      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchData();
    
  }, []);


  // Función para agregar un nuevo post
  const addPost = async (newPost) => {
    setMockPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts];
      AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts)).catch((error) =>
        console.error('Error al guardar los posts:', error)
      );
      return updatedPosts;
    });
  };

  // Manejar el cambio de estado de "save"
  const handleSaveToggle = async (postId: string, newSaveState: boolean, newSaves: number) => {
    setMockPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId ? { ...post, isSaved: newSaveState, saves: newSaves } : post
      );
      AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts)).catch((error) =>
        console.error('Error al guardar los posts:', error)
      );
      return updatedPosts;
    });
  };

  // Manejar el cambio de estado de "like"
  const handleLikeToggle = async (postId: string, newLikeState: boolean, newLikes: number) => {
    setMockPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId ? { ...post, isLiked: newLikeState, likes: newLikes } : post
      );
      AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts)).catch((error) =>
        console.error('Error al guardar los posts:', error)
      );
      return updatedPosts;
    });
  };

  // Manejar el evento de agregar un comentario
  const handleCommentAdded = async (postId: string, newComments: number, commentText: string) => {
    setMockPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: newComments,
              commentsList: [...(post.commentsList || []), { id: Date.now().toString(), text: commentText }],
            }
          : post
      );
      AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts)).catch((error) =>
        console.error('Error al guardar los posts:', error)
      );
      return updatedPosts;
    });
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost', { addPost });
  };

  return (
    <View style={feedStyles.container}>
      <ScrollView contentContainerStyle={feedStyles.scrollContainer}>
        {myPost.map((post) => (
          <PostCard
            profile_photo={""}
            key={post.id}
            postId={post.id}
            username={`${post.author_first_name} ${post.author_last_name} `}
            handle={post.author}
            date={post.created_date + " "+ post.created_time}
            content={post.content}
            image={URL_API+post.image}
            saves={post.favorites_count}
            likes={post.likes_count}
            comments={post.comments_count}
            commentsList={post.commentsList || []} // Pasamos la lista de comentarios
            isSaved={post.isSaved || false}
            isLiked={post.isLiked || false}
            onSaveToggle={(newSaveState, newSaves) => handleSaveToggle(post.id, newSaveState, newSaves)}
            onLikeToggle={(newLikeState, newLikes) => handleLikeToggle(post.id, newLikeState, newLikes)}
            onCommentAdded={(newComments, commentText) =>
              handleCommentAdded(post.id, newComments, commentText)
            }
          />
        ))}
      </ScrollView>

      <FloatingActionButton onPress={handleCreatePost} />
      <BottomNavBar activeScreen="Feed" />
    </View>
  );
};

export default FeedScreen;