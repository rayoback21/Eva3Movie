import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet, ScrollView, Text, ImageBackground } from 'react-native';
import { Scene } from '../../api/models';
import apiClient from '../../api/apliClients';

const EditScene = ({ route, navigation }: any) => {
  const { scene: initialScene } = route.params;
  const [scene, setScene] = useState<Scene | undefined>(initialScene);

  if (!scene) {
    return <Text style={styles.errorText}>Error: Scene not found</Text>;
  }

  const handleSave = async () => {
    try {
      await apiClient.put(`/scene/${scene.id}`, scene);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      // Manejo del error (puedes agregar un Alert o similar)
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/image4.png.')} 
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Description"
            value={scene.description}
            onChangeText={text => setScene(prev => prev ? { ...prev, description: text } : prev)}
            style={styles.input}
          />
          <TextInput
            placeholder="Minutes"
            value={scene.minutes?.toString() || ''}
            onChangeText={text => setScene(prev => prev ? { ...prev, minutes: parseInt(text, 10) } : prev)}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Location"
            value={scene.location}
            onChangeText={text => setScene(prev => prev ? { ...prev, location: text } : prev)}
            style={styles.input}
          />
          <TextInput
            placeholder="Setting"
            value={scene.setting}
            onChangeText={text => setScene(prev => prev ? { ...prev, setting: text } : prev)}
            style={styles.input}
          />
          <TextInput
            placeholder="Film_Id"
            value={scene.film_id.toString()}
            onChangeText={text => setScene(prev => prev ? { ...prev, film_id: parseInt(text, 10) } : prev)}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} color="#f0e68c" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#87ceeb',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#333333',
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default EditScene;
