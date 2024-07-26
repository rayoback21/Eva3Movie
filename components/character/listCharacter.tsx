import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Character } from '../../api/models';
import apiClient from '../../api/apliClients';
import { FontAwesome } from '@expo/vector-icons';


const ListCharacter = ({ route, navigation }: any) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { scene_id } = route.params;
  
    useEffect(() => {
      fetchCharacters();
    }, []);
  
    const fetchCharacters = async () => {
      try {
        const response = await apiClient.get(`/characters?scene_id=${scene_id}`);
        setCharacters(response.data);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
  
    const deleteCharacter = async (id: number) => {
      try {
        await apiClient.delete(`/characters/${id}`);
        setCharacters(prevCharacters => prevCharacters.filter(character => character.id !== id));
      } catch (err) {
        setError('Failed to delete character');
      }
    };
  
    const updateCharacter = (updatedCharacter: Character) => {
      setCharacters(prevCharacters => prevCharacters.map(character => character.id === updatedCharacter.id ? updatedCharacter : character));
    };
  
    const addCharacter = (newCharacter: Character) => {
      setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
    };
  
    const renderCharacter = ({ item }: { item: Character }) => (
      <View style={styles.characterContainer}>
        <Text style={styles.characterText}>{item.full_name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('EditCharacter', { character: item, onUpdate: updateCharacter })}
          >
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => deleteCharacter(item.id)}
          >
            <FontAwesome name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>{error}</Text>;
    }
  
    return (
      <ImageBackground source={require('../assets/image9.png')} style={styles.background}>
       
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateCharacter', { scene_id, onCreate: addCharacter })}
          >
            <FontAwesome name="plus" size={24} color="white" />
            <Text style={styles.createButtonText}>Create New Character</Text>
          </TouchableOpacity>
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCharacter}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('FilmsList')}>
            <FontAwesome name="film" size={24} color="white" />
            <Text style={styles.backButtonText}>Back to Films</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 10,
      margin: 20,
    },
    characterContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    characterText: {
      color: '#fff',
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    iconButton: {
      marginHorizontal: 10,
    },
    createButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderColor: '#ffd700',
      borderWidth: 1,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    createButtonText: {
      color: '#ffd700',
      fontSize: 16,
      marginLeft: 10,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderColor: '#ffd700',
      borderWidth: 1,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    backButtonText: {
      color: '#ffd700',
      fontSize: 16,
      marginLeft: 10,
    },
  });
  
  export default ListCharacter;