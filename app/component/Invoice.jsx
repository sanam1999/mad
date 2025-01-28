import Dialog from 'react-native-dialog';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import { PATHS } from '../../constants/pathConstants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Deposit(props) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // Handle submit function
  const handleSubmit = () => {
    console.log('Card Number:', cardNumber);
    console.log('Name on Card:', cardName);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);
    console.log('Amount:', amount);
  };

  return (

      <Dialog.Container visible={props.visibleD}>
        <Dialog.Title style={styles.Dialog}>Deposit</Dialog.Title>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10 }}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }} style={styles.cardimage} />
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' }} style={styles.cardimage} />
        </View>
        <TextInput
          placeholder="Card number"
          style={styles.input}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          placeholder="Name on card"
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            placeholder="MM / YY"
            style={[styles.input, { flex: 0.45 }]}
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <TextInput
            placeholder="CVV"
            style={[styles.input, { flex: 0.45 }]}
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
        <TextInput
          placeholder="Amount"
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Dialog.Button label="Cancel" onPress={() => props.setVisibleD(false)} style={styles.cancel} />
        <Dialog.Button label="Confirm" onPress={handleSubmit} style={styles.confromebtn} />
      </Dialog.Container>

  );
}
function Withdrawal(props) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    console.log('Card Number:', cardNumber);
    console.log('Name on Card:', cardName);
    console.log('Amount:', amount);
  };
  return (
      <Dialog.Container visible={props.visibleW}>
        <Dialog.Title style={styles.Dialog}>Withdraw</Dialog.Title>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10 }}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }} style={styles.cardimage} />
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png' }} style={styles.cardimage} />
        </View>
        <TextInput
          placeholder="Card number"
          style={styles.input}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <TextInput
          placeholder="Name on card"
          style={styles.input}
          value={cardName}
          onChangeText={setCardName}
        />
        <TextInput
          placeholder="Amount"
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Dialog.Button label="Cancel" onPress={() => props.setVisibleW(false)} style={styles.cancel} />
        <Dialog.Button label="Confirm" onPress={handleSubmit} style={styles.confromebtn} />
      </Dialog.Container>
  );
}
function Sent(props) {
    const [WalletID, setWalletID] = useState('');
    const [amount, setAmount] = useState('');
    const [scannedData, setScannedData] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleSubmit = () => {
        console.log('Wallet ID:', WalletID);
        console.log('Amount:', amount);
    };

    const onScanSuccess = (e) => {
        setScannedData(e.data); // Store the scanned data
        setWalletID(e.data); // Populate the WalletID field with the scanned data
        setIsScanning(false); // Stop scanning
    };

    const opencamenr = () => {
        requestCameraPermission();
    };

    return (
        <Dialog.Container visible={props.visibleS}>
            <Dialog.Title style={styles.Dialog}>Transfer</Dialog.Title>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10 }}>
                <Text>@ Name</Text>
            </View>
            <TextInput
                placeholder="User ID"
                style={styles.input}
                keyboardType="numeric"
                value={WalletID}
                onChangeText={setWalletID}
            />
            <TextInput
                placeholder="Amount"
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Dialog.Button
                label={<MaterialIcons name="qr-code-scanner" style={styles.icon} />}
                onPress={opencamenr}
                style={[styles.button, { marginRight: 15 }]}
            />
            <Dialog.Button label="Cancel" onPress={() => props.setVisibleS(false)} style={styles.cancel} />
            <Dialog.Button label="Confirm" onPress={handleSubmit} style={styles.confromebtn} />
        </Dialog.Container>
    );
}
function Request(props) {
  return (
      <Dialog.Container visible={props.visibleQ}>
          <Dialog.Title style={styles.Dialog}>My Wallet</Dialog.Title>
          <View style={{ alignItems:'center', justifyContent: 'center', marginVertical: 30 , borderWidth: 2,}}>
              <Text style={{ marginTop:20,fontSize:20,fontWeight:600}} >@ Name</Text>
              <View  style={styles.qrcode}>
              <MaterialIcons name="qr-code" size={200} />
              </View>
          </View>

          
         
          <Dialog.Button label="Close" onPress={() => props.setVisibleQ(false)} style={styles.confromebtn} />
         
      </Dialog.Container>
  );
}
const styles = StyleSheet.create({
  Dialog: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  confromebtn: {
    backgroundColor: PATHS.mainColor,
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  cardimage: {
    height: 40,
    width: 60,
    resizeMode: 'contain',
  },
  cancel: {
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  icon:{
    fontSize:40,
    color:PATHS.secColor
  },
  qrcode:{
    height:200,
    width:200,
    marginTop:0,
    marginBottom:28
   
    
  }
});
export { Deposit, Withdrawal, Sent,Request  };
