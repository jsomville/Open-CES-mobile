import { Text, TextInput, Alert, Image, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import globalStyles from "../globalStyles";
import { fetchAccountFromEmail, fetchAccountFromPhone, sendTo } from "@/services/controller";
const currencyLogo = require("../../assets/images/currency.png");

const SendScreen = () => {
  const [sendToEmail, setSendToEmail] = useState('jane@doe.com');
  const [sendToPhone, setSendToPhone] = useState('+34123456789');
  const [sendToAccount, setSendToAccount] = useState('2129');
  const [description, setDescription] = useState('Test payment');
  const [amount, setAmount] = useState('1.01');
  const [accountBalance, setAccountBalance] = useState(0);
  const [isEmailBox_visible, setIsEmailBox_visible] = useState(false);
  const [isPhoneBox_visible, setIsPhoneBox_visible] = useState(false);
  const [isAccountBox_visible, setIsAccountBox_visible] = useState(true);

  const fetchDetails = async () => {

    // Account data
    const data = await SecureStore.getItemAsync("account");
    if (data) {
      const accountData = JSON.parse(data);

      setAccountBalance(accountData.balance);
    }

  };

  const sendAction = async () => {
    console.log("Send action");

    const amountValue = parseFloat(amount);

    let accountNumber = null;
    if (isAccountBox_visible) {
      console.log("Account box visible");
      accountNumber = sendToAccount;
    }
    else if (isPhoneBox_visible) {
      console.log("Phone box visible");
      const result = await fetchAccountFromPhone(sendToPhone);
      if (result && result.status == 200) {
        accountNumber = result.accountNumber
      }
    }
    else if (isEmailBox_visible) {
      console.log("Email box visible");
      const result = await fetchAccountFromEmail(sendToEmail);
      if (result && result.status == 200) {
        accountNumber = result.accountNumber
      }
    }

    if (!accountNumber) {
      Alert.alert("Invalid Recipient", "Could not find account for the provided recipient details.");
      return;
    }

    const result = await sendTo(accountNumber, amountValue, description);
    if (result.status != 201) {
      console.log("Send failed with status:", result);
      Alert.alert('Send Failed', result.message);
    }
  }

  const confirmSend = () => {
    console.log("Confirm Send");

    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount greater than zero.");
      return;
    }

    if (amountValue > accountBalance) {
      Alert.alert("Insufficient Funds", "You do not have enough balance to complete this transaction.");
      return;
    }

    Alert.alert("Confirm Send",
      `Are you sure you want to send ${amount} to ${isAccountBox_visible ? sendToAccount : isEmailBox_visible ? sendToEmail : sendToPhone}?`, [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Send",
        onPress: () => sendAction()
      }
    ]);
  }

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={globalStyles.rowContainer}>
        <View style={globalStyles.columnContainer}>
          <Text style={globalStyles.amount_display_text}>Send : </Text>
          <TextInput
            placeholder="0.00"
            style={globalStyles.amount_input_text}
            value={amount}
            onChangeText={setAmount}
            onFocus={() => setAmount('')}
            autoCapitalize="none"
            keyboardType="numeric"
          />
          <Image source={currencyLogo} style={globalStyles.amount_unit_image} />
        </View>

        <View style={globalStyles.columnContainer}>
          <Text>Current balance : {accountBalance}</Text>
          <Image source={currencyLogo} style={globalStyles.small_image} />
          <TouchableOpacity
            style={globalStyles.smallButton}
            onPress={() => {
              setAmount(accountBalance.toString());
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>MAX</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={globalStyles.rowContainer}>
        <View style={globalStyles.columnContainer}>
          <TouchableOpacity style={globalStyles.roundedButton}
            onPress={() => {
              console.log("Account");
              setIsAccountBox_visible(true);
              setIsEmailBox_visible(false);
              setIsPhoneBox_visible(false);
            }}
          >
            <Text>Account #</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.roundedButton}
            onPress={() => {
              console.log("Email");
              setIsAccountBox_visible(false);
              setIsEmailBox_visible(true);
              setIsPhoneBox_visible(false);
            }}
          >
            <Text>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.roundedButton}
            onPress={() => {
              console.log("Phone");
              setIsAccountBox_visible(false);
              setIsEmailBox_visible(false);
              setIsPhoneBox_visible(true);
            }}
          >
            <Text>Phone</Text>
          </TouchableOpacity>
        </View>
        {isAccountBox_visible && (
          <TextInput
            placeholder="Account #"
            style={globalStyles.input}
            value={sendToAccount}
            onChangeText={setSendToAccount}
            autoCapitalize="none"
            keyboardType="number-pad"
          />
        )}
        {isEmailBox_visible && (
          <TextInput
            placeholder="Email"
            style={globalStyles.input}
            value={sendToEmail}
            onChangeText={setSendToEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
        {isPhoneBox_visible && (
          <TextInput
            placeholder="Phone"
            style={globalStyles.input}
            value={sendToPhone}
            onChangeText={setSendToPhone}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
        )}
      </View>
      <View>
        <View>
          <Text style={globalStyles.amount_display_text}>Description : </Text>
          <TextInput
            placeholder="Add a description"
            style={globalStyles.input}
            value={description}
            onChangeText={setDescription}
            autoCapitalize="none"
            keyboardType="default"
            multiline={true}
          />
        </View>
      </View>
      <TouchableOpacity style={globalStyles.roundedButton}
        onPress={() => {
          confirmSend();
        }}
      >
        <Text>Send now</Text>
      </TouchableOpacity>

    </View>
  );
}

export default SendScreen;