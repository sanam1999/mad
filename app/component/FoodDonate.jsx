import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,Linking } from "react-native";
import { PATHS } from "@/constants/pathConstants";
import Dialog from "react-native-dialog";
import { useUserSessions } from "@/hooks/useUserSessions";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function FoodVolunteer({ foodPosts }) {
  const { user, isLoading } = useUserSessions();
  const [visible, setVisible] = useState(false);
  const [location, setlocation] = useState("")
  const [donate, setDonate] = useState({ doname: "", donameamount: 0 });

  const donatenow = (userid,locatio) => {
    setDonate({ ...donate, doname: userid });
    setlocation(locatio)
    setVisible(true);
  };

  const handleSubmit = () => {
    console.log(donate);
    setVisible(false);
    setDonate({ ...donate, doname: "", donameamount: 0 });
  };

  if (isLoading) {
    return <Text style={styles.isLoading}>Loading...</Text>;
  }
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
  return (
    <>
      {foodPosts?.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: post.profile.imageUrl }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.username}>{post.profile.username}</Text>
                <Text style={styles.date}>
                  {new Date(post.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
            {post.picupuser_id ? (
              <View style={styles.takenContainer}>
                <Text style={styles.takenText}>Food Taken</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.volunteerButton}
                onPress={() => donatenow(post.post_id, post.location)}
              >
                <Text style={styles.volunteerButtonText}>Volunteer</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Food Details Section */}
          <View style={styles.foodDetails}>
            <View style={styles.foodDetailslist}>
            <Text style={styles.foodName}>{post.foodName}</Text>
            <Text style={styles.quantity}>Quantity: {post.quantity} kg</Text>
            </View>
            <TouchableOpacity
      style={styles.locationContainer}
      onPress={() => openGoogleMaps(post.location)}
    >
      <FontAwesome
        name="map-marker"
        size={20}
        color={PATHS.mainColor}
      />
      <Text style={styles.locationText}>{post.location}</Text>
    </TouchableOpacity>
          </View>

          {/* Post Description */}
          <Text style={styles.postDescription}>{post.description}</Text>

          {/* Post Image */}
          {post.postImg && (
            <Image source={{ uri: post.postImg }} style={styles.postImage} />
          )}
        </View>
      ))}

      {/* Donation Dialog */}
      <Dialog.Container visible={visible}>
  <Dialog.Title style={styles.dialogTitle}>
    Are you sure you want to volunteer?
  </Dialog.Title>
  <Text></Text>
      <Text style={styles.dialogTitle}>   <FontAwesome
        name="map-marker"
        size={28}
        color={PATHS.mainColor}
      /> {location}</Text>
  <Text></Text>
  <Dialog.Button
    label="Cancel"
    onPress={() => setVisible(false)}
    style={styles.dialogCancelButton}
  />
  <Dialog.Button
    label="Confirm"
    onPress={handleSubmit}
    style={styles.dialogDonateButton}
  />
  <Dialog.Button
    label="See Location"
    onPress={() => openGoogleMaps(location)}
    style={styles.dialogDonateButton}
  />
</Dialog.Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  takenContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  takenText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  volunteerButton: {
    backgroundColor: PATHS.mainColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  volunteerButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  foodDetails: {
    marginBottom: 12,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: PATHS.mainColor,
    marginLeft: 6,
    textDecorationLine: 'underline',
  },
  postDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 12,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  dialogInput: {
    fontSize: 16,
    color: "#333",
  },
  dialogCancelButton: {
    color: "#666",
  },
  dialogDonateButton: {
    color: PATHS.secColor,
    fontWeight: "600",
  },
  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#666",
  },
  foodDetailslist:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});