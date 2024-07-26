import React, { useState } from 'react';
import { TextInput, Button, View, Text, Alert, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Scene } from '../../api/models';
import apiClient from '../../api/apliClients';

const CreateScene = ({ route, navigation }: any) => {
  const { film_Id } = route.params;
  const [scene, setScene] = useState<Scene>({
    id: 0,
    description: "",
    minutes: 0,
    location: "",
    setting: "",
    film_id: film_Id
  });

  const handleInputChange = (field: keyof Scene, value: any) => {
    setScene({ ...scene, [field]: value });
  };

  const handleCreate = async () => {
    try {
      await apiClient.post('/scene', scene);
      Alert.alert('Success', 'Scene created successfully');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an error creating the scene');
    }
  };

  return (
    <ImageBackground source={require('../assets/image9.png')} style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={scene.description}
            onChangeText={(value) => handleInputChange('description', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Minutes:</Text>
          <TextInput
            value={scene.minutes.toString()}
            onChangeText={(value) => handleInputChange('minutes', Number(value))}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            value={scene.location}
            onChangeText={(value) => handleInputChange('location', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Setting</Text>
          <TextInput
            value={scene.setting}
            onChangeText={(value) => handleInputChange('setting', value)}
            style={styles.input}
          />
          <Text style={styles.label}>Film Id</Text>
          <TextInput
            value={scene.film_id.toString()}
            onChangeText={(value) => handleInputChange('film_id', Number(value))}
            keyboardType="numeric"
           
          />
        </View>
        <Button title="Create" onPress={handleCreate} />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a001a',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ffd700',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#4d0000',
    color: '#ffffff',
  },
  label: {
    color: '#ffd700',
    fontSize: 16,
    marginBottom: 8,
  },
  b: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default CreateScene;
