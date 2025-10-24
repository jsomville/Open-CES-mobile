import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";
import globalStyles from "../globalStyles";

const RecieveScreen = () => {
  const [sendTo, setSendTo] = useState('aa@bb.com');

  return (
    <View style={globalStyles.mainContainer}>
    
        <TouchableOpacity style={globalStyles.roundButton}
              onPress={() => {
                console.log("Scan to");
              }}  
            >
          <Text>Scan QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.roundButton}
              onPress={() => {
                console.log("Send to:");
              }}  
            >
          <Text>Send by mail</Text>
        </TouchableOpacity>

    </View>
  );
}

export default RecieveScreen;