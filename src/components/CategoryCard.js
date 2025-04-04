import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryCard = ({ name, image, musicList }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('MusicCategory', { categoryName: name, musicList })}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
     fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryCard;
