import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import { feedStyles } from '../styles/feedStyles'; // Asegúrate de que la ruta sea correcta
import PostCard from '../components/PostCard';
import BottomNavBar from '../components/BottomNavBar';
import FloatingActionButton from '../components/FloatingActionButton';

// Datos estáticos para simular las publicaciones
const mockPosts = [
  {
    username: 'Marianee',
    handle: '@marianee',
    date: '1/21/20',
    content:
      'Hey @theflaticon @iconmonstr @pixelsz @ielbruce @romanshamin @vect @glyphish! Check our new article "Top icons Packs and Resources for Web" 😎 marianee.com/blog/top-icons...',
    image: 'https://i.pinimg.com/474x/d7/47/f7/d747f70ce52b0df12c1542b280fa8d76.jpg', 
    saves: 7,
    likes: 3,
    comments: 0,
  },
  {
    username: 'Maximillian',
    handle: '@maxjacobson',
    date: '3h',
    content: "Y'ALL ready for this next post?",
    saves: 48,
    likes: 383,
    comments: 0,
  },
  {
    username: 'Maximillian',
    handle: '@maxjacobson',
    date: '3h',
    content: "Y'ALL ready for this next post?",
    saves: 46,
    likes: 383,
    comments: 0,
  },
];

const FeedScreen: React.FC = () => {
  const handleCreatePost = () => {
    // Lógica para crear una nueva publicación (por ahora solo un log)
    console.log('Crear nueva publicación');
  };

  return (
    <View style={feedStyles.container}>
      <ScrollView contentContainerStyle={feedStyles.scrollContainer}>
        {mockPosts.map((post, index) => (
          <PostCard
            key={index}
            username={post.username}
            handle={post.handle}
            date={post.date}
            content={post.content}
            image={post.image}
            saves={post.saves}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </ScrollView>

      {/* Botón flotante */}
      <FloatingActionButton onPress={handleCreatePost} />

      {/* Barra de navegación inferior */}
      <BottomNavBar />
    </View>
  );
};

export default FeedScreen;