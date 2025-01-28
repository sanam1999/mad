import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import { PATHS } from "@/constants/pathConstants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Deposit, Withdrawal,Sent, Request} from "../component/Invoice";

export default function Wallet() {
    let navigate = useNavigate();
    const [visibleD, setVisibleD] = useState(false);
    const [visibleW, setVisibleW] = useState(false);
    const [visibleS, setVisibleS] = useState(false);
    const [visibleQ, setVisibleQ] = useState(false);
    const { user, isLoading } = useUserSessions();

    // Handle navigation on user session state
    useEffect(() => {
        if (!isLoading && !user) {
            navigate(PATHS.LOGIN);
        }
    }, [isLoading, user, navigate]);
    // If still loading, return a placeholder
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
           <View style={styles.walcontainer}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceAmount}>$12,232</Text>
                <Text style={styles.balanceText}>My balance</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: "https://img.freepik.com/premium-vector/hipster-frofile-hat-with-glasses_6229-762.jpg",
                    }}
                    accessibilityLabel="Profile Image"
                />
            </View>
            </View>

            <View style={styles.payments}>
            <TouchableOpacity style={styles.linkContent} onPress={()=>{setVisibleD(true)}}>
                <FontAwesome name="arrow-down" style={styles.icon} />
                <Text style={styles.navText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContent} onPress={()=>{setVisibleW(true)}}>
                <FontAwesome name="arrow-up" style={styles.icon} />
                <Text style={styles.navText}>Withdrawal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContent} onPress={()=>{setVisibleS(true)}}>
                <FontAwesome name="send" style={styles.icon} />
                <Text style={styles.navText}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContent} onPress={()=>{setVisibleQ(true)}}>
                <FontAwesome name="qrcode" style={styles.icon} />
                <Text style={styles.navText}>Request</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.donation}>
          <Text style={styles.totalt}>
            Total donate
          </Text>
          <Text style={styles.totalt}>
            $ 1,102
          </Text>
        </View>

        <Deposit visibleD={visibleD} setVisibleD={setVisibleD} />
        <Withdrawal visibleW={visibleW} setVisibleW={setVisibleW} />
        <Sent visibleS={visibleS} setVisibleS={setVisibleS} />
        <Request visibleQ={visibleQ} setVisibleQ={setVisibleQ} />
        







        </View>
    );
}

const styles = StyleSheet.create({

  donation:{
    marginTop:10,
    flexDirection:'row',
    justifyContent: 'space-evenly',
    backgroundColor:PATHS.mainColor,
    marginHorizontal:20,
    height:50,
    alignItems:'center'
  },
    container: {
    },
    walcontainer:{
      marginTop:30,
      paddingHorizontal:20,
      flexDirection:'row',
      textAlign:'center',
      justifyContent:'space-between',
     
    },
    balanceContainer: {
        
        alignItems: "center",
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
    },
    balanceText: {
        fontSize: 18,
        color: "#666",
    },
    imageContainer: {
       
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    icon:{
      color:"white",
      fontSize: 25,
  
    },
    linkContent: {
      flex:1,
      backgroundColor:PATHS.mainColor,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    
      
    
      
    },
    navText:{
      marginTop:5,
      fontSize:11,
      color:"white"
    },
    payments:{
      borderRadius:50,
      flexDirection: 'row',
      marginHorizontal:20,
      marginVertical:30,
      height:80,
      
    },
    totalt:{
      fontSize:16,
      color:"white"
    },
     
});
