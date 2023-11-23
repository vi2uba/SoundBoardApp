import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [predefinedButtons] = useState([
    { name: 'Sound#1', key: '1', soundFile: require('./soundEffects/Hello There.mp3') },
    { name: 'Sound#2', key: '2', soundFile: require('./soundEffects/Homelander.mp3') },
    { name: 'Sound#3', key: '3', soundFile: require('./soundEffects/Soldier boy.mp3') },
    { name: 'Sound#4', key: '4', soundFile: require('./soundEffects/Yeah Boy.mp3') },
    { name: 'Sound#5', key: '5', soundFile: require('./soundEffects/2077SHITPOST.mp3') },
    { name: 'Sound#6', key: '6', soundFile: require('./soundEffects/AshleyLook.mp3') },
    { name: 'Sound#7', key: '7', soundFile: require('./soundEffects/DogDoin.mp3') },
    { name: 'Sound#8', key: '8', soundFile: require('./soundEffects/froglaugh.mp3') },
    { name: 'Sound#9', key: '9', soundFile: require('./soundEffects/gae.mp3') },
    { name: 'Sound#10', key: '10', soundFile: require('./soundEffects/Jeff.mp3') },
    { name: 'Sound#11', key: '11', soundFile: require('./soundEffects/Jesus.mp3') },
    { name: 'Sound#12', key: '12', soundFile: require('./soundEffects/Just do it.mp3') }
  ]);


  const [userButtons, setUserButtons] = useState([]);

  

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soundboard App</Text>
      <FlatList
        numColumns={4}
        data={[...predefinedButtons, ...userButtons]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSound(item.soundFile)}>
            <Text style={styles.custombutton}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f9ea0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  custombutton: {
    flex: 1,
    backgroundColor: '#f0e68c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
  },
  title: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 8,
    textAlign: 'center',
    backgroundColor: '#f0f8ff',
  },
});
