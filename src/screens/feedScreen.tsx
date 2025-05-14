import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { feedStyles } from '../styles/feedStyles';
import { useNavigation } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';
import FloatingActionButton from '../components/FloatingActionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedScreen: React.FC = () => {
  const navigation = useNavigation();
  const [mockPosts, setMockPosts] = useState([]);

  // Cargar posts desde AsyncStorage al montar el componente
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('mockPosts');
        if (savedPosts) {
          setMockPosts(JSON.parse(savedPosts));
        } else {
          const initialPosts = [
            {
              id: '1',
              username: 'Marianee',
              handle: '@marianee',
              date: '1/21/20',
              content:
                'Hey @theflaticon @iconmonstr @pixelsz @ielbruce @romanshamin @vect @glyphish! Check our new article "Top icons Packs and Resources for Web" 😎 marianee.com/blog/top-icons...',
              image: 'https://i.pinimg.com/474x/d7/47/f7/d747f70ce52b0df12c1542b280fa8d76.jpg',
              saves: 7,
              likes: 3,
              comments: 0,
              commentsList: [], // Nuevo campo para los comentarios
              isSaved: false,
              isLiked: false,
            },
            {
              id: '2',
              username: 'Maximillian',
              handle: '@maxjacobson',
              date: '3h',
              content: "Y'ALL ready for this next post?",
              saves: 48,
              likes: 383,
              comments: 0,
              commentsList: [],
              isSaved: false,
              isLiked: false,
            },
            {
              id: '3',
              username: 'Maximillian',
              handle: '@pixelsz',
              date: '3h',
              content: "Y'ALL ready for this next post?",
              saves: 46,
              likes: 383,
              comments: 0,
              commentsList: [],
              isSaved: true,
              isLiked: true,
            },
          ];
          setMockPosts(initialPosts);
          await AsyncStorage.setItem('mockPosts', JSON.stringify(initialPosts));
        }
      } catch (error) {
        console.error('Error al cargar los posts:', error);
      }
    };

    loadPosts();
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
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            postId={post.id}
            username={post.username}
            handle={post.handle}
            date={post.date}
            content={post.content}
            image={post.image}
            saves={post.saves}
            likes={post.likes}
            comments={post.comments}
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