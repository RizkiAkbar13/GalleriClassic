import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import { useFavorites } from '../context/FavoriteContext'; 

const MusicCard = ({ title, description, image, audio }) => {
  const navigation = useNavigation(); 
  const [scaleAnim] = useState(new Animated.Value(1));
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const item = { title, description, image };
  const [isBookmarked, setIsBookmarked] = useState(isFavorite(item)); 

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 200, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      navigation.navigate('MusicDetail', {
        title,
        description,
        image,
        audio,
      });
    });
  };

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    setIsBookmarked(isFavorite(item));
  }, [isFavorite(item)]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={[styles.listItem, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity style={styles.bookmarkIcon} onPress={toggleBookmark}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#000' : '#888'}
          />
        </TouchableOpacity>

        <Image source={image} style={styles.itemImage} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
    width: '100%',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1,
  },
});

export default MusicCard;
