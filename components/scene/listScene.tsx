import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Scene } from '../../api/models';
import apiClient from '../../api/apliClients';

const ListScene = ({ route, navigation }: any) => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { filmId } = route.params;

  useEffect(() => {
    fetchScenes();
    const focusListener = navigation.addListener('focus', fetchScenes);

    return () => {
      navigation.removeListener('focus', fetchScenes);
    };
  }, []);

  const fetchScenes = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/scene?film_id=${filmId}`);
      setScenes(response.data);
    } catch (err) {
      setError('Failed to fetch scenes');
    } finally {
      setLoading(false);
    }
  };

  const deleteScene = async (id: number) => {
    try {
      await apiClient.delete(`/scene/${id}`);
      fetchScenes(); // Refetch scenes after deletion
    } catch (err) {
      setError('Failed to delete scene');
    }
  };

  const renderScene = ({ item }: { item: Scene }) => (
    <TouchableOpacity 
      style={styles.banner}
      onPress={() => navigation.navigate('ListCharacter', { scene_id: item.id })}
    >
      <View style={styles.bannerContent}>
        <Text style={styles.bannerText}>{item.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('EditScene', { scene: item })}>
            <Icon name="edit" size={30} color="#ffd700" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteScene(item.id)}>
            <Icon name="trash" size={30} color="#ffd700" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ViewScene', { scene: item })}>
            <Icon name="eye" size={30} color="#ffd700" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ImageBackground source={require('../assets/image5.png')} style={styles.background}>
   
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateScene', { filmId })}
        >
          <Text style={styles.createButtonText}>Create New Scene</Text>
        </TouchableOpacity>
        <FlatList
          data={scenes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderScene}
        />
      </View>
      </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Light Grey
    padding: 10,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  banner: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffd700',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    marginVertical: 5,
    borderRadius: 10,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerText: {
    color: '#ffd700',
    fontSize: 18,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
  },
  createButton: {
    backgroundColor: '#ffd700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ListScene;