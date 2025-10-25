import { router } from "expo-router";
import { Alert, Image, Linking, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from 'react';

const currencyLogo = require('../../assets/images/currency.png');

const appLogo = require('../../assets/images/logo.png');

import globalStyles from "../globalStyles";

import config from "../config";

import { login } from '../../services/login';

import packageJson from '../../package.json';

const LoginScreen = () => {

    const [username, setUsername] = useState('a@b.com');
    const [password, setPassword] = useState('Test12345!');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const register = async () => {
        console.log('Navigate to Register');
        router.push("/login/register");
    }

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
            <View style={globalStyles.menuHeaderContainer}>
                <View>
                    <Image source={currencyLogo} style={globalStyles.login_image} />
                </View>
                <View>
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
                    </View>
                    <View>
                        <Text style={globalStyles.label}>Password</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                                placeholder="Enter your password"
                                style={globalStyles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text style={globalStyles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={globalStyles.actionButtonContainer}>
                    <Text style={globalStyles.hyperlink} onPress={() => { register() }}
                    >Create new account</Text>
                    <TouchableOpacity
                        style={globalStyles.roundedButton}
                        onPress={() => { handleLogin(); }}
                    >
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={globalStyles.footerContainer}>
                <View style={globalStyles.columnContainer}>
                    <View style={globalStyles.columnContainer}>
                        <Text>Powered by</Text>
                        <Image source={appLogo} style={globalStyles.small_logo_image} />
                    </View>
                    <Text>Version : {packageJson.version}</Text>
                </View>
            </View>

        </View >
    );
}
//<Text style={globalStyles.hyperlink} onPress={() => Linking.openURL(config.new_user_url)}

export default LoginScreen;