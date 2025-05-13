import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const DetailAlatMusikScreen = ({ route }) => {
  const { item } = route.params; // Mengambil data yang dikirimkan dari halaman sebelumnya

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{item.JenisAlatMusik}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.subtitle}>Asal Daerah: {item.AsalDaerah}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.createdAt}>Dibuat pada: {item.createdAt}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  createdAt: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default DetailAlatMusikScreen;
