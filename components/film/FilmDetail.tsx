import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Film } from '../../api/models';

interface FilmDetailRouteParams {
  film: Film;
}

const FilmDetail: React.FC = () => {
  const route = useRoute();
  const { film } = route.params as FilmDetailRouteParams;

  return (
    <ImageBackground
      source={require('../../assets/image11.png')} // Asegúrate de que la ruta sea correcta
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{film.title}</Text>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{film.title}</Text>
          <Text style={styles.label}>Director:</Text>
          <Text style={styles.value}>{film.director}</Text>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{film.duration} minutes</Text>
          <Text style={styles.label}>Release Date:</Text>
          <Text style={styles.value}>{film.releaseDate}</Text>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{film.genre}</Text>
          <Text style={styles.label}>Box Office:</Text>
          <Text style={styles.value}>{film.box_office}</Text>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{film.rating}</Text>
          <Text style={styles.label}>Summary:</Text>
          <Text style={styles.value}>{film.summary}</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ajusta la imagen para cubrir todo el contenedor
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 800, // Opcional: limita el ancho para una mejor legibilidad
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para hacer el texto legible
    borderRadius: 10,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffdb58', // Color dorado
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#ffffff', // Color blanco
  },
  value: {
    fontSize: 18,
    marginBottom: 8,
    color: '#c0c0c0', // Color plata
  },
});

export default FilmDetail;
