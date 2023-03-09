import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const img = require('./assets/ukulele.png');
const mp3 = require('./assets/music/ukulele.mp3');

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);

  const togglePlaying = () => {
    if (isPlaying)
      sound.pauseAsync();
    else
      sound.playAsync();
    
    setIsPlaying(!isPlaying);
  }
  
  useEffect(() => {
    const loadSound = async () => {
      const status = {
        shouldPlay: isPlaying
      };
  
      const { sound } = await Audio.Sound.createAsync(mp3, status);
      setSound(sound);
    }
    loadSound();
  }, []) // empty array of dependencies, so only called once

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aloha Music</Text>
      <Image style={styles.img} source={img}></Image>
      <TouchableOpacity onPress={togglePlaying}>
        {isPlaying ?
          <Feather name="pause" size={32} color="#000"/> :
          <Feather name="play" size={32} color="#000"/>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: 300,
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#da9547',
    textAlign: 'center',
    marginBottom: 40,
  },
  img: {
    width: 300,
    height: 500,
    marginBottom: 40
  }
});
