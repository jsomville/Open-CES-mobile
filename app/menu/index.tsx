import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const mylogo = require("../../assets/images/logo.png");

import { fetchCurrency, fetchUserDetails } from "@/services/controller";

import Transaction from "../components/Transaction";
import globalStyles from "../globalStyles";

const MenuScreen = () => {
  const button_size = 40;

  const [userName, setUserName] = useState("John Doe");
  const [accountBalance, setAccountBalance] = useState(99.99);
  const [accountBalanceSymbol, setAccountBalanceSymbol] = useState("U");
  const [accountNumber, setAccountNumber] = useState("23-556-88");
  const [transactionsList, setTransactionsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const fetchDetails = async () => {
    // Get other information
    await fetchCurrency();

    const result = await fetchUserDetails();
    if (result.status === 200) {
      console.log("menu - received user data");

      const data = await SecureStore.getItemAsync("userData");
      if (data) {
        const userData = JSON.parse(data);

        setUserName(userData.firstname + " " + userData.lastname);
      }

      // Account data
      const data2 = await SecureStore.getItemAsync("account");
      if (data2) {
        const accountData = JSON.parse(data2);

        setAccountBalance(accountData.balance);
        setAccountNumber(accountData.id);
        setAccountBalanceSymbol(accountData.currencySymbol);
        setTransactionsList(accountData.latestTransactions);
      }
    } else {
      console.error(result.status, result.message);
    }
  };

  // Fetch details on component mount
  useEffect(() => {
    fetchDetails();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true); // Show the refresh indicator
    await fetchDetails(); // Fetch the latest data
    setRefreshing(false); // Hide the refresh indicator
  };

  return (
    <>
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    <ScrollView
      style={globalStyles.scrollViewContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    > 
      <View style={globalStyles.menuHeaderContainer}>
        <Image source={mylogo} style={globalStyles.menu_image} />
        <View style={globalStyles.balanceContainer}>
          <Text style={globalStyles.balanceText}>{accountBalance}</Text>
          <Text style={globalStyles.balanceText}> </Text>
          <Text style={globalStyles.balanceText}>{accountBalanceSymbol}</Text>
        </View>
        <Text style={globalStyles.accountNumber}>{userName}</Text>
        <Text style={globalStyles.accountNumber}># {accountNumber}</Text>
      </View>

      <View style={globalStyles.actionButtonContainer}>
        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.roundButton}
            onPress={() => {
              console.log("Send");
              router.push("/menu/send");
            }}
          >
            <MaterialIcons name="arrow-upward" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Send</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.roundButton}
            onPress={() => {
              console.log("Pay");
              router.push("/menu/pay");
            }}
          >
            <MaterialIcons name="arrow-upward" color="black" size={button_size} />
          </TouchableOpacity>
          <Text>Pay</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.roundButton}
            onPress={() => {
              console.log("Receive");
              router.push("/menu/receive");
            }}
          >
            <MaterialIcons
              name="arrow-downward"
              color="black"
              size={button_size}
            />
          </TouchableOpacity>
          <Text>Receive</Text>
        </View>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.roundButton}
            onPress={() => {
              console.log("More");
            }}
          >
            <MaterialCommunityIcons
              name="dots-horizontal"
              color="black"
              size={button_size}
            />
          </TouchableOpacity>
          <Text>More</Text>
        </View>
      </View>

      <Button
        title="TEMP Go to Login"
        onPress={() => {
          console.log("Navigating to Login");
          router.replace("/login");
        }}
      />

      <View style={globalStyles.transactionLogContainer}>
        <View style={globalStyles.transactionLogHeader}>
          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginVertical: 10 }}
          >
            Latest Transactions
          </Text>
          <TouchableOpacity
            style={globalStyles.smallButton}
            onPress={() => {
              router.push("/menu/transactions");
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>View All</Text>
          </TouchableOpacity>
        </View>

        {Array.isArray(transactionsList) && transactionsList.length > 0 ? (
          transactionsList.map((transaction: any, index: number) => (
            <Transaction
              key={index}
              date={transaction.createdAt}
              description={transaction.description}
              transactionType={transaction.transactionType}
              amount={transaction.amount}
            />
          ))
        ) : (
          <Text>No transactions available.</Text>
        )}
      </View>
    </ScrollView>
    </>
  );
};

export default MenuScreen;

