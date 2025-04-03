import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Button, Alert, TouchableOpacity, Modal, StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, Router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [fileUri, setFileUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);  // To control dropdown visibility
  const [value, setValue] = useState(null);  // To store selected value
  const [items, setItems] = useState([
    { label: 'Change Password', value: 'changePassword' },
    { label: 'Update Profile Picture', value: 'updateProfilePicture' },
    { label: 'Logout', value: 'logout' },
  ]);

  const logoutAccount = async() => {
    try{
      await AsyncStorage.removeItem('loggedInEmail');
      router.replace('/(pages)/login');
    } catch(error){
      alert('Error logging out');
    }
  }

  const handleAction = (selectedOption: string) => {
    setOptionsVisible(false); // Close dropdown after selection

    switch (selectedOption) {
      case 'dashboard':
        router.navigate('/(pages)/dashboard');
        break;
      case 'editProfile':
        router.navigate('/profile/edit');
        break;
      case 'logout':
        logoutAccount();
        break;
      case 'deleteAccount':
        alert('Logout option selected');
        break;
      default:
        alert('No action selected');
        break;
    }
  };

  interface User {
    email: string;
    name: string;
    password: string;
  }

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('loggedInEmail');
      if (!storedEmail) {
        Alert.alert("User not found. Please log in again.");
        return;
      }

      setEmail(storedEmail);

      const storedUsers = await AsyncStorage.getItem('users');
      const usersArray: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = usersArray.find((u) => u.email === storedEmail);
      if (user) {
        setName(user.name);
        setPassword(user.password);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const uploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.canceled) return;
      
      const file = result.assets[0];
      const newPath = FileSystem.documentDirectory + file.name;
      await FileSystem.copyAsync({ from: file.uri, to: newPath });

      setFileUri(newPath);
      await AsyncStorage.setItem(`user_${email}_file`, newPath);
      Alert.alert('File Uploaded', `Stored at: ${newPath}`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const usersArray: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      const updatedUsers = usersArray.map((user) => 
        user.email === email ? { ...user, name, password } : user
      );

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert("Profile updated successfully!");
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedInEmail');
    router.navigate('/(pages)/login') // Redirect to login screen
  };

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => setOptionsVisible(!optionsVisible)}>
        <MaterialIcons name="account-circle" size={50} color="black" />
      </TouchableOpacity>

      {optionsVisible && (
        <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('dashboard')}>
          <Text style={styles.optionText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('editProfile')}>
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('logout')}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => handleAction('deleteAccount')}>
          <Text style={styles.optionText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      )}

      <Text style={styles.heading}>Hi, {name}!</Text>

      <Button title='Upload File' onPress={uploadFile} />
      {fileUri ? <Text>File stored at: {fileUri}</Text> : null}

      {/* Modal for Editing Profile */}
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

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
            <Button title="Save" onPress={updateProfile} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>

          <Button title="Logout" color="red" onPress={logout} />
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  profileIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  optionsContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
