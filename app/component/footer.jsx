import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "react-router-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLocation } from 'react-router-native';

export default function Footer() {
  const location = useLocation();

  const getActiveStyle = (path) => {
    return location.pathname === path ? { color: "yellow"} : {};
  };

  return (
    <View style={styles.footer}>
      <View style={styles.navContainer}>
        <TouchableOpacity>
          <Link to={PATHS.HOME} underlayColor="">
            <View style={styles.linkContent}>
              <View style={styles.notifid}><Text style={styles.notifidText}>10</Text></View>
              <FontAwesome name="home" style={[styles.icon, getActiveStyle(PATHS.HOME)]} />
              <Text style={[styles.navText, getActiveStyle(PATHS.HOME)]}>Home</Text>
            </View>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Link to={PATHS.Volunteer} underlayColor="">
            <View style={styles.linkContent}>
              <View style={styles.notifid}><Text style={styles.notifidText}>8</Text></View>
              <FontAwesome name="lightbulb-o" style={[styles.icon, getActiveStyle(PATHS.Volunteer)]} />
              <Text style={[styles.navText, getActiveStyle(PATHS.Volunteer)]}>Solution</Text>
            </View>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Link to={PATHS.POST} underlayColor="">
            <View style={styles.linkContent}>
              <FontAwesome name="plus" style={[styles.icon, getActiveStyle(PATHS.POST)]} />
              <Text style={[styles.navText, getActiveStyle(PATHS.POST)]}>Post</Text>
            </View>
          </Link>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Link to={PATHS.WALLET} underlayColor="">
            <View style={styles.linkContent}>
              <MaterialIcons name="account-balance-wallet" style={[styles.icon, getActiveStyle(PATHS.WALLET)]} />
              <Text style={[styles.navText, getActiveStyle(PATHS.WALLET)]}>Wallet</Text>
            </View>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link to={PATHS.ABOUT} underlayColor="">
            <View style={styles.linkContent}>
              <FontAwesome name="users" style={[styles.icon, getActiveStyle(PATHS.ABOUT)]} />
              <Text style={[styles.navText, getActiveStyle(PATHS.ABOUT)]}>About</Text>
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
  icon: {
    color: "white",
    fontSize: 20,
  },
  linkContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: "white",
  },
  notifid: {
    position: 'absolute',
    height: 16, 
    width: 16, 
    backgroundColor: 'red',
    zIndex: 1000,
    bottom: 24,
    left: 20,
    borderRadius: 50,
  },
  notifidText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
