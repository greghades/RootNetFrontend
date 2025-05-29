import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, FlatList, Modal, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { styles } from '../styles/feedStyles';
import { COLORS } from '../styles/colors';
import { getToken, getUserData, PostResponse, UserDataResponse, URL_API } from '../config/constante';



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
    {
        id: '3',
        username: 'Norelvis Peraza',
        handle: '@nore',
        date: 'Hace 5 días',
        content: '¡Hola estoy en RootNet! 🎉',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        saves: 0,
        likes: 1,
        comments: 0,
    },
];

const UserProfileWithPosts: React.FC = () => {
    const navigation = useNavigation();
    const [modalsVisible, setModalsVisible] = useState<{ [key: string]: boolean }>({});
    const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | null>(null);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [token, setToken] = useState<string | null>(null);
    const [myPost, setMyPost] = useState<[PostResponse] | []>([]);
    const [userData, setUserData] = useState< UserDataResponse | null>(null);

    useEffect(() => {
        const fetchData = async () : Promise<void> => {
          try {
            const storedToken = await getToken();
            if (!storedToken) {
              console.warn('Token no disponible');
              return;
            }
            setToken(storedToken);
            const storedUserData = await getUserData();
            setUserData(storedUserData);

            const response = await fetch(`${URL_API}/api/v1/posts/get-owner-posts/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`,
              },
              body: JSON.stringify({
                user_id: userData.id
              })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
              console.log('Error al obtener posts del servidor:', data);
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
            console.log('Error al obtener los posts:', error);
          }
        };
    
        fetchData();
        
      }, []);
    
    const measurePosition = (event: any) => {
        event.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            let adjustedX = pageX;
            let adjustedY = pageY;
    
            // Prevent the modal from going off to the right
            if (pageX + 109 > screenWidth) { // 109 is an estimated width of the modal
                adjustedX = screenWidth - 109; 
            }
    
            // Prevent the modal from popping out at the bottom
            if (pageY + 150 > screenHeight) { // 150 is an estimated height of the modal
                adjustedY = screenHeight - 150;
            }
    
            setModalPosition({ x: adjustedX, y: adjustedY });
        });
    };

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
        const diff = Date.now() - new Date(post.created_at).getTime();
        const canEdit = diff <= 24 * 60 * 60 * 1000;

        if (canEdit) {
            console.log('Editando post:', post.id);
            navigation.navigate('EditPosts', { post });
        } else {
            Alert.alert('Edición no permitida', 'Solo puedes editar publicaciones dentro de las 24 horas.');
        }
    };

    const showModal = (id: string) => {
        setModalsVisible(prev => ({ ...prev, [id]: true }));
    };

    const hideModal = (id: string) => {
        setModalsVisible(prev => ({ ...prev, [id]: false }));
    };

    const renderPost = ({ item }: { item: Post }) => (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={URL_API + item.image}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{item.author}</Text>
                    <Text style={styles.handle}>{item.author}</Text>
                    <Text style={styles.date}>{item.created_date + " "+ item.created_time}</Text>
                </View>
                <TouchableOpacity
                    onPress={(event) => {
                        measurePosition(event);
                        showModal(item.id);
                    }}
                >
                    <Entypo name="dots-three-vertical" size={20} color={COLORS.secondaryText} />
                </TouchableOpacity>
            </View>

            <Text style={styles.content}>{item.content}</Text>

            {item.image ? (
                <Image source={{ uri: URL_API + item.image }} style={styles.postImage} />
            ) : null}

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

            {/* Modal for individual options */}
            <Modal
                transparent
                visible={!!modalsVisible[item.id]}
                animationType="fade"
                onRequestClose={() => hideModal(item.id)}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => hideModal(item.id)}>
                    <View style={{
                        position: 'absolute',
                        left: modalPosition?.x || 0,
                        top: modalPosition?.y || 0,
                        backgroundColor: COLORS.input,
                        borderRadius: 10,
                        padding: 10,
                        elevation: 5,                
                    }}>
                        <TouchableOpacity onPress={() => { handleEdit(item); hideModal(item.id); }}>
                            <Text style={{ fontFamily: "Roboto", color: COLORS.text, paddingVertical: 8 }}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleDelete(item.id); hideModal(item.id); }}>
                            <Text style={{ fontFamily: "Roboto", color: COLORS.text, paddingVertical: 8 }}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );

    return (
        <FlatList
            data={postsConCamposExtra}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
        />
    );
};

export default UserProfileWithPosts;