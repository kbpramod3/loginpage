import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface user {
  name: string;
  email: string;
  password: string;
}
export default function EditProfileScreen() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadUserProfile();
  },[]);

  const loadUserProfile = async() => {
    try {
      const users = await AsyncStorage.getItem('users');
      const loggedInEmail = await AsyncStorage.getItem('loggedInEmail')
      
      if (users && loggedInEmail){
        const userList = users ? JSON.parse(users) : [];
        const user = userList.find((u: user) => u.email === loggedInEmail);

        if (user){
          setName(user.name);
          setPassword(user.password);
        }
      }
    } catch (error) {
      console.log("Error")
    }
  };

  const updateProfile = async() => {
    try {
      const users = await AsyncStorage.getItem('users');
      const loggedInEmail = await AsyncStorage.getItem('loggedInEmail')
      
      if (users && loggedInEmail){
        let  userList = users ? JSON.parse(users) : [];
        userList = userList.map((user:user )=> user.email === loggedInEmail?{...user,name,password}: user);
        
        await AsyncStorage.setItem('users', JSON.stringify(userList));
        Alert.alert("Success", "Profile updated successfully!");
      }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
  }

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Edit Profile</Text>
      <TouchableOpacity style={styles.profileIcon} onPress={() => alert('pp')}>
        <MaterialIcons name="account-circle" size={150} color="black" />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={() => updateProfile()} />
        <Button title="Cancel" color="red" onPress={() => router.back()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileIcon: {
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
