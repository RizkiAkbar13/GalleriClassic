import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const API_URL = 'https://681b1a0717018fe50579faac.mockapi.io/Api/blog';

const AddMusicScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [asalDaerah, setAsalDaerah] = useState('');
  const [jenisAlatMusik, setJenisAlatMusik] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (error) {
      Alert.alert('Gagal memuat data', error.message);
    }
  };

  const handleSubmit = async () => {
    if (!asalDaerah || !jenisAlatMusik || !image || !description) {
      return Alert.alert('Semua data harus diisi');
    }

    const payload = {
      AsalDaerah: asalDaerah,
      JenisAlatMusik: jenisAlatMusik,
      image,
      description,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      setAsalDaerah('');
      setJenisAlatMusik('');
      setImage('');
      setDescription('');
      fetchData();
    } catch (error) {
      Alert.alert('Gagal menyimpan data', error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setAsalDaerah(item.AsalDaerah);
    setJenisAlatMusik(item.JenisAlatMusik);
    setImage(item.image);
    setDescription(item.description);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      Alert.alert('Gagal menghapus data', error.message);
    }
  };

  const handleCardClick = (item) => {
    // Navigasi ke halaman DetailAlatMusikScreen dengan membawa item yang dipilih
    navigation.navigate('DetailAlatMusik', { item });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Alat Musik</Text>

      <TextInput
        style={styles.input}
        placeholder="Asal Daerah"
        value={asalDaerah}
        onChangeText={setAsalDaerah}
      />
      <TextInput
        style={styles.input}
        placeholder="Jenis Alat Musik"
        value={jenisAlatMusik}
        onChangeText={setJenisAlatMusik}
      />
      <TextInput
        style={styles.input}
        placeholder="URL Gambar"
        value={image}
        onChangeText={setImage}
      />
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Deskripsi"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button
        title={editingId ? 'Update' : 'Simpan'}
        onPress={handleSubmit}
        color="#3F51B5"
      />

      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.musicCard}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.JenisAlatMusik}</Text>
                <Text style={styles.cardSubtitle}>{item.AsalDaerah}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.delete}>Hapus</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCardClick(item)}>
                  <Text style={styles.viewDetail}>Lihat Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      padding: 9,
      marginBottom: 10,
      borderRadius: 6,
      borderColor: '#ccc',
    },
    musicCard: {
      flexDirection: 'row',
      backgroundColor: '#f4f4f4',
      padding: 10,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardImage: {
      width: 70,
      height: 70,
      borderRadius: 8,
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
      flexDirection: 'column', // To stack title, subtitle and description
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#333',
      marginTop: 2,
    },
    cardDescription: {
      fontSize: 12,
      color: '#666',
      marginTop: 4,
      flexWrap: 'wrap', // Wrap text if too long
      height: 4, // Set a fixed height
      overflow: 'hidden', // Hide overflowed text
    },
    cardActions: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginLeft: 10,
    },
  edit: {
    backgroundColor: '#309898', // Warna hijau segar
    color: '#fff', // Teks putih agar kontras
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 28,
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 5,
  },
  delete: {
    backgroundColor: '#C5172E', // Merah oranye
    color: '#fff', // Teks putih
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 21,
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 5,
  },
  viewDetail: {
    backgroundColor: '#27548A', // Biru terang
    color: '#fff', // Teks putih
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 5,
  },

});

export default AddMusicScreen;
