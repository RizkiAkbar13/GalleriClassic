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
  Platform,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


const API_URL = 'https://681b1a0717018fe50579faac.mockapi.io/Api/blog';

  const AddMusicScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [asalDaerah, setAsalDaerah] = useState('');
  const [jenisAlatMusik, setJenisAlatMusik] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetch data:', error);
      Alert.alert('Gagal memuat data', error.message);
    }
  };

  const handleChoosePhoto = async () => {
    try {
      // Buka galeri untuk memilih gambar
      const result = await launchImageLibrary({ 
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 600,
        maxHeight: 600,
        includeBase64: true, // Request base64 data
      });
      
      if (result.didCancel) {
        console.log('User membatalkan pemilihan gambar');
        return;
      }
      
      if (result.errorCode) {
        console.error('Image picker error:', result.errorMessage);
        Alert.alert('Error', `Error pada pemilihan gambar: ${result.errorMessage}`);
        return;
      }
      
      const asset = result.assets?.[0];
      if (!asset) {
        Alert.alert('Gagal', 'Tidak ada gambar yang dipilih');
        return;
      }
  
      setUploading(true);
      
      try {
        // Menggunakan URL gambar lokal untuk sementara waktu
        // Ini adalah fallback karena kita tidak lagi menggunakan Firebase Storage
        const imageUrl = asset.uri;
        
        // Sebagai alternatif, gunakan base64 jika tersedia
        if (asset.base64) {
          const imageBase64 = `data:${asset.type};base64,${asset.base64}`;
          setImage(imageBase64);
          console.log('Menggunakan gambar base64');
        } else {
          // Jika base64 tidak tersedia, gunakan URI langsung
          setImage(imageUrl);
          console.log('Menggunakan URI gambar langsung');
        }
        
        Alert.alert('Sukses', 'Gambar berhasil dipilih!');
      } catch (error) {
        console.error('Error proses gambar:', error);
        Alert.alert('Gagal Memproses Gambar', 'Terjadi kesalahan saat memproses gambar. Silakan coba lagi.');
      } finally {
        setUploading(false);
      }
    } catch (error) {
      console.error('Error umum:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat memproses gambar');
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!asalDaerah || !jenisAlatMusik || !image || !description) {
      return Alert.alert('Peringatan', 'Semua data harus diisi');
    }

    try {
      setUploading(true);
      
      const payload = {
        AsalDaerah: asalDaerah,
        JenisAlatMusik: jenisAlatMusik,
        image, // Ini bisa berupa base64 atau URL
        description,
        createdAt: new Date().toISOString(),
      };

      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditingId(null);
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      setAsalDaerah('');
      setJenisAlatMusik('');
      setImage('');
      setDescription('');
      
      Alert.alert('Sukses', 'Data berhasil disimpan!');
      fetchData();
    } catch (error) {
      console.error('Error submit data:', error);
      Alert.alert('Gagal menyimpan data', error.message);
    } finally {
      setUploading(false);
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

      <TouchableOpacity 
        onPress={handleChoosePhoto} 
        style={[styles.uploadButton, uploading && styles.disabledButton]}
        disabled={uploading}
      >
        {uploading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.uploadButtonText}>Uploading...</Text>
          </View>
        ) : (
          <Text style={styles.uploadButtonText}>
            {image ? 'Ganti Gambar' : 'Upload Gambar'}
          </Text>
        )}
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      ) : null}

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
        disabled={uploading}
      />
      
      {uploading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#3F51B5" />
          <Text style={styles.loadingText}>Menyimpan data...</Text>
        </View>
      )}

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
  uploadButton: {
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 6,
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
    flexDirection: 'column',
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
    flexWrap: 'wrap',
    height: 20, // Increased height for better readability
    overflow: 'hidden', // Hide overflowed text
  },
  cardActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  edit: {
    backgroundColor: '#309898',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 28,
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 5,
  },
  delete: {
    backgroundColor: '#C5172E',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    paddingVertical: 1,
    paddingHorizontal: 21,
    borderRadius: 6,
    textAlign: 'center',
    marginTop: 5,
  },
  viewDetail: {
    backgroundColor: '#27548A',
    color: '#fff',
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