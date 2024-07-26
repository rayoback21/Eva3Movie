import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { Film } from '../../api/models';
import apiClient from '../../api/apliClients';
import { useFocusEffect } from '@react-navigation/native';

const ListFilm = ({ navigation }: any) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchFilms();
    }, [])
  );

  const fetchFilms = async () => {
    try {
      const response = await apiClient.get('/film');
      setFilms(response.data);
    } catch (err) {
      setError('Failed to fetch films');
    } finally {
      setLoading(false);
    }
  };

  const deleteFilm = async (id: number) => {
    try {
      await apiClient.delete(`/film/${id}`);
      fetchFilms(); // Refetch films after deletion
    } catch (err) {
      setError('Failed to delete film');
    }
  };

  const renderFilm = ({ item }: { item: Film }) => (
    <TouchableOpacity 
      style={styles.banner}
      onPress={() => navigation.navigate('ListScene', { scene_id: item.id })}
    >
      <View style={styles.filmContainer}>
        <Text style={styles.filmTitle}>{item.title}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.iconWrapper}>
            <Icon
              name="edit"
              type="font-awesome"
              color="#ffd700" // Gold
              onPress={() => navigation.navigate('EditFilm', { film: item, onUpdate: fetchFilms })}
              containerStyle={styles.iconButton}
            />
          </View>
          <View style={styles.iconWrapper}>
            <Icon
              name="trash"
              type="font-awesome"
              color="#F5F7F3" // Dark Red
              onPress={() => deleteFilm(item.id)}
              containerStyle={styles.iconButton}
            />
          </View>
          <View style={styles.iconWrapper}>
            <Icon
              name="eye"
              type="font-awesome"
              color="#2e86c1" // Blue
              onPress={() => navigation.navigate('FilmDetail', { film: item })}
              containerStyle={styles.iconButton}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ImageBackground 
      source={require('../../assets/imageScreen.png')} 
      style={styles.background} // Apply only the background style
    >
      <View style={styles.container}>
        <FlatList
          data={films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFilm}
        />
        <Icon
          reverse
          name="plus"
          type="font-awesome"
          color="#ffd700" // Gold
          containerStyle={styles.addButton}
          onPress={() => navigation.navigate('CreateFilm')}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    height: '100%',
  },
  filmContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#6c757d', // Grey
    backgroundColor: 'rgba(255, 0, 0, 0.3)', 
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  filmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F7F7F3', // Dark Grey
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrapper: {// Transparent Red
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 0, // Reset margin for the icon
  },
  loadingText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#4b4b4b', // Dark Grey
    marginTop: 20,
  },
  errorText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#d32f2f', // Dark Red
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  banner: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700', // Semi-transparent background
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default ListFilm;
