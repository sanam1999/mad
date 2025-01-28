
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';





export default function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.navContainer}>
       
       <TouchableOpacity>
         <Link to={PATHS.HOME} underlayColor="#ddd">
           <View style={styles.linkContent}>
             <FontAwesome name="home"  style={styles.icon}/>
             <Text style={styles.navText}>Home</Text>
           </View>
         </Link>
       </TouchableOpacity>
       <TouchableOpacity>
         <Link to={PATHS.LOGIN} underlayColor="#ddd">
           <View style={styles.linkContent}>
           <FontAwesome name="lightbulb-o" style={styles.icon} />
             <Text style={styles.navText}>Solution</Text>
           </View>
         </Link>
       </TouchableOpacity>
       <TouchableOpacity>
         <Link to={PATHS.POST} underlayColor="#ddd">
           <View style={styles.linkContent}>
             <FontAwesome name="plus"  style={styles.icon}/>
             <Text style={styles.navText}>Post</Text>
           </View>
         </Link>
       </TouchableOpacity>
       <TouchableOpacity>
         <Link to={PATHS.WALLET} underlayColor="#ddd">
           <View style={styles.linkContent}>
           <MaterialIcons name="account-balance-wallet" style={styles.icon} />
             <Text style={styles.navText}>Wallet</Text>
           </View>
         </Link>
       </TouchableOpacity>

       <TouchableOpacity >
         <Link to={PATHS.ABOUT} underlayColor="#ddd">
           <View style={styles.linkContent}>
           <FontAwesome name="users"  style={styles.icon}/>
           <Text style={styles.navText}>About</Text>
           </View>
         </Link>
       </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: PATHS.mainColor, 
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },

  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  navItem: {
    marginHorizontal: 10,
  },
  icon:{
    color:"white",
    fontSize: 20,

  },
  linkContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  navText:{
    fontSize:12,
    color:"white"
  }
  
 
  });
