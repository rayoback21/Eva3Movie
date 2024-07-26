import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/login/loginpeli';
import RegisterScreen from './components/login/Register'; // Asegúrate de que esta ruta es correcta
import ListFilm from './components/film/listfilm';
import EditScreen from './components/film/editfilm';
import CreateScreen from './components/film/createfilm';
import ListScene from './components/scene/listScene';
import EditScene from './components/scene/editScene';
import CreateScene from './components/scene/createScene';
import ListCharacter from './components/character/listCharacter';
import EditCharacter from './components/character/editCharacter';
import CreateCharacter from './components/character/createCharacter';
import FilmDetail from './components/film/FilmDetail';
import ViewScene from './components/scene/ViewScene';
import ViewCharacter from './components/character/ViewCharacter';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ListFilm" component={ListFilm} />
        <Stack.Screen name="EditFilm" component={EditScreen} />
        <Stack.Screen name="CreateFilm" component={CreateScreen} />
        <Stack.Screen name="ListScene" component={ListScene} />
        <Stack.Screen name="EditScene" component={EditScene} />
        <Stack.Screen name="CreateScene" component={CreateScene} />
        <Stack.Screen name="ListCharacter" component={ListCharacter} />
        <Stack.Screen name="EditCharacter" component={EditCharacter} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
        <Stack.Screen name="FilmDetail" component={FilmDetail} />
        <Stack.Screen name="ViewScene" component={ViewScene} />
        <Stack.Screen name="ViewCharacter" component={ViewCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;