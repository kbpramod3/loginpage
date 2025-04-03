import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router';


interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
// Validation Schema using Yup
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match') // Fixed here
  .required('Confirm password is required'),
}).required();

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const storeUserData = async (data: FormData) => {
    console.log(data);
    try {
        // Fetch existing users from AsyncStorage
        const existingUsers = await AsyncStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        console.log(existingUsers);

        // Add new user to the array
        users.push(data);

        // Save updated users array back to AsyncStorage
        const jsonvalue = JSON.stringify(users); // Save the entire users array
        await AsyncStorage.setItem('users', jsonvalue);  // Set the new array to AsyncStorage

        alert('Registered Successfully!');
        router.push('/login');  // Navigate to login page after successful registration
    } catch (error) {
        alert('Error while Registering!');
        console.error(error); // Log the error to help with debugging
    }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Register</Text>

      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </View>

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

      <View style={styles.inputContainer}>
        <Text>Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
      </View>

      <Button title="Register" onPress={handleSubmit(storeUserData)} />
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
