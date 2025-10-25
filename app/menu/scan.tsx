import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
//import QRCodeScanner from 'react-native-qrcode-scanner';
//import { RNCamera } from 'react-native-camera';

import globalStyles from "../globalStyles";

const ScanScreen = () => {
  const onSuccess = (e: any) => {
    Alert.alert('QR Code Scanned', e.data);
  };

  return (
    <View style={globalStyles.mainContainer}>
      
    </View>
  );
};

/*
<QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Point your camera at a QR code to scan.
          </Text>
        }
        bottomContent={
          <Text style={styles.bottomText}>
            Scanning will automatically detect the QR code.
          </Text>
        }
      />
      */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerText: {
    fontSize: 16,
    padding: 20,
    color: '#777',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 14,
    padding: 20,
    color: '#555',
    textAlign: 'center',
  },
});

export default ScanScreen;