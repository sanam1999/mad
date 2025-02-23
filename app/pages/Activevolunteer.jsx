import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";
import { useUserSessions } from "@/hooks/useUserSessions";
import { postReq, getReq } from "../../hooks/useQuery";
import moment from 'moment-timezone';
import { useNavigate } from "react-router-native";

export default function ActiveVolunteer() {
  const [posts, setPosts] = useState([]);
  const { user, isLoading } = useUserSessions();
  const [timeSincePosts, setTimeSincePosts] = useState({});
   let navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user?._id) {
      getReq(`/user/activepost?_id=${user._id}`)
        .then((data) => {
          setPosts(data.data.data);

          // Initialize time counters
          const initialTimes = {};
          data.data.data.forEach(post => {
            initialTimes[post._id] = calculateTimeElapsed(post.updatedAt);
          });
          setTimeSincePosts(initialTimes);
        })
        .catch((e) => {
          console.log(e);
          Alert.alert("Error", "Failed to fetch posts.");
        });
    }
  }, [isLoading, user?._id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSincePosts(prevTimes => {
        const updatedTimes = {};
        posts.forEach(post => {
          updatedTimes[post._id] = calculateTimeElapsed(post.updatedAt);
        });
        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [posts]);

  const calculateTimeElapsed = (updatedAt) => {
    const updatedMoment = moment.utc(updatedAt);
    const nowMoment = moment.utc();
    return formatTime(nowMoment.diff(updatedMoment, 'seconds'));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes > 0 ? `${minutes}m ` : ""}${remainingSeconds}s`;
  };

  const openGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open Google Maps.");
      }
    });
  };
  const endvol = async(endvol)=>{
    const data = {
      endvol
    };
    console.log(endvol)
    const { error,message, isError } = await postReq('/user/endvol', data);
   
    isError ? alert(message) : navigate(PATHS.Volunteer)
  }

  return (
    <ScrollView style={styles.container}>
      {posts.map((post) => (
        <View key={post._id} style={styles.postContainer}>
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: user.profileImage
                    ? `${PATHS.BASEURL}${user.profileImage}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPq_GdHrAfGdnr3cLDeagSc7X_twjR_6Cz9Q&s"
                }}
                accessibilityLabel="Profile Image"
              />
              <View>
                <Text style={styles.username}>{post.user.name}</Text>
                <Text style={styles.date}>{new Date(post.createdAt).toDateString()}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.texttype}>Volunteer</Text>
              <Text style={styles.timeCounter}>Time: {timeSincePosts[post._id] || "Calculating..."}</Text>
            </View>
          </View>
          <Text style={styles.postText2}>{post.foodName}</Text>
          <Text style={styles.postText}>{post.description}</Text>
        
          {post.imgUri && <Image source={{ uri: `${PATHS.BASEURL}${post.imgUri}`  }}  style={styles.postImage} />}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => openGoogleMaps(post.location)} style={styles.button}>
              <FontAwesome name="map-marker" size={28} color="white" />
              <Text style={styles.buttonText}>Open in Maps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>endvol(post._id)}>
              <Text style={styles.buttonText}>End Volunteer</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={{height:90}}></View>
    </ScrollView>
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
    marginTop: 60,
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
    marginVertical: 6,
  },
  postText2: {
    fontSize: 18,
    fontWeight:600,
    marginVertical: 6,
  },
  postImage: {
    width: "100%",
    height: 350,
    borderRadius: 10,
  },
  texttype: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft:15
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: PATHS.mainColor,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
});