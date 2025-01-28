import React from "react";
import { StyleSheet, Text, View, TouchableOpacity , Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { Link } from "react-router-native";
import {PATHS} from '../../constants/pathConstants'

export default function Header() {
  return (
    <View style={styles.header}>
       <TouchableOpacity>
               <Link to={PATHS.HOME} underlayColor="#ddd">
      <View style={styles.navContainer}>
      <Image 
          style={styles.logo} 
          // source={require('../../assets/images/icon1.png')} 
        />
         <Text style={styles.navText}>Zero Hunger</Text>
      </View>
       </Link>
             </TouchableOpacity>
      <TouchableOpacity >
         <Link to={PATHS.SETTING} underlayColor="#ddd">
           <View style={styles.linkContent}>
             <FontAwesome name="gears"  style={styles.icon} />
             
           </View>
         </Link>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: PATHS.mainColor,
    padding: 5,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: 'row', // Aligns items horizontally
    justifyContent: 'space-between',

   
    
  },
  navContainer: {
    flexDirection: "row", 
    alignItems: "center",
   
  },
  logo: {
    height:30,
    width:30,
    color:"white",
    color: "#fff", 
  },
  navText: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  }
  ,
  linkContent:{
    padding:6,
   
  },
  icon:{
    fontSize: 19,
    color:"white"
  }
});

