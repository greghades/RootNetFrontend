import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { styles } from '../styles/feedStyles';
import { COLORS } from '../styles/colors';

type Post = {
    id: string;
    username: string;
    handle: string;
    date: string;
    content: string;
    image?: string;
    createdAt: string;
    saves: number;
    likes: number;
    comments: number;
};

const postsData: Post[] = [
    {
        id: '1',
        username: 'Norelvis Peraza',
        handle: '@nore',
        date: 'Hace 5 horas',
        content: '¡Hola RootNet! Esta es mi segunda publicación 🎉',
        image: '',
        createdAt: new Date().toISOString(),
        saves: 12,
        likes: 35,
        comments: 5,
    },
    {
        id: '2',
        username: 'Norelvis Peraza',
        handle: '@nore',
        date: 'Hace 2 días',
        content: '¡Hola RootNet! Esta es mi primera publicación 🎉',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        saves: 8,
        likes: 10,
        comments: 1,
    },
];

const UserProfileWithPosts: React.FC = () => {
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        Alert.alert('¿Eliminar publicación?', '', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                onPress: () => {
                    console.log('Borrando post:', id);
                    // API
                },
                style: 'destructive',
            },
        ]);
    };

    const handleEdit = (post: Post) => {
        const diff = Date.now() - new Date(post.createdAt).getTime();
        const canEdit = diff <= 24 * 60 * 60 * 1000;

        if (canEdit) {
            console.log('Editando post:', post.id);
            // editing screen
        } else {
            Alert.alert('Edición no permitida', 'Solo puedes editar publicaciones dentro de las 24 horas.');
        }
    };

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/profile-user.png')}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.handle}>{item.handle}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedPostId(item.id)}>
                    <Entypo name="dots-three-vertical" size={20} color={COLORS.secondaryText} />
                </TouchableOpacity>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.postImage} />
            ) : null}


            {/* Here are the icon interactions */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome6 name="comment-dots" size={24} color={COLORS.secondaryText} />
                    <Text style={styles.actionText}>{item.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome6 name="heart" size={24} color={COLORS.secondaryText} />
                    <Text style={styles.actionText}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <MaterialIcons name="bookmark-border" size={24} color={COLORS.secondaryText} />
                    <Text style={styles.actionText}>{item.saves}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Edit and delete modal */}
            <Modal
                transparent
                visible={selectedPostId === item.id}
                animationType="fade"
                onRequestClose={() => setSelectedPostId(null)}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedPostId(null)}>
                    <View style={{
                        position: 'absolute',
                        right: 40,
                        top: 305,
                        backgroundColor: COLORS.input,
                        borderRadius: 10,
                        padding: 10,
                        elevation: 5,
                    }}>
                        <TouchableOpacity onPress={() => { handleEdit(item); setSelectedPostId(null); }}>
                            <Text style={{ fontFamily: "Roboto", color: COLORS.text, paddingVertical: 8 }}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleDelete(item.id); setSelectedPostId(null); }}>
                            <Text style={{ fontFamily: "Roboto", color: COLORS.text, paddingVertical: 8 }}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );

    return (
        <FlatList
            data={postsData}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
        />
    );
};

export default UserProfileWithPosts;