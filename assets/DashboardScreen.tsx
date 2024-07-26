// src/components/DashboardScreen.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navegation/StackNavigator';
import { FilmContext } from '../context/FilmContext';
import { deleteFilm } from '../api';
type Film = {
  id: string;
  title: string;
  director: string;
  time: string;
};



type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const filmContext = useContext(FilmContext);

  if (!filmContext){return null;}

  const handleDelete = (id: string) =>{
    deleteFilm(id);
  };
  const {films, deleteFilm} = filmContext;
  const renderItem: ListRenderItem<Film> = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Scenes')}>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.director}</Text>
          <Text style={styles.cardSubtitle}>{item.time}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => navigation.navigate('FilmDetail', { filmId: item.id })}>
            <MaterialIcons name="visibility" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditFilm', { filmId: item.id })}>
            <MaterialIcons name="edit" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> handleDelete(item.id)}>
            <MaterialIcons name="delete" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/imageScream.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>DASHBOARD</Text>
        <Text style={styles.subHeader}>FILMS</Text>
        <FlatList
          data={films}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
        <TouchableOpacity style={styles.fab}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 20,
    color: '#A62948',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#800F2F',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#800F2F',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
