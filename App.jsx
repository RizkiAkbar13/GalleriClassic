import React from 'react';
import { 
  View, Text, TextInput, Image, StyleSheet, StatusBar, FlatList, TouchableOpacity, SafeAreaView
} from 'react-native';

const categories = [
  { id: '1', name: 'Jawa', image: require('./src/assets/atributdaerah/jawa.png') },
  { id: '2', name: 'Sumatra', image: require('./src/assets/atributdaerah/sumatra.png') },
  { id: '3', name: 'Kalimantan', image: require('./src/assets/atributdaerah/kalimantan.png') },
  { id: '4', name: 'Sulawesi', image: require('./src/assets/atributdaerah/sulawesi.png') },
  { id: '5', name: 'Papua', image: require('./src/assets/atributdaerah/papua.png') },
];

const itemList = [
  { id: '1', title: 'Angklung', description: 'Alat musik khas Jawa Barat yang terbuat dari bambu.', image: require('./src/assets/alatmusik/angklung.png') },
  { id: '2', title: 'Gamelan', description: 'Ensemble musik tradisional dari Jawa dan Bali.', image: require('./src/assets/alatmusik/gamelan.png') },
  { id: '3', title: 'Sasando', description: 'Alat musik dawai dari Nusa Tenggara Timur.', image: require('./src/assets/alatmusik/sasando.png') },
  { id: '4', title: 'Kolintang', description: 'Alat musik perkusi khas Sulawesi Utara.', image: require('./src/assets/alatmusik/kolintang.png') },
  { id: '5', title: 'Tifa', description: 'Alat musik pukul khas Papua.', image: require('./src/assets/alatmusik/tifa.png') },
];

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#475c6c" />
      <FlatList 
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.greeting}>Selamat datang</Text>
              <Image source={require('./src/assets/profil.png')} style={styles.profileImage} />
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari Jenis Alat Musik"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            <View style={styles.categoryContainer}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Categories</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList 
                data={categories}
                horizontal
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.categoryCard}>
                    <Image source={item.image} style={styles.categoryImage} />
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text style={styles.listTitle}>Alat Musik Tradisional</Text>
          </>
        }
        data={itemList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#475c6c',
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  greeting: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#A9A9A9',
  },
  categoryContainer: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    color: '#4CAF50',
  },
  categoryCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
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
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 5,
  },
  itemTextContainer: {
    flex: 1, // Membuat container mengikuti lebar yang tersedia
    flexShrink: 1, // Memastikan teks mengecil jika tidak cukup ruang
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
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    tintColor: 'white', // Menjadikan gambar berwarna putih
  },  
  textContainer: {
    flex: 1,
    flexShrink: 1,
    width: '100%',
  },
  
});

export default App;
