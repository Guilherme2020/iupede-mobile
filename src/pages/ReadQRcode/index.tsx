import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Qrcode from '../../../assets/qrcode.jpg';

import QRCodeScanner from 'react-native-qrcode-scanner';

interface ResultQRcode {
  id: string;
  table: string;
}

export default function ReadQRcode(): JSX.Element {
  const [scan, setScan] = useState(false);
  const [result, setResult] = useState<ResultQRcode>();

  const onSuccess = (e: any): void => {
    console.log(e);
    setResult(JSON.parse(e.data));
    setScan(false);
  };

  const startScan = () => {
    setScan(true);
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <SafeAreaView style={{flex: 1}}>
        {/* <Image style={{width: 300, height: 300}} source={Qrcode} /> */}
        <View style={styles.body}>
          <View style={{alignItems: 'center'}}>
            <Image style={{width: 300, height: 300}} source={Qrcode} />
          </View>

          {result && (
            <View style={styles.sectionContainer}>
              <Text style={styles.centerText}>{result.id}</Text>
            </View>
          )}
          {!scan && (
            <View style={styles.sectionContainer}>
              <Button title="Escanear" color="red" onPress={startScan} />
            </View>
          )}
          {scan && (
            <View style={styles.sectionContainer}>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                checkAndroid6Permissions={true}
                onRead={onSuccess}
                topContent={
                  <Text style={styles.centerText}>Scan your QRCode!</Text>
                }
                bottomContent={
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => setScan(false)}>
                    <Text style={styles.buttonText}>Fechar</Text>
                  </TouchableOpacity>
                }
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // flex: 1,
    // backgroundColor: Colors.lighter,
  },
  body: {
    // flex: 1,
    // backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    // color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    // color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    // color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
