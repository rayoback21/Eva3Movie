import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/auth/login', {
        username,
        password,
      });
      const { jwt } = response.data;
      await AsyncStorage.setItem('jwt', jwt);
      Alert.alert('Login Successful', 'You have successfully logged in!');
      navigation.navigate('ListFilm');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        Alert.alert('Login Failed', 'Invalid username or password');
      } else {
        console.error('Login error:', error);
        Alert.alert('Login Failed', 'An unexpected error occurred');
      }
    }
  };

  return (
    <ImageBackground source={require('../assets/imagec2.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#D4AF37"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#D4AF37"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerLink}>
          <Text style={styles.registerText}>Don't have an account? Register</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text readability
  },
  title: {
    fontSize: 32,
    fontFamily: 'Garamond', // Ensure you have this font available or use another suitable font
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFD700', // Golden color reminiscent of Hogwarts house colors
  },
  input: {
    height: 40,
    borderColor: '#D4AF37', // Golden border to match the theme
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#333', // Dark background for the inputs
    color: '#FFD700', // Golden text color
    borderRadius: 8,
    width: '100%', // Full width of the container
  },
  button: {
    backgroundColor: '#6A0D91', // Deep purple for a magical touch
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%', // Full width of the container
  },
  buttonText: {
    color: '#FFD700', // Golden text color
    fontSize: 16,
    fontFamily: 'Garamond', // Ensure you have this font available or use another suitable font
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%', // Full width of the container
  },
  registerText: {
    color: '#FFD700', // Golden color for consistency
    fontSize: 16,
    fontFamily: 'Garamond', // Ensure you have this font available or use another suitable font
  },
});

export default LoginScreen;
