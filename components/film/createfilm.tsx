import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, Alert, ImageBackground, Text } from 'react-native';
import apiClient from '../../api/apliClients';
import { Film } from '../../api/models';

const CreateScreen = ({ navigation }: any) => {
  const [film, setFilm] = useState<Film>({
    id: 0,
    title: '',
    director: '',
    duration: 0,
    releaseDate: '',
    genre: '',
    box_office: 0,
    rating: 0,
    summary: 0
  });

  const handleSave = async () => {
    try {
      await apiClient.post('/film', film);
      Alert.alert('Success', 'Film created successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create film');
    }
  };

  return (
    <ImageBackground source={require('../assets/image7.png')} style={styles.background}>
    
      <View style={styles.overlay}>
        <Text style={styles.title}>Create a New Film</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#bdbdbd"
          value={film.title}
          onChangeText={text => setFilm({ ...film, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Director"
          placeholderTextColor="#bdbdbd"
          value={film.director}
          onChangeText={text => setFilm({ ...film, director: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Duration"
          placeholderTextColor="#bdbdbd"
          value={film.duration.toString()}
          onChangeText={text => setFilm({ ...film, duration: parseFloat(text) })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Release Date"
          placeholderTextColor="#bdbdbd"
          value={film.releaseDate}
          onChangeText={text => setFilm({ ...film, releaseDate: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre"
          placeholderTextColor="#bdbdbd"
          value={film.genre}
          onChangeText={text => setFilm({ ...film, genre: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Box Office "
          placeholderTextColor="#bdbdbd"
          value={film.box_office.toString()}
          onChangeText={text => setFilm({ ...film, box_office: parseFloat(text) })}
          keyboardType="numeric"
        />
         <TextInput
          style={styles.input}
          placeholder="Rating"
          placeholderTextColor="#bdbdbd"
          value={film.rating.toString()}
          onChangeText={text => setFilm({ ...film, rating: parseFloat(text) })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Summary"
          placeholderTextColor="#bdbdbd"
          value={film.summary.toString()}
          onChangeText={text => setFilm({ ...film, summary: parseFloat(text) })}
        />
        <Button title="Save" onPress={handleSave} color="#b22222" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#ffd700', // Texto dorado
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'HarryPotterFont', // Asegúrate de tener una fuente de estilo Harry Potter
  },
  input: {
    height: 40,
    borderColor: '#ffd700', // Bordes dorados
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.3)',// Fondo de los inputs rojo oscuro
    color: '#ffffff', // Texto blanco
  },
});

export default CreateScreen;