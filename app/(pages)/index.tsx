import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      
      
      <Text style={styles.title}>Welcome to Our App</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/register')}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.navigate('/about')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  header: { position: 'absolute', top: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 50, height: 50, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007bff', padding: 10, margin: 10, width: 200, alignItems: 'center', borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 18 },
})