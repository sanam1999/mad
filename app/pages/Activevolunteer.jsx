import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";

export default function ActiveVolunteer({ route }) {
  let post = {
    profile: {
      _id: "67988e9738ae8ff4cd31b296",
      username: "@user1",
      imageUrl:
        "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    foodName: "Apple Pie",
    description: "Homemade with fresh apples and a flaky crust.",
    quantity: "2",
    location: "saliyala",
    postImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "67890",
    user_id: "user123",
    date: new Date("2023-10-26").toISOString(), // Store as ISO string
    picupuser_id: "",
  };

  const openGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
  
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open Google Maps.');
      }
    });
  };

  const [timeSincePost, setTimeSincePost] = useState(0);

  // Timer to update the time elapsed since the post was created
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSincePost((prevTime) => prevTime + 1); // Increment the counter every second
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  // Function to convert seconds to minutes and seconds
  const Time = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes > 0 ? ` ${minutes} :` : ""} ${seconds}`;
  };

  return (
  
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: post.profile.imageUrl }} style={styles.profileImage} />
            <View>
              <Text style={styles.username}>{post.profile.username}</Text>
              <Text style={styles.date}>{new Date(post.date).toDateString()}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.texttype}>  Volunteer </Text>
            <Text style={styles.timeCounter}>Time: {Time(timeSincePost)}</Text>
          </View>
        </View>

        {/* Post Content */}
        <Text style={styles.postText}>{post.description}</Text>
        <Image source={{ uri: post.postImg }} style={styles.postImage} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => openGoogleMaps(post.location)} style={styles.button}>
            <FontAwesome name="map-marker" size={28} color='white' />
            <Text style={styles.buttonText}>Open in Maps</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>End Volunteer</Text>
          </TouchableOpacity>
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  postContainer: {
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
    marginTop:60
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  timeCounter: {
    fontSize: 15,
    color: "black",
    fontWeight: "400",
  },
  postText: {
    fontSize: 14,
    marginVertical: 10,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  texttype: {
    fontWeight: "800",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: PATHS.mainColor
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color:'white'
  },
});