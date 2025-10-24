import { router } from "expo-router";
import { Alert, Button, Image, Linking, StatusBar, Text, TextInput, View } from "react-native";

import { useState } from 'react';

const mylogo = require('../../assets/images/logo.png');

import globalStyles from "../globalStyles";

import config from "../config";

import { login } from '../../services/login';

const LoginScreen = () => {

  const [username, setUsername] = useState('a@b.com');
  const [password, setPassword] = useState('Test12345!');

  const handleLogin = async () => {
    console.log('Handle Login');

    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    try {

      const result = await login(username, password);

      if (result.status === 200) {

        router.replace("/menu");
      } else {
        Alert.alert('Login Failed', result.message);
      }

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    } 
  };

  return (
    <View style={globalStyles.loginContainer}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Image source={mylogo} style={globalStyles.login_image} />
      <View >
        <Text style={globalStyles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={globalStyles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={globalStyles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={globalStyles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
      />
      </View>

      <View style={globalStyles.actionButtonContainer}>
        <Text style={globalStyles.hyperlink} onPress={() => Linking.openURL(config.new_user_url)}
        >Create new account</Text>

        <Button title="Login" onPress={handleLogin} />
      </View>

    </View>
  );
}

export default LoginScreen;