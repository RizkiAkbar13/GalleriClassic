// src/screens/MusicCategoryScreen.jsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { itemList } from '../data';
import MusicCard from '../components/MusicCard';

const MusicCategoryScreen = ({ route, navigation }) => {
  const { categoryName } = route.params;

  const filteredItems = itemList.filter(item => {
    if (categoryName === 'Jawa') {
      return ['Angklung', 'Gamelan', 'Kendang', 'Rebab', 'Siter', 'Bonang', 'Slenthem'].includes(item.title);
    } else if (categoryName === 'Sulawesi') {
      return ['Ganda', 'Kecapi', 'Kolintang', 'Leko Boko', 'PoloPalo', 'Salude'].includes(item.title);
    } else if (categoryName === 'Papua') {
      return ['Guoto', 'Kecapi Mulut', 'Pikon', 'Tifa', 'Triton', 'Yi'].includes(item.title);
    } else if (categoryName === 'Sumatra') {
      return ['Saluang', 'Talempong', 'Rebab Piaman', 'Kompang', 'Gambus', 'Serune Kalee', 'Nafiri'].includes(item.title);
    } else if (categoryName === 'Kalimantan') {
      return ['Babun', 'Garantung', 'Kadire', 'Kintung', 'Panting', 'Sape'].includes(item.title);
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alat Musik {categoryName}</Text>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <MusicCard
            title={item.title}
            description={item.description}
            image={item.image}
            audio={item.audio}
            navigation={navigation} // penting agar navigasi detail jalan
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default MusicCategoryScreen;
