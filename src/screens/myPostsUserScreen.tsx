import React from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import UserProfileWithPosts from '../components/userProfileWithPosts';
import { styles } from '../styles/myPostsUserStyles';

const ProfileScreen: React.FC = () => {
    // Example data
    const userData = {
        profileImage: require('../assets/images/profile-user.png'),
        username: 'Norelvis Peraza',
        handle: '@nore',
        followers: 83,
        following: 217,
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.profileHeader}>
                <Image source={userData.profileImage} style={styles.avatarLarge} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{userData.username}</Text>
                    <Text style={styles.handle}>{userData.handle}</Text>
                    <View style={styles.followStats}>
                        <Text style={styles.followStatText}>
                            <Text style={{ fontFamily: "Roboto", color: 'rgb(166, 61, 251)'}}>{userData.following}</Text> Seguidos
                        </Text>
                        <Text style={styles.followStatText}>
                            <Text style={{ fontFamily: "Roboto", color: 'rgb(166, 61, 251)', }}>{userData.followers}</Text> Seguidores
                        </Text>
                    </View>
                </View>
            </View>

            <UserProfileWithPosts />
        </SafeAreaView>
    );
};

export default ProfileScreen;