import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';

export default function AuthScreen({ navigation, route }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Phone Number must be in the format (xxx) xxx-xxxx');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Email must be in a valid format');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s:]).{4,}/;
    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one non-alpha numeric character');
      return false;
    }
    return true;
  };

  const validateZipCode = () => {
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(zipCode)) {
      Alert.alert('Error', 'ZIP Code must include 5 digits');
      return false;
    }
    return true;
  };

  const handleRegistration = async () => {
    try {
      if (!validatePhoneNumber() || !validateEmail() || !validatePassword() || !validateZipCode()) {
        return;
      }

      const storedUserData = await AsyncStorage.getItem('userData');
      const userData = storedUserData ? JSON.parse(storedUserData) : [];
      if (userData.find(user => user.username === username)) {
        Alert.alert('Username already exists. Please choose a different one.');
        return;
      }
      userData.push({ username, password });
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert('An error occurred while registering');
    }
  };

  return (
    <View>
      {route.name === 'Registration' && (
        <>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            placeholder="ZIP Code"
            value={zipCode}
            onChangeText={setZipCode}
          />
          <CheckBox
            title="Sign up for newsletter"
            checked={newsletter}
            onPress={() => setNewsletter(!newsletter)}
          />
          <Button title="Register" onPress={handleRegistration} />
        </>
      )}
    </View>
  );
}
