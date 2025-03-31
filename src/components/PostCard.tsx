import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../styles/colors';
import { styles } from '../styles/feedStyles'; 

// Props para el componente PostCard
type PostCardProps = {
  username: string;
  handle: string;
  date: string;
  content: string;
  image?: string; // Imagen opcional
  retweets: number;
  likes: number;
  comments: number;
};

const PostCard: React.FC<PostCardProps> = ({
  username,
  handle,
  date,
  content,
  image,
  retweets,
  likes,
  comments,
}) => {
  return (
    <View style={styles.container}>
      {/* Foto de perfil y datos del usuario */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/default-profile.jpg')} // Imagen por defecto
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.handle}>{handle}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      {/* Contenido de la publicación */}
      <Text style={styles.content}>{content}</Text>

      {/* Imagen (si existe) */}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Íconos de interacción */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="retweet" size={20} color={COLORS.secondaryText} />
          <Text style={styles.actionText}>{retweets}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="heart" size={20} color={COLORS.secondaryText} />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="message1" size={20} color={COLORS.secondaryText} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />
    </View>
  );
};



export default PostCard;