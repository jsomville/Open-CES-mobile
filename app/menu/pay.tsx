import { Text, TextInput, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import globalStyles from "../globalStyles";

const PayScreen = () => {
  const [sendTo, setSendTo] = useState('aa@bb.com');

  return (
    <View style={globalStyles.mainContainer}>
      
      <TextInput
          placeholder="Email or account number"
          style={globalStyles.input}
          value={sendTo}
          onChangeText={setSendTo}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TouchableOpacity style={globalStyles.roundButton}
              onPress={() => {
                console.log("Scan to");
              }}  
            >
          <Text>Scan QR</Text>
        </TouchableOpacity>
    
        <View>

        </View>

    </View>
  );
}

export default PayScreen;