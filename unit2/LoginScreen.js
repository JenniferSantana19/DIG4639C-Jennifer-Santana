import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      const userData = storedUserData ? JSON.parse(storedUserData) : [];

      const user = userData.find(u => u.username.toLowerCase() === username.toLowerCase());

      if (user && user.password === password) {
        navigation.navigate('Todo');
      } else {
        Alert.alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('An error occurred while logging in');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registration');
  };

  return (
    <View>
      <TextInput
        testID="login-username"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        testID="login-password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button testID="login-button" title="Login" onPress={handleLogin} />
      <Button testID="login-register" title="Register" onPress={handleRegister} />
    </View>
  );
}
