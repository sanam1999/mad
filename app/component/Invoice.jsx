import Dialog from 'react-native-dialog';
import { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Image,Clipboard,TouchableOpacity } from "react-native";
import { PATHS } from '../../constants/pathConstants';
import { postReq,getReq } from '../../hooks/useQuery';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function Deposit(props) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');

  // Handle submit function
  const handleSubmit = async() => {
    if(cardNumber ==null || cardName==null || expiryDate==null || cvv==null || amount!=null){
     try {
      const accountdel = {
        cardNumber:cardNumber,
        cardName:cardName,
        expiryDate:expiryDate,
        cvv:cvv,
        amount:amount,
      };
     const {data , error , isError} = await postReq('/user/diposit', accountdel);
      if(!isError){
          alert("Deposit Successful...")
          props.fetchData()
          props.setVisibleD(false)
      }else{
          alert(error)
      }
  } catch (error) {
      alert(error);
  }
}else{
  alert("all fild are required")
}
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

  // Handle submit function
  const handleSubmit = async () => {
    if (!cardNumber || !cardName || !amount) {
      alert("All fields are required");
      return;
    }

    try {
      const accountDetails = {
        cardNumber,
        cardName,
        amount,
      };

      const { error,message, isError } = await postReq('/user/Withdrawall', accountDetails);


      if (!isError) {
        alert("Withdrawal Successful...");
        props.fetchData();
        props.setVisibleW(false);
      } else {
        alert(message);
      }
    } catch (error) {
      alert(error.message);
    }
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
    const [username , setusername] = useState("");
    const [invalidwall , setinvalid] = useState(true)

    const handleSubmit = async() => {

        if (!WalletID || !amount) {
          alert("All fields are required");
          return;
        }
    
        try {
          const accountDetails = {
            WalletID,
            amount,
          };
    
          const { error,message, isError } = await postReq('/user/tranfer', accountDetails);
    
    
          if (!isError) {
            alert("Transfer Successful...");
            props.fetchData();
            props.setVisibleS(false);
          } else {
            alert(message);
          }
        } catch (error) {
          alert(error.message);
        }


    };
    const getusername = async()=>{
      let data = await getReq(`/user/getusername?id=${WalletID}`);
      if(data.data.success){
        setinvalid(false)
        setusername(<Text style={{color:"green"}}>Name: {data.data.data}</Text>)
      }else{
        setinvalid(true)
        setusername(<Text style={{color:"red"}}>Error: {data.data.message}</Text>)
      }
    }

    const onScanSuccess = (e) => {
        setScannedData(e.data); // Store the scanned data
        setWalletID(e.data); // Populate the WalletID field with the scanned data
        setIsScanning(false); // Stop scanning
    };

    return (
        <Dialog.Container visible={props.visibleS}>
            <Dialog.Title style={styles.Dialog}>Transfer</Dialog.Title>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 10 }}>
                {username && username}
            </View>
            <TextInput
                placeholder="Wallet address"
                style={styles.input}
                keyboardType="numeric"
                value={WalletID}
                onChangeText={setWalletID}
                onEndEditing={getusername}
            />
            <TextInput
                placeholder="Amount"
                style={styles.input}
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <Dialog.Button  label="Cancel" onPress={() => props.setVisibleS(false)} style={styles.cancel} />
            <Dialog.Button disabled={invalidwall} label="Confirm" onPress={handleSubmit} style={styles.confromebtn} />
        </Dialog.Container>
    );
}
function Request(props) {
 
    const [WalletId, setwalletid] = useState("wallet123");
    const [name, setname] = useState("@name");
    const [copyd, setcopy] = useState(false);
  
    useEffect(() => {
      if (props.visibleQ) {
        getReq('/user/getmywallet')
          .then(data => {
            setname(data.data.data.name);
            setwalletid(data.data.data.walletid);
          })
          .catch(e => {

          });
      }
    }, [props.visibleQ]); // Fetch data only when `props.visibleQ` changes
  
    const copy = () => {
      Clipboard.setString(WalletId); // Copies walletId to clipboard
      setcopy(true); // Set copyd to true when the WalletId is copied
    };
  
    useEffect(() => {
      // Hide the copied message after 2 seconds
      if (copyd) {
        const timer = setTimeout(() => {
          setcopy(false);
        }, 1000);
  
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }
    }, [copyd]); // Only re-run the effect when `copyd` changes
  
    return (
      <Dialog.Container visible={props.visibleQ}>
        <Dialog.Title style={styles.Dialog}>My Wallet</Dialog.Title>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 15, borderWidth: 1 }}>
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '500', color: PATHS.mainColor }}>@{name}</Text>
          <View style={styles.qrcode}>
            <QRCode value={WalletId} size={190} />
          </View>
        </View>
  
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }} onPress={copy}>
          <Text style={{ fontSize: 16, color: 'black', marginRight: 10 }}>
            {WalletId}
          </Text>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>
              <FontAwesome name="copy" color={PATHS.mainColor} size={20} />
            </Text>
          </View>
        </TouchableOpacity>
  
        {copyd && <Text style={{ color: "green" }}>Wallet ID copied!</Text>}
  
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
    marginTop:15,
    marginBottom:28
   
    
  }
});
export { Deposit, Withdrawal, Sent,Request  };
