import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const MusicCard = ({ title, description, image }) => {
  const [scaleAnim] = useState(new Animated.Value(1)); // State animasi skala

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1, // Membesarkan kartu
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Kembali ke ukuran normal
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View style={[styles.listItem, { transform: [{ scale: scaleAnim }] }]}> 
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
    flexWrap: 'wrap',
    elevation: 3, // Tambahkan shadow untuk efek lebih menarik di Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
