import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user, isLoading, editUser } = useUserSessions();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    navigate(PATHS.LOGIN);
    return null;
  }



  const handleUpdateProfile = async () => {
    if (!name || !email) {
      alert("Name and email cannot be empty.");
      return;
    }

    // Prepare form data to send to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    // Only append the image if it's selected
    if (profileImg) {
      formData.append("profileimg", {
        uri: profileImg.uri,
        type: profileImg.type,
        name: "profile-image.jpg", 
      });
    }

    try {
      const response = await fetch( PATHS.BASEURL+"/user/updateProfile", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();

      // if (response.ok) {
      //   editUser({ name, email, profileimg: result.profileImgPath });
      //   alert("Profile updated successfully!");
      // } else {
      //   alert(`Failed to update profile: ${result.message || "Unknown error"}`);
      // }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile.");
    }
  };

  const updateImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImg(result.assets[0]); // Store the selected image

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
          {profileImg ? (
            <Image source={{ uri: profileImg.uri }} style={styles.profileImage} />
          ) : (
            <Text style={styles.placeholder}>No Image Uploaded</Text>
          )}
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
