import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../styles/colors';
import { styles } from '../styles/feedStyles';

type PostCardProps = {
  username: string;
  handle: string;
  date: string;
  content: string;
  image?: string;
  saves: number;
  likes: number;
  comments: number;
  commentsList: { id: string; text: string }[];
  onSaveToggle: (newSaveState: boolean, newSaves: number) => void;
  isSaved: boolean;
  onLikeToggle: (newLikeState: boolean, newLikes: number) => void;
  isLiked: boolean;
  onCommentAdded: (newComments: number, commentText: string) => void;
  postId: string;
  likedBy?: string;
  onMorePress: (postId: string, action: 'delete' | 'edit' | 'report') => void; // Nuevo callback
  isOwnPost: boolean; // Para determinar si el post pertenece al usuario autenticado
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
  commentsList,
  onSaveToggle,
  isSaved,
  onLikeToggle,
  isLiked,
  onCommentAdded,
  postId,
  likedBy,
  onMorePress,
  isOwnPost,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showMoreModal, setShowMoreModal] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSaveToggle = () => {
    if (onSaveToggle) {
      const newSaves = isSaved ? saves - 1 : saves + 1;
      onSaveToggle(!isSaved, newSaves);
    }
  };

  const handleLikeToggle = () => {
    if (onLikeToggle) {
      const newLikes = isLiked ? likes - 1 : likes + 1;
      onLikeToggle(!isLiked, newLikes);
    }
  };

  const handleCommentPress = () => {
    setShowCommentInput(!showCommentInput);
    if (!showCommentInput) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComments = comments + 1;
      onCommentAdded(newComments, commentText);
      setCommentText('');
    }
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', { username, handle });
  };

  const handleMorePress = () => {
    setShowMoreModal(true);
  };

  const handleModalAction = (action: 'delete' | 'edit' | 'report') => {
    setShowMoreModal(false);
    onMorePress(postId, action);
  };

  return (
    <View style={styles.container}>
 
      {/* Profile photo and user data */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require('../assets/images/default-profile.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={styles.userInfoRow}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.handle}>{handle}</Text>
            <Text style={styles.date}>· {date}</Text>
          </View>
        </View>
        {/* Ícono de "más opciones" */}
        <TouchableOpacity onPress={handleMorePress} style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color={COLORS.secondaryText} />
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.actionButton} onPress={handleCommentPress}>
          <FontAwesome6 name="comment-dots" size={24} color={COLORS.secondaryText} />
          <Text style={styles.actionText}>{comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikeToggle}>
          <FontAwesome6
            name="heart"
            size={24}
            color={isLiked ? '#FF0000' : COLORS.secondaryText}
            solid={isLiked}
          />
          <Text style={styles.actionText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleSaveToggle}>
          <MaterialIcons
            name={isSaved ? 'bookmark' : 'bookmark-border'}
            size={24}
            color={isSaved ? COLORS.accent : COLORS.secondaryText}
          />
          <Text style={styles.actionText}>{saves}</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de comentarios */}
      {showCommentInput && (
        <View style={styles.commentsSection}>
          {commentsList.length > 0 ? (
            commentsList.map((comment) => (
              <View key={comment.id} style={styles.commentContainer}>
                <Image
                  source={require('../assets/images/default-profile.jpg')}
                  style={styles.commentProfileImage}
                />
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noCommentsText}>No hay comentarios todavía.</Text>
          )}

          <View style={styles.commentInputContainer}>
            <Image
              source={require('../assets/images/default-profile.jpg')}
              style={styles.commentProfileImage}
            />
            <TextInput
              ref={textInputRef}
              style={styles.commentInput}
              placeholder="Escribe un comentario..."
              placeholderTextColor={COLORS.secondaryText}
              value={commentText}
              onChangeText={setCommentText}
              multiline
              onSubmitEditing={handleCommentSubmit}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal de más opciones */}
      <Modal
        transparent={true}
        visible={showMoreModal}
        animationType="fade"
        onRequestClose={() => setShowMoreModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMoreModal(false)}
        >
          <View style={styles.modalContainer}>
            {isOwnPost ? (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleModalAction('delete')}
                >
                  <MaterialIcons name="delete" size={24} color="#FF0000" />
                  <Text style={styles.modalOptionTextDelete}>Eliminar Publicación</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleModalAction('edit')}
                >
                  <MaterialIcons name="edit" size={24} color={COLORS.text} />
                  <Text style={styles.modalOptionText}>Editar Publicación</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => handleModalAction('report')}
              >
                <MaterialIcons name="report" size={24} color={COLORS.text} />
                <Text style={styles.modalOptionText}>Reportar Publicación</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setShowMoreModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={styles.divider} />
    </View>
  );
};

export default PostCard;