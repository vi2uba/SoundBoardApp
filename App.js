import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

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
  const [newSoundUri, setNewSoundUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickSound = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Audio,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setNewSoundUri(result.uri);
    }
  };

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync({ uri: soundFile });
    await sound.playAsync();
  };

  const addCustomSound = () => {
    if (newSoundUri) {
      const newButton = {
        name: `Sound#${userButtons.length + 1}`,
        key: `${userButtons.length + 1}`,
        soundFile: newSoundUri,
      };

      setUserButtons((prevButtons) => [...prevButtons, newButton]);
      setNewSoundUri(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soundboard App</Text>
      
      <TouchableOpacity onPress={pickSound}>
        <Text style={styles.addButton}>Pick Sound</Text>
      </TouchableOpacity>

      {newSoundUri && (
        <Text style={styles.selectedSoundText}>Selected Sound: {newSoundUri}</Text>
      )}

      <TouchableOpacity onPress={addCustomSound}>
        <Text style={styles.addButton}>Add Sound</Text>
      </TouchableOpacity>

      <FlatList
        numColumns={4}
        data={[...predefinedButtons, ...userButtons]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSound(item.soundFile)}>
            <Text style={styles.customButton}>{item.name}</Text>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 5,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    color: 'white',
    marginVertical: 10,
  },
  selectedSoundText: {
    fontSize: 16,
    marginTop: 10,
  },
});
