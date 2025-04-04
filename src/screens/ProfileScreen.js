import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Logika untuk logout, misalnya menghapus token atau redirect ke halaman login
    console.log('Logout button clicked');
  };

  return (
    <View style={styles.container}>
      {/* Header dengan tombol kembali */}
      <View style={styles.header}>
      </View>

      {/* Container foto profil */}
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImageWrapper}>
          <Text style={styles.profileIcon}>👤</Text>
        </View>
      </View>

      {/* Nama user di bawah foto */}
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>Muhammad Rizki Akbar </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Informasi profil */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text style={styles.infoText}>Muhammad Rizki Akbar</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>✉️</Text>
            <Text style={styles.infoText}>akbarrizky187@gmail.com</Text>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🔒</Text>
            <Text style={styles.infoText}>Password</Text>
            <TouchableOpacity style={styles.refreshButton}>
              <Text style={styles.refreshButtonText}>🔄</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tombol Edit Profil */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </TouchableOpacity>

        {/* Tombol Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Latar belakang abu-abu muda
  },
  header: {
    backgroundColor: '#27548A', 
    height: 170,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: -50,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileIcon: {
    fontSize: 48,
    color: '#8069c9',
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  nameText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 24,
    textAlign: 'center',
    color: '#8069c9',
  },
  infoText: {
    fontSize: 16,
    color: '#9e9e9e',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 50,
  },
  refreshButton: {
    padding: 5,
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#9e9e9e',
  },
  editButton: {
    backgroundColor: '#27548A',
    borderRadius: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#5C7285', // Merah untuk tombol logout
    borderRadius: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 50, // Memberi jarak di bawah
    marginHorizontal: 1, 
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
