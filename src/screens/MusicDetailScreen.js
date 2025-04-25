import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import Sound from 'react-native-sound';

const MusicDetailScreen = ({ route }) => {
  const { title, description, image, audio } = route.params;
  const soundRef = useRef(null);

  const playSound = () => {
    if (!audio) {
      Alert.alert('Tidak Ada Suara', 'File audio tidak tersedia.');
      return;
    }

    soundRef.current = new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Gagal load sound', error);
        return;
      }
      soundRef.current.play(() => {
        soundRef.current.release();
      });
    });
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
        soundRef.current = null;
      }
    };
  }, []);

  // Deskripsi tambahan berdasarkan title
  const getDetailedText = () => {
    switch (title) {
      case 'Angklung':
        return 'Angklung adalah alat musik tradisional dari bambu yang berasal dari Jawa Barat. Alat ini dimainkan dengan cara digoyangkan, sehingga menghasilkan bunyi yang khas. Angklung sering dimainkan secara berkelompok dan melambangkan semangat kebersamaan.';
      case 'Gamelan':
        return 'Gamelan adalah ansambel musik tradisional dari Jawa Tengah dan Bali yang terdiri dari berbagai instrumen seperti gong, kenong, saron, dan kendang. Biasanya digunakan dalam pertunjukan seni dan upacara adat.';
      case 'Kendang':
        return 'Kendang adalah alat musik pukul yang penting dalam gamelan Jawa dan Bali. Alat ini berbentuk seperti drum dengan dua sisi yang bisa dipukul. Biasanya dimainkan untuk mengatur tempo dan ritme dalam pertunjukan musik tradisional.';
      case 'Rebab':
        return 'Rebab adalah alat musik gesek tradisional yang digunakan dalam ansambel gamelan. Terbuat dari kayu dan kulit, rebab memiliki dua atau tiga senar dan dimainkan dengan cara digesek. Suaranya lembut dan melodius.';
      case 'Siter':
        return 'Siter adalah alat musik petik yang termasuk dalam keluarga gamelan Jawa. Berbentuk kecil seperti kotak dengan dawai yang dipetik menggunakan jari. Digunakan untuk memainkan melodi atau ornamen dalam pertunjukan gamelan.';
      case 'Bonang':
        return 'Bonang adalah salah satu instrumen penting dalam gamelan, terdiri dari deretan gong kecil yang diletakkan pada bingkai kayu. Dimainkan dengan cara dipukul menggunakan pemukul khusus, bonang berfungsi sebagai pengatur melodi.';
      case 'Slenthem':
        return 'Slenthem adalah alat musik pukul dalam gamelan Jawa yang memiliki bilah logam besar dan menghasilkan suara rendah. Dimainkan dengan pemukul berlapis kain, slenthem membantu mengisi harmoni dasar dari komposisi musik gamelan.';
      case 'Saluang':
        return 'Saluang adalah alat musik tiup dari Minangkabau, Sumatera Barat. Terbuat dari bambu tipis, alat musik ini menghasilkan bunyi merdu dan dimainkan dengan teknik pernapasan sirkular.';
      case 'Kolintang':
        return 'Kolintang adalah alat musik perkusi tradisional dari Sulawesi Utara, terbuat dari kayu dan dimainkan dengan cara dipukul. Kolintang memiliki susunan nada seperti piano dan sering digunakan dalam pertunjukan budaya.';
      case 'Tifa':
        return 'Tifa adalah alat musik pukul khas Papua dan Maluku. Terbuat dari kayu dan dimainkan dengan tangan, tifa biasa digunakan dalam upacara adat dan tarian tradisional.';
      case 'Saluang':
        return 'Saluang adalah alat musik tiup tradisional Minangkabau dari Sumatera Barat, terbuat dari bambu tipis. Dimainkan dengan teknik pernapasan sirkular, saluang menghasilkan melodi lembut dan mendayu, sering digunakan dalam musik tradisional Minang.';
      case 'Talempong':
        return 'Talempong adalah alat musik pukul tradisional Sumatera Barat yang terdiri dari gong kecil berbahan logam. Talempong dimainkan dengan pemukul dan menghasilkan suara ritmis, sering digunakan dalam pertunjukan tari dan upacara adat.';
      case 'Rebab Piaman':
        return 'Rebab Piaman adalah versi lokal dari rebab di Sumatera Barat, dimainkan dengan cara digesek. Alat ini sering digunakan dalam pertunjukan tradisional Minangkabau untuk mengiringi nyanyian atau cerita rakyat.';
      case 'Gambus':
        return 'Gambus adalah alat musik petik yang berasal dari Timur Tengah dan berkembang di Riau. Memiliki bentuk menyerupai gitar dengan suara lembut dan sering digunakan dalam musik Melayu bernuansa islami.';
      case 'Kompang':
        return 'Kompang adalah alat musik perkusi berbentuk seperti rebana yang berasal dari Riau. Dimainkan dengan tangan dan sering dimainkan berkelompok dalam acara pernikahan, keagamaan, atau penyambutan tamu.';
      case 'Nafiri':
        return 'Nafiri adalah alat musik tiup tradisional dari Riau, berbentuk seperti terompet panjang. Biasanya dimainkan dalam upacara adat dan penyambutan, menghasilkan suara nyaring dan melengking.';
      case 'Serune Kalee':
        return 'Serune Kalee adalah alat musik tiup tradisional dari Aceh yang mirip seruling, namun ujungnya berbentuk corong. Digunakan dalam pertunjukan adat Aceh bersama alat musik lain seperti rapa’i dan geundrang.';
      case 'Babun':
        return 'Babun adalah alat musik pukul tradisional dari Kalimantan Utara yang menyerupai gendang. Alat ini dimainkan dengan tangan dan digunakan untuk mengiringi tarian atau upacara adat suku Dayak.';
      case 'Garantung':
        return 'Garantung adalah alat musik pukul khas Kalimantan Tengah yang terbuat dari kayu dan dimainkan seperti gambang. Garantung menghasilkan nada yang harmonis dan biasanya dimainkan dalam ensambel Dayak.';
      case 'Kadire':
        return 'Kadire adalah alat musik tiup tradisional dari Kalimantan Timur, berbentuk seperti seruling panjang. Kadire digunakan untuk mengiringi nyanyian atau dalam suasana meditasi budaya Dayak.';
      case 'Kintung':
        return 'Kintung adalah alat musik pukul dari Kalimantan Selatan, terbuat dari bilah kayu yang disusun berdasarkan tangga nada. Kintung dimainkan dengan cara dipukul menggunakan stik khusus.';
      case 'Panting':
        return 'Panting adalah alat musik petik khas Banjar dari Kalimantan Selatan yang bentuknya menyerupai gitar kecil. Alat ini biasa digunakan dalam pertunjukan musik Panting dan lagu-lagu daerah Banjar.';
      case 'Sape':
        return 'Sape adalah alat musik petik tradisional suku Dayak di Kalimantan Timur. Memiliki bentuk unik dengan ukiran khas, sape menghasilkan melodi lembut dan digunakan dalam upacara adat dan hiburan.';
      case 'Kolintang':
        return 'Kolintang adalah alat musik perkusi khas Sulawesi Utara yang terbuat dari kayu. Alat ini disusun seperti gambang dan dimainkan dengan cara dipukul. Kolintang digunakan dalam upacara adat, pengiring tari, dan pertunjukan musik daerah.';
      case 'Ganda':
        return 'Ganda adalah alat musik pukul tradisional dari Sulawesi Tenggara yang berbentuk seperti gendang. Alat ini dimainkan dengan tangan dan biasa digunakan dalam acara budaya suku Tolaki dan Muna.';
      case 'Kecapi':
        return 'Kecapi adalah alat musik petik khas Sulawesi Selatan yang sering dimainkan untuk mengiringi lagu-lagu tradisional Bugis-Makassar. Bentuknya menyerupai gitar kecil dengan senar-senar yang dipetik.';
      case 'Leko Boko':
        return 'Leko Boko adalah alat musik gesek tradisional dari Sulawesi Tenggara. Alat ini memiliki bentuk sederhana dengan satu atau dua senar dan dimainkan dalam pertunjukan budaya lokal.';
      case 'PoloPalo':
        return 'PoloPalo adalah alat musik pukul khas Gorontalo yang terdiri dari bilah-bilah bambu yang disusun dan dipukul untuk menghasilkan nada. PoloPalo sering digunakan dalam pertunjukan seni rakyat.';
      case 'Salude':
        return 'Salude adalah alat musik petik tradisional dari Sulawesi Utara yang mirip dengan kecapi. Alat ini digunakan untuk mengiringi lagu daerah dan sebagai media hiburan masyarakat Minahasa.';
      case 'Tifa':
         return 'Tifa adalah alat musik pukul khas Papua yang terbuat dari kayu dan kulit hewan. Alat ini dimainkan dengan cara dipukul dan digunakan dalam upacara adat, tarian perang, dan penyambutan tamu.';
      case 'Guoto':
         return 'Guoto adalah alat musik petik khas Papua Barat. Alat ini menyerupai gitar kecil dengan badan yang memanjang, dan senarnya dipetik untuk menghasilkan nada.';
      case 'Kecapi Mulut':
         return 'Kecapi Mulut adalah alat musik tiup khas suku Asmat. Alat ini dimainkan dengan diletakkan di mulut dan ditiup sambil digetarkan untuk menghasilkan bunyi unik.';
      case 'Pikon':
          return 'Pikon adalah alat musik tiup sekaligus ditarik khas suku Dani. Terbuat dari bambu kecil, pikon menghasilkan suara khas saat ditiup dan ditarik benangnya secara bersamaan.';
      case 'Triton':
          return 'Triton adalah alat musik tiup dari Papua Selatan yang berasal dari kulit kerang besar. Alat ini ditiup untuk menghasilkan suara bergema dan sering digunakan sebagai penanda atau alat komunikasi.';
      case 'Yi':
          return 'Yi adalah alat musik pukul tradisional dari daerah pegunungan Papua. Terbuat dari kayu atau bambu dan digunakan dalam upacara adat maupun pertunjukan seni.';
      default:
        return '';
    }
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{getDetailedText()}</Text>
      </View>
      <Button title="Putar Musik" onPress={playSound} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#f9f9f9', // Latar belakang lebih terang untuk kontras
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
    borderRadius: 8, // Menambahkan rounded corners pada gambar
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Warna lebih gelap untuk judul
    marginBottom: 8,
    textAlign: 'center', // Memusatkan judul
  },
  description: {
    fontSize: 18,
    marginBottom: 12,
    color: '#555', // Warna teks lebih soft
    textAlign: 'justify', // Justify agar teks lebih rata
  },
  detailContainer: {
    backgroundColor: '#fff', // Latar belakang putih untuk detail deskripsi
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    shadowColor: '#000', // Memberikan bayangan halus
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  detailText: {
    fontSize: 16,
    color: '#333', // Warna teks utama yang gelap
    lineHeight: 24, // Jarak antar baris agar lebih nyaman dibaca
    textAlign: 'justify', // Justify agar teks lebih rata
  },
});

export default MusicDetailScreen;
