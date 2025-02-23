import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";



export default function AddPost({ formData, handleInputChange, fetchImage,user, navigate}) {
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async () => {
    const newErrors = {};
    if (!formData.text) {
      newErrors.text = "Title is required";
    }
    if (!formData.postImg?.uri) {
      newErrors.Image = "Image is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("text", formData.text);
  
    if (formData.postImg?.uri) {
      formDataToSend.append("postImg", {
        uri: formData.postImg.uri,
        name: formData.postImg.fileName || `image_${Date.now()}.jpg`,
        type: formData.postImg.mimeType || "image/jpeg",
      });
    }
  
    try {
      const response = await fetch(`${PATHS.BASEURL}/user/addpost?id=${user._id}`, {
        method: "POST",
        body: formDataToSend,
      });      
  
      const textResponse = await response.text();

  
      const result = JSON.parse(textResponse);
      if (response.ok) {
        alert("Post submitted successfully!");
                navigate(PATHS.PROFILE)
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post. Please try again.");
    }
  };
  

  return (
    <>
      {/* Caption Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Write a caption..."
        value={formData.text}
        onChangeText={(value) => handleInputChange("text", value)}
        multiline
        numberOfLines={5}
        maxLength={280}
      />
      {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}

      {/* Image Preview or Image Picker Icon */}
      {formData.postImg?.uri ? (
        <TouchableOpacity onPress={fetchImage}>
          <Image source={{ uri: formData.postImg.uri }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.iconBox} onPress={fetchImage}>
          <FontAwesome name="image" style={styles.icon} />
        </TouchableOpacity>
      )}
      {errors.Image && <Text style={styles.errorText}>{errors.Image}</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitbtn} onPress={handleFormSubmit}>
        <Text style={styles.text}>Post</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  image: {
    height: 340,
    width: 327,
    marginVertical: 5,
    borderRadius: 10,
  },
  icon: {
    color: PATHS.mainColor,
    fontSize: 80,
    textAlign: "center",
    justifyContent: 'center',
    marginVertical: 50,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  submitbtn: {
    backgroundColor: PATHS.mainColor,
    padding: 10,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  }
});