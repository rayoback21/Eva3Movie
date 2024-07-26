import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Character } from '../../api/models';

const ViewCharacter = ({ route }: any) => {
  const { character }: { character: Character } = route.params;

  return (
    <ImageBackground source={require('../assets/image3.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{character.full_name}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{character.description}</Text>
        <Text style={styles.label}>Cost:</Text>
        <Text style={styles.value}>{character.cost}</Text>
        <Text style={styles.label}>Actor:</Text>
        <Text style={styles.value}>{character.actor}</Text>
        <Text style={styles.label}>Rol:</Text>
        <Text style={styles.value}>{character.rol}</Text>
        <Text style={styles.label}>Stock:</Text>
        <Text style={styles.value}>{character.stock}</Text>
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
  label: {
    color: '#ffd700',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ViewCharacter;