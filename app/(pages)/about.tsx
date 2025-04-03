import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { router } from 'expo-router';

export default function AboutScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About Our App</Text>

      <Text style={styles.paragraph}>
        Welcome to our app! This app is designed to help you manage your tasks efficiently.
        We are constantly working to improve your experience and add new features.
      </Text>

      <Text style={styles.subHeading}>Features</Text>
      <Text style={styles.paragraph}>
        - User-friendly interface
        {"\n"}- Task management system
        {"\n"}- Notifications and reminders
        {"\n"}- Cross-platform support
      </Text>

      <Text style={styles.subHeading}>Contact Us</Text>
      <Text style={styles.paragraph}>
        If you have any questions, feel free to reach out to us at support@example.com.
      </Text>

      <Button title="Go to Home" onPress={() => router.navigate('/')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  }
});
