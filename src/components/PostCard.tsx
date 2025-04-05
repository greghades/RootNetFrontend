import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from '../styles/colors';
import { styles } from '../styles/feedStyles'; 

// Props for component PostCard
type PostCardProps = {
  username: string;
  handle: string;
  date: string;
  content: string;
  image?: string;
  saves: number;
  likes: number;
  comments: number;
};

const PostCard: React.FC<PostCardProps> = ({
  username,
  handle,
  date,
  content,
  image,
  saves,
  likes,
  comments,
}) => {
  return (
    <View style={styles.container}>
      {/* Profile photo and user data */}
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

      {/* Post content */}
      <Text style={styles.content}>{content}</Text>

      {/* Image (if it exists) */}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Interaction icons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="comment-dots" size={24} color={COLORS.secondaryText}  />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome6 name="heart" size={24} color={COLORS.secondaryText}  />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="bookmark-border" size={24} color={COLORS.secondaryText} />
          <Text style={styles.actionText}>{saves}</Text>
        </TouchableOpacity>
      </View>

      {/* dividing line */}
      <View style={styles.divider} />
    </View>
  );
};



export default PostCard;