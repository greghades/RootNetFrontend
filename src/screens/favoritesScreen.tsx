import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';

const FavoritesScreen = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);

  // Cargar posts desde AsyncStorage y filtrar los favoritos
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('mockPosts');
        if (savedPosts) {
          const allPosts = JSON.parse(savedPosts);
          const favorites = allPosts.filter((post) => post.isSaved);
          setFavoritePosts(favorites);
        }
      } catch (error) {
        console.error('Error al cargar los favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  // Manejar el cambio de estado de "save"
  const handleSaveToggle = async (postId: string, newSaveState: boolean, newSaves: number) => {
    try {
      const savedPosts = await AsyncStorage.getItem('mockPosts');
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts);
        const updatedPosts = allPosts.map((post) =>
          post.id === postId ? { ...post, isSaved: newSaveState, saves: newSaves } : post
        );

        await AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts));

        if (!newSaveState) {
          setFavoritePosts((prevFavorites) =>
            prevFavorites.filter((post) => post.id !== postId)
          );
        }
      }
    } catch (error) {
      console.error('Error al actualizar el estado de favorito:', error);
    }
  };

  // Manejar el cambio de estado de "like"
  const handleLikeToggle = async (postId: string, newLikeState: boolean, newLikes: number) => {
    try {
      const savedPosts = await AsyncStorage.getItem('mockPosts');
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts);
        const updatedPosts = allPosts.map((post) =>
          post.id === postId ? { ...post, isLiked: newLikeState, likes: newLikes } : post
        );

        await AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts));

        setFavoritePosts((prevFavorites) =>
          prevFavorites.map((post) =>
            post.id === postId ? { ...post, isLiked: newLikeState, likes: newLikes } : post
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar el estado de like:', error);
    }
  };

  // Manejar el evento de agregar un comentario
  const handleCommentAdded = async (postId: string, newComments: number, commentText: string) => {
    try {
      const savedPosts = await AsyncStorage.getItem('mockPosts');
      if (savedPosts) {
        const allPosts = JSON.parse(savedPosts);
        const updatedPosts = allPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comments: newComments,
                commentsList: [...(post.commentsList || []), { id: Date.now().toString(), text: commentText }],
              }
            : post
        );

        await AsyncStorage.setItem('mockPosts', JSON.stringify(updatedPosts));

        setFavoritePosts((prevFavorites) =>
          prevFavorites.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: newComments,
                  commentsList: [...(post.commentsList || []), { id: Date.now().toString(), text: commentText }],
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar el contador de comentarios:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>

      <View style={styles.contentContainer}>
        {favoritePosts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes posts favoritos.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {favoritePosts.map((post) => (
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
                isSaved={post.isSaved}
                isLiked={post.isLiked || false}
                onSaveToggle={(newSaveState, newSaves) => handleSaveToggle(post.id, newSaveState, newSaves)}
                onLikeToggle={(newLikeState, newLikes) => handleLikeToggle(post.id, newLikeState, newLikes)}
                onCommentAdded={(newComments, commentText) =>
                  handleCommentAdded(post.id, newComments, commentText)
                }
              />
            ))}
          </ScrollView>
        )}
      </View>

      <BottomNavBar activeScreen="Favorites" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 24,
    color: COLORS.text,
    textAlign: 'center',
    paddingVertical: 15,
  },
  contentContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: COLORS.secondaryText,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
});

export default FavoritesScreen;