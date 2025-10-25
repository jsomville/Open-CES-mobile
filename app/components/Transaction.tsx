import React from "react";
import { Text, View, Image } from "react-native";

const currencyLogo = require("../../assets/images/currency.png");
import globalStyles from "../globalStyles";

const Transaction = ({ date, transactionType, description, amount }: { date: string; transactionType: string, description: string; amount: string | number }) => {
  // Parse the date
  const parsedDate = new Date(date);
  const day = parsedDate.getDate(); // Day of the month
  const month = parsedDate.toLocaleString("default", { month: "short" }); // Short month name (e.g., "Jan")

  const formattedAmount = parseFloat(amount as string).toFixed(2);

  return (
    <View style={globalStyles.transactionRow}>
      <View style={globalStyles.transactionDate}>
        <Text style={globalStyles.transactionDay}>{day}</Text>
        <Text style={globalStyles.transactionMonth}>{month}</Text>
      </View>
      <View style={globalStyles.transactionDetails}>
        <Text style={globalStyles.transactionType}>
          {transactionType}
        </Text>
        <Text style={globalStyles.transactionDescription}>{description}</Text>
      </View>
      <View style={globalStyles.transactionAmountContainer}>
        <Text style={globalStyles.transactionAmount}>
          {transactionType === "Received" ? (
            <Text style={{ color: "green" }}>+ </Text>
          ) : transactionType === "Transfer" ? (
            <Text style={{ color: "red" }}>- </Text>
          ) : null}
          {formattedAmount}</Text>
        <Image source={currencyLogo} style={globalStyles.small_image} />
      </View>
    </View>
  );
};

export default Transaction;