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
  ]);

  const [userButtons, setUserButtons] = useState([]);
  const [newSoundName, setNewSoundName] = useState('');
  const [newSoundFile, setNewSoundFile] = useState('');

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const addUserSound = () => {
    if (newSoundName && newSoundFile) {
      // Add the user's sound to the userButtons state
      setUserButtons([
        ...userButtons,
        { name: newSoundName, key: newSoundName, soundFile: newSoundFile },
      ]);

      // Clear the input fields
      setNewSoundName('');
      setNewSoundFile('');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Soundboard App</Text>
      <FlatList
        numColumns={2}
        data={[...predefinedButtons, ...userButtons]}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSound(item.soundFile)}>
            <Text style={styles.custombutton}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* User input for adding sounds */}
      <TextInput
        placeholder="Sound Name"
        value={newSoundName}
        onChangeText={(text) => setNewSoundName(text)}
      />
      <TextInput
        placeholder="Sound File (path or URL)"
        value={newSoundFile}
        onChangeText={(text) => setNewSoundFile(text)}
      />
      <Button title="Add Sound" onPress={addUserSound} />

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
  custombutton: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 5,
  },
});
