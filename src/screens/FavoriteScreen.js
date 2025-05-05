import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useFavorites } from '../context/FavoriteContext';
import MusicCard from '../components/MusicCard';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native'; // ⬅️ tambahkan ini

const FavoriteScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('MusicDetail', { item }); // ⬅️ pastikan "MusicDetail" cocok dengan nama screen kamu
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
        Favorit Alat Musik Tradisional
      </Text>

      {favorites.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 400 }}>Belum ada item favorit.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <MusicCard
                title={item.title}
                description={item.description}
                image={item.image}
                audio={item.audio}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingTop: 20 }}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;
