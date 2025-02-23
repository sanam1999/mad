import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Deposit, Withdrawal, Sent, Request } from "../component/Invoice";
import { getReq } from '../../hooks/useQuery';

export default function Wallet() {
    const [visibleD, setVisibleD] = useState(false);
    const [visibleW, setVisibleW] = useState(false);
    const [visibleS, setVisibleS] = useState(false);
    const [visibleQ, setVisibleQ] = useState(false);
    const [myb, setBlan] = useState(0);
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const { user, isLoading } = useUserSessions();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate(PATHS.LOGIN);
        }
    }, [isLoading, user, navigate]);

    const fetchData = async () => {
        try {
            const response = await getReq('/user/getAccount');
            setBlan(response.data.data.balance);
            setData(response.data.data.transactions);
        } catch (error) {
            console.error("Error fetching account data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    
  
    }, []);
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.walcontainer}>
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceAmount}>${myb}</Text>
                    <Text style={styles.balanceText}>My balance</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: user.profileImage ? `${PATHS.BASEURL}${user.profileImage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPq_GdHrAfGdnr3cLDeagSc7X_twjR_6Cz9Q&s"
                        }} 
                        accessibilityLabel="Profile Image"
                    />
                </View>
            </View>

            <View style={styles.payments}>
                <TouchableOpacity style={styles.linkContent} onPress={() => setVisibleD(true)}>
                    <FontAwesome name="arrow-down" style={styles.icon} />
                    <Text style={styles.navText}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkContent} onPress={() => setVisibleW(true)}>
                    <FontAwesome name="arrow-up" style={styles.icon} />
                    <Text style={styles.navText}>Withdrawal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkContent} onPress={() => setVisibleS(true)}>
                    <FontAwesome name="send" style={styles.icon} />
                    <Text style={styles.navText}>Transfer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkContent} onPress={() => setVisibleQ(true)}>
                    <FontAwesome name="qrcode" style={styles.icon} />
                    <Text style={styles.navText}>Request</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.donation}>
                <Text style={styles.totalt}>Total donate</Text>
                <Text style={styles.totalt}>$ 1,102</Text>
            </View>

            <View style={{ padding: 20, backgroundColor: '#fff' }}>
    {data.map((item) => {
        // Determine the background color based on the transaction type
        const backgroundColor = item.type === "withdrawal" ? "#FFCCCB" : "#90EE90"; // Light red for withdrawal, light green for deposit
        return (
            <View key={item._id} style={{ padding: 15, marginBottom: 10, borderRadius: 5, backgroundColor }}>
              <View style={styles.frist}>
              <Text>{ item.type === "withdrawal" ? "-" : "+" } ${item.amount}  { item.type === "withdrawal" ?  <FontAwesome name="arrow-up" style={styles.icon2} />  :  <FontAwesome name="arrow-down" style={styles.icon1} />  }          </Text>
             
              <Text>  {new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}</Text>

              </View>

             
             

              
               <View style={styles.frist2}>
               
               
               
                <Text>From: {item.from ? (item.from._id === user?._id ? "Your Account" : item.from.name) : "Bank"}</Text>
                <Text>To: {item.to ? (item.to._id === user?._id ? "Your Account" : item.to.name) : "Bank"}</Text> 

               </View>
                
            </View>
        );
    })}
</View>
<View style={{height:50}}></View>

            <Deposit visibleD={visibleD} setVisibleD={setVisibleD} fetchData={fetchData} />
            <Withdrawal visibleW={visibleW} setVisibleW={setVisibleW} fetchData={fetchData} />
            <Sent visibleS={visibleS} setVisibleS={setVisibleS} fetchData={fetchData} />
            <Request visibleQ={visibleQ} setVisibleQ={setVisibleQ} fetchData={fetchData} />
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    walcontainer: {
        marginTop: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    imageContainer: {},
    logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    icon: {
        color: "white",
        fontSize: 25,
    },
    linkContent: {
        flex: 1,
        backgroundColor: PATHS.mainColor,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navText: {
        marginTop: 5,
        fontSize: 11,
        color: "white",
    },
    payments: {
        borderRadius: 50,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30,
        height: 80,
    },
    donation: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: PATHS.mainColor,
        marginHorizontal: 20,
        height: 50,
        alignItems: 'center',
    },
    totalt: {
        fontSize: 16,
        color: "white",
    },
    frist:{
      flexDirection:'row',
      marginTop:0,
       justifyContent:'space-between'
    },
    frist2:{
      flexDirection:'row',
      marginTop:30,
      justifyContent:'space-between'
    },
    icon1:{
        color: "green",
        fontSize: 15,
    },
    icon2:{
        color: "red",
        fontSize: 15,
    }
});