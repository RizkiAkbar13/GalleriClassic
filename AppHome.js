import React from 'react';
import { 
  View, Text, TextInput, Image, StyleSheet, StatusBar, FlatList, TouchableOpacity, SafeAreaView, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categories, itemList } from './src/data';
import CategoryCard from './src/components/CategoryCard';
import MusicCard from './src/components/MusicCard';

function AppHome() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={require('./src/assets/batik.png')} 
      style={styles.background}
      imageStyle={{ opacity: 0.1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#475c6c" />
        <FlatList 
          ListHeaderComponent={
            <>
              <ImageBackground source={require('./src/assets/batik.png')} style={styles.header}>
                <Text style={styles.greeting}>Selamat datang</Text>

                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image source={require('./src/assets/profil.png')} style={styles.profileImage} />
                </TouchableOpacity>
              </ImageBackground>
              
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
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                  renderItem={({ item }) => (
                    <CategoryCard name={item.name} image={item.image} />
                  )}
                />
              </View>

              <Text style={styles.listTitle}>Alat Musik Tradisional</Text>
            </>
          }
          data={itemList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MusicCard
              title={item.title}
              description={item.description}
              image={item.image}
              audio={item.audio}
              navigation={navigation} 
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, backgroundColor: 'transparent' },
  header: {
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  greeting: { fontSize: 25, fontWeight: 'bold', color: 'white' },
  profileImage: { width: 35, height: 35, borderRadius: 17.5 },
  searchContainer: { marginTop: 20, paddingHorizontal: 20 },
  searchInput: { backgroundColor: '#F5F5F5', borderRadius: 10, padding: 10, fontSize: 16, color: '#A9A9A9' },
  categoryContainer: { marginTop: 10, paddingHorizontal: 15 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryTitle: { fontSize: 25, fontWeight: 'bold' },
  seeAll: { fontSize: 14, color: '#4CAF50' },
  listTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, paddingHorizontal: 20 },
});

export default AppHome;
