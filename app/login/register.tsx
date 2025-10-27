import React from "react";
import { Alert, Image, Linking, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from 'react';

import globalStyles from "../globalStyles";

import { router } from "expo-router";
import { performRegister } from "../../services/controller";

const appLogo = require('../../assets/images/logo.png');

const RegisterScreen = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [region, setRegion] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

    const fillAll = async () => {
        setFirstname('John');
        setLastname('Doe');
        setEmail('john.doe@example.com');
        setRegion('EU');
        setPhone('+34123456789');
        setPassword('Test12345!');
        setConfirmPassword('Test12345!');
    }

    const handleRegister = async () => {
        console.log('Handle Register');

        // Field Validation HERE
        if (!firstname || !lastname || !email || !region || !phone || !password || !confirmPassword) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match');
            return;
        }

        try {
            const result = await performRegister(firstname, lastname, email, phone, region, password);
            if (result.status === 201) {
                Alert.alert('Registration Successful', 'Please check your email for the confirmation code.');

                router.push("/login/confirm");
            }
            else{
                Alert.alert('Registration Error', result.message || 'An error occurred during Registration. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Registration Error', 'An error occurred during Registration. Please try again.');
        }
    };

    return (
        <View style={globalStyles.mainContainer}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View>
                <View >
                    <Text style={globalStyles.label}>Firstname</Text>
                    <TextInput
                        placeholder="Enter your firstname"
                        style={globalStyles.input}
                        value={firstname}
                        onChangeText={setFirstname}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <View>
                    <Text style={globalStyles.label}>Lastname</Text>
                    <TextInput
                        placeholder="Enter your lastname"
                        style={globalStyles.input}
                        value={lastname}
                        onChangeText={setLastname}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <View>
                    <Text style={globalStyles.label}>Region</Text>
                    <TextInput
                        placeholder="Enter your region"
                        style={globalStyles.input}
                        value={region}
                        onChangeText={setRegion}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <View>
                    <Text style={globalStyles.label}>Phone</Text>
                    <TextInput
                        placeholder="Enter your phone number"
                        style={globalStyles.input}
                        value={phone}
                        onChangeText={setPhone}
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                    />
                </View>
                <View>
                    <Text style={globalStyles.label}>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        style={globalStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <View>
                    <Text style={globalStyles.label}>Password</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Enter your password"
                            style={[globalStyles.input, { flex: 1 }]}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                            keyboardType="default"
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Text style={globalStyles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={globalStyles.label}>Confirm Password</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            placeholder="Confirm your password"
                            style={[globalStyles.input, { flex: 1 }]}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCapitalize="none"
                            keyboardType="default"
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Text style={globalStyles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={globalStyles.actionButtonContainer}>
                    <TouchableOpacity
                        style={globalStyles.roundedButton}
                        onPress={() => { fillAll(); }}
                    >
                        <Text>Fill All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.roundedButton}
                        onPress={() => { handleRegister(); }}
                    >
                        <Text>Register</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>

        </View >
    );
}
export default RegisterScreen;