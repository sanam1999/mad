import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user, isLoading, editUser } = useUserSessions();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [isProfileImgChanged, setIsProfileImgChanged] = useState(false);

  // Populate form fields with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.username || "");
      setProfileImg(user.profileImage ? { uri: `${PATHS.BASEURL}${user.profileImage}` } : null);
    }
  }, [user]);

  // Show loading state
  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  // Redirect to login if user is not logged in
  if (!user) {
    navigate(PATHS.LOGIN);
    return null;
  }

  // Handle profile update
  const handleUpdateProfile = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("username", email);

    if (isProfileImgChanged && profileImg) {
      formDataToSend.append("profileImg", {
        uri: profileImg.uri,
        name: profileImg.fileName || "profile.jpg",
        type: profileImg.mimeType || "image/jpeg",
      });
    }

    try {
      const response = await fetch(`${PATHS.BASEURL}/user/updateProfile?id=${user._id}`, {
        method: "POST",
        body: formDataToSend,
      });

      const textResponse = await response.text();
      const result = JSON.parse(textResponse);

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        await editUser(result.user);
        navigate(PATHS.PROFILE);
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Failed to update profile. Please try again.");
    }
  };

  // Handle image upload
  const updateImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setProfileImg({
        uri: selectedImage.uri,
        fileName: selectedImage.fileName || "profile.jpg",
        mimeType: selectedImage.mimeType || "image/jpeg",
      });
      setIsProfileImgChanged(true); // Mark the image as changed
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Update Your Profile Details</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Profile Image</Text>
          {profileImg && <Image source={{ uri: profileImg.uri }} style={styles.profileImage} />}
          <TouchableOpacity
            style={[styles.button, styles.buttonMedium]}
            onPress={updateImage}
          >
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          </View>

<TouchableOpacity
  style={[styles.button, styles.buttonWide]}
  onPress={handleUpdateProfile}
>
  <Text style={styles.buttonText}>Save Profile</Text>
</TouchableOpacity>
</ScrollView>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
  },
  scrollContent: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: PATHS.mainColor,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  button: {
    backgroundColor: PATHS.mainColor,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonWide: {
    width: "60%",
  },
  buttonMedium: {
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
