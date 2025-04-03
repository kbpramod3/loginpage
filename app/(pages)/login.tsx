import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Validation Schema using Yup
const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

// Define form data type
interface FormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const getUserData = async (): Promise<FormData[] | []> => {
    try {
      const jsonValue = await AsyncStorage.getItem('users');
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return [];
    }
  };
  
  // Type the 'data' parameter as FormData
  const onSubmit = async (data: FormData) => {
    const userData = await getUserData();
  
    // Check if email or password is empty
    if (!data.email || !data.password) {
      alert('Required fields can\'t be empty');
      return;
    }
  
    // Find the user based on email
    const user = userData.find((user: { email: string, password: string }) => user.email === data.email);
  
    // Check if user exists and the password matches
    if (user && user.password === data.password) {
      router.push('/profile');  // Navigate to dashboard on success
      console.log('Login successful');
      await AsyncStorage.setItem('loggedInEmail', user.email);
    } else {
      alert('Invalid credentials');  // Show error if authentication fails
    }
  };
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  }
});
