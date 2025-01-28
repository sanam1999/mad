import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";
import { useState, useEffect } from "react";

export default function Post() {
  const [postImg, setPostImg] = useState(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { user, isLoading } = useUserSessions();

  useEffect(() => {
    if (!isLoading && !user) {
     return navigate(PATHS.LOGIN);
    }
  }, [isLoading, user, navigate]);

  const fetchImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
console.log(result)
    if (!result.canceled) {
      setPostImg(result.assets[0]);
    }
  };

  const handlePost = () => {
    if (!postImg) {
      alert("An image must be uploaded before posting.");
      fetchImage();
      return;
    }

    if (!text.trim()) {
      alert("Please write a caption before posting.");
      return;
    }

    // navigate(PATHS.PROFILE);
    alert("Post submitted successfully!");
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write a caption..."
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={5}
        maxLength={280} // Optional: Add a character limit for captions
      />

      {postImg && (
        <Image source={{ uri: postImg.uri }} style={styles.profileImage} />
      )}

      <Button title="Post" onPress={handlePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  textInput: {
    height: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: "top", // Ensures text starts at the top
    fontSize: 16,
  },
  profileImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 20,
  },
});
