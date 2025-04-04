import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { itemList } from '../data'; // Pastikan path ini benar

const MusicCategoryScreen = ({ route }) => {
  const { categoryName } = route.params;

  // Filter itemList berdasarkan kategori
  const filteredItems = itemList.filter(item => {
    if (categoryName === 'Jawa') {
        return ['Angklung', 'Gamelan', 'Kendang', 'Rebab', 'Siter', 'Bonang', 'Slenthem'].includes(item.title);
    } else if (categoryName === 'Sulawesi') {
        return ['Ganda','Kecapi','Kolintang','Leko Boko','PoloPalo','Salude'].includes(item.title);
    } else if (categoryName === 'Papua') {
        return ['Guoto','Guoto','Kecapi Mulut','Pikon','Tifa','Triton','Yi'].includes(item.title);
    } else if (categoryName === 'Sumatra') {
        return ['Saluang', 'Talempong','Rebab Piaman','Kompang','Gambus','Serune Kalee','Nafiri'].includes(item.title);
    }else if (categoryName === 'Kalimantan') {
        return ['Babun','Garantung','Kadire','Kintung','Panting','Sape'].includes(item.title);
    }
    return false;
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{categoryName}</Text>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default MusicCategoryScreen;
