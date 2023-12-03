import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {FlatList,StyleSheet,Text,TouchableOpacity,View,TextInput,} from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import RNPickerSelect from 'react-native-picker-select';
import { Sound } from 'expo-av/build/Audio';

export default function App() {
  const [predefinedButtons] = useState([
    { name: 'Sound#1', key: '1', soundFile: require('./soundEffects/Hello There.mp3') },
    { name: 'Sound#2', key: '2', soundFile: require('./soundEffects/Homelander.mp3') },
    { name: 'Sound#3', key: '3', soundFile: require('./soundEffects/Soldier boy.mp3') },
    { name: 'Sound#4', key: '4', soundFile: require('./soundEffects/Yeah Boy.mp3') },
    { name: 'Sound#5', key: '5', soundFile: require('./soundEffects/2077SHITPOST.wav') },
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
  const [soundList, setSoundList] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Sorry, we need media library permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickSound = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }
  
    try {
      let result = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,
        first: 1500
      });
  
      if (result && result.assets && result.assets.length > 0) {
        setSoundList(
          result.assets.map((asset) => ({
            label: asset.filename,
            value: asset.uri,
          }))
        );
      } else {
        alert('No audio assets found in the media library.');
      }
    } catch (error) {
      console.error('Error fetching media library assets:', error);
      alert('Error fetching media library assets. Please try again.');
    }
  };
  

  

  const addCustomSound = () => {
    if (newSoundUri) {
      const newButton = {
        name: `CS#${userButtons.length + 1}`,
        key: `${userButtons.length + 1}`,
        soundFile: newSoundUri,
      };

      setUserButtons((prevButtons) => [...prevButtons, newButton]);
      setNewSoundUri(null);
    }
  };

  let currentSound = null;

  const playSoundPredfined = async (soundFile) => {
    // If there is a currently playing sound, stop it
    if (currentSound) {
      await currentSound.stopAsync();
      currentSound.unloadAsync(); // Unload the sound to free up resources
    }
  
    // Load and play the new sound
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  
    // Update the currentSound variable
    currentSound = sound;
  };

  const playSoundCustom = async (soundFile) => {
    // If there is a currently playing sound, stop it
    if (currentSound) {
      await currentSound.stopAsync();
      currentSound.unloadAsync(); // Unload the sound to free up resources
    }
  
    // Load and play the new sound
    const { sound } = await Audio.Sound.createAsync({ uri: soundFile });
    await sound.playAsync();
  
    // Update the currentSound variable
    currentSound = sound;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soundboard App</Text>
  
      <TouchableOpacity onPress={pickSound}>
        <Text style={styles.addButton}>Load Downloads Folder</Text>
      </TouchableOpacity>
  
      {newSoundUri && (
        <Text style={styles.selectedSoundText}>
          Selected Sound: {newSoundUri}
        </Text>
      )}
  
      <TouchableOpacity onPress={addCustomSound}>
        <Text style={styles.addButton}>Add Sound</Text>
      </TouchableOpacity>
  
      <RNPickerSelect
        onValueChange={(value) => setNewSoundUri(value)}
        items={soundList}
        placeholder={{ label: 'Select a sound', value: null }}
        style={{ inputAndroid: styles.pickerInput }}
      />
  
      {/* Predefined Sounds FlatList */}
      <Text style={styles.listTitle}>Predefined Sounds</Text>
      <FlatList
        numColumns={4}
        data={predefinedButtons}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSoundPredfined(item.soundFile)}>
            <Text style={styles.customButton}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
  
      {/* Custom Sounds FlatList */}
      <Text style={styles.listTitle}>Custom Sounds</Text>
      <FlatList
        numColumns={4}
        data={userButtons}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSoundCustom(item.soundFile)}>
            <Text style={styles.customButton}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
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
  pickerInput: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginVertical: 10,
  },
});
