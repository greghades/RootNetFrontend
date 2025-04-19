import { COLORS } from '../styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 15,
    marginTop: 25,
    backgroundColor: COLORS.cardBackground,
    position: 'relative',
  },
  userInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  handle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: COLORS.secondaryText,
    marginBottom: 5,
  },
  description: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
    textAlign: 'center',
  },
  joinDate: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 10,
  },
  followContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  followText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: COLORS.secondaryText,
    marginRight: 20,
  },
  followNumber: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  buttonContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  followButton: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    
  },
  followButtonFollowing: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.secondaryText,
  },
  followButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  followButtonTextFollowing: {
    color: COLORS.secondaryText,
  },
  settingsButton: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: COLORS.primary,
  },
  settingsButtonText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1DA1F2', 
  },
  postsContainer: {
    paddingBottom: 80,
  },
});