import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/editPostsUserStyles';

const EditPostsUserScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { post } = route.params || {};

    if (!post) {
        console.error('Error: No se recibieron datos de la publicación.');
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: No se encontró la publicación para editar</Text>
            </View>
        );
    }

    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image || '');

    const handleSave = () => {
        const updatedPost = { ...post, content, image };
        console.log('Publicación actualizada:', updatedPost);
        // Implementar lógica de guardado...
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Editar Publicación</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={setContent}
                multiline
                placeholderTextColor="#888"
                placeholder="Escribe algo..."
            />
            
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditPostsUserScreen;