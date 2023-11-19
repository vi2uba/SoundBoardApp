import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

      <View style={styles.contentContainer}>
        <View style={styles.buttonContainer}>
          {[0, 1, 2].map(rowNumber => (
            <View key={rowNumber} style={styles.rowContainer}>
              {predefinedButtons.slice(rowNumber * 4, (rowNumber + 1) * 4).map((item) => (
                <TouchableOpacity key={item.key} onPress={() => playSound(item.soundFile)}>
                  <Text style={styles.custombutton}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      
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
  title: {
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#20232a',
    borderRadius: 8,
    backgroundColor: '#f0f8ff',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  custombutton: {
    flex: 1,
    backgroundColor: '#f0e68c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    margin: 5,
    minWidth: '30%', // Adjust the width based on your preference
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
});
