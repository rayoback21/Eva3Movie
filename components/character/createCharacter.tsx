import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Character } from '../../api/models';
import apiClient from '../../api/apliClients';

const CreateCharacter = ({ route, navigation }: any) => {
    const { scene_id, onCreate } = route.params;
    const [character, setCharacter] = useState<Character>({
     
      id: 0,
      full_name: "",
      description: "",
      cost :0,
      actor: "",
      stock: "",
      rol: ""
    });
  
    const handleInputChange = (field: keyof Character, value: any) => {
      setCharacter({ ...character, [field]: value });
    };
  
    const handleSave = async () => {
      try {
        const response = await apiClient.post('/characters', character);
        Alert.alert('Success', 'Character created successfully');
        onCreate(response.data);
        navigation.goBack();
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to create character');
      }
    };
  
    return (
      <ImageBackground source={require('../assets/image8.png')} style={styles.background}>

         <View style={styles.container}>
          <Text style={styles.label}>Full Name:</Text>
          <TextInput
            value={character.full_name}
            onChangeText={(value) => handleInputChange('full_name', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            value={character.description}
            onChangeText={(value) => handleInputChange('description', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Cost:</Text>
          <TextInput
            value={character.cost.toString()}
            onChangeText={(value) => handleInputChange('cost', Number(value))}
            style={styles.input}
          />
          <Text style={styles.label}>Actor:</Text>
          <TextInput
            value={character.actor}
            onChangeText={(value) => handleInputChange('actor', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Rol:</Text>
          <TextInput
            value={character.rol}
            onChangeText={(value) => handleInputChange('rol', value)}
            style={styles.input}
          
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <FontAwesome name="save" size={24} color="white" />
            <Text style={styles.buttonText}>Save Character</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      padding: 10,
      width: '100%',
      height: '100%',
    },
    container: {
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      margin: 20,
      borderRadius: 10,
    },
    label: {
      color: '#ffd700',
      fontSize: 16,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ffd700',
      borderRadius: 4,
      padding: 8,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      marginBottom: 16,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderColor: '#ffd700',
      borderWidth: 1,
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#ffd700',
      fontSize: 16,
      marginLeft: 10,
    },
  });
  
  export default CreateCharacter;