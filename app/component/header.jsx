import React from "react";
import { StyleSheet, Text, View, TouchableOpacity , Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { Link } from "react-router-native";
import {PATHS} from '../../constants/pathConstants'
import { useLocation } from 'react-router-native';

export default function Header() {
    const location = useLocation();
  const getActiveStyle = (path) => {
    return location.pathname === path ? { color: "yellow"} : {};
  };

  return (
    <View style={styles.header}>
       <TouchableOpacity>
               <Link to={PATHS.HOME} underlayColor="">
      <View style={styles.navContainer}>
      <Image 
          style={styles.logo} 
        source={require('../../assets/images/icon1.png')} 
        />
         <Text style={styles.navText}>Flash Food</Text>
      </View>
       </Link>
             </TouchableOpacity>
      <TouchableOpacity >
         <Link to={PATHS.SETTING} underlayColor="">
           <View style={styles.linkContent}>
           <View style={styles.notifid}><Text style={styles.notifidText}>2</Text></View>
             <FontAwesome name="gears"  style={[styles.icon ,getActiveStyle(PATHS.SETTING)]} />
             
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
    height:35,
    width:35,
    color:"white",
    color: "#fff", 
    marginHorizontal:13,
    
  },
  navText: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  }
  ,
  linkContent:{
    padding:6,
   
  },
  icon:{
    fontSize: 20,
    color:"white",
    marginHorizontal:8,
    top:3
  },
  notifid:{
     position:'absolute',
     height: 16, 
     width: 16, 
     backgroundColor:'red',
     zIndex:1000,
     bottom:19,
     left:30,
     borderRadius:50,
   },
 
   notifidText:{
     textAlign:'center',
     color:'white',
     fontSize:12,
     fontWeight: 'bold'
   },
 
});

