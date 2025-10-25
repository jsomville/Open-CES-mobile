import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from "expo-secure-store";

import globalStyles from "../globalStyles";

const UserScreen = () => {
    const [selectedOption, setSelectedOption] = useState<string>('option1');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const fetchDetails = async () => {
        // Get other information
        const data = await SecureStore.getItemAsync("userData");
        if (data) {
            const userData = JSON.parse(data);
            setFirstname(userData.firstname);
            setLastname(userData.lastname);
            setPhone(userData.phone);
            setSelectedOption(userData.region);     
        }
      };
    // Fetch details on component mount
    useEffect(() => {
        fetchDetails();
    }, []);

    return (
    <View style={globalStyles.mainContainer}>
        <View style={globalStyles.rowContainer}>
            <Text>Firstname</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Enter your firstname"
                value={firstname}
                onChangeText={setFirstname}
            />
        </View>
        <View style={globalStyles.rowContainer}>
            <Text>Lastname</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Enter your lastname"
                value={lastname}
                onChangeText={setLastname}
            />
        </View>
        <View style={globalStyles.rowContainer}>
            <Text>Phone</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
            />
        </View>
        <View style={globalStyles.rowContainer}>
            <Text>Region</Text>
            <View style={globalStyles.columnContainer}>
                <Text style={globalStyles.selectedText}>Selected: {selectedOption}</Text>
                <Picker
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) => setSelectedOption(itemValue)}
                    style={globalStyles.picker}
                >
                    <Picker.Item label="Option 1" value="option1" />
                    <Picker.Item label="Option 2" value="option2" />
                    <Picker.Item label="Option 3" value="option3" />
                </Picker>
                
            </View>
        </View>
    </View>
  );
};

export default UserScreen;