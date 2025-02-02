import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PATHS } from "@/constants/pathConstants";
import * as Location from "expo-location";

const AddDonateFood = ({ formData, handleInputChange, fetchImage }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.foodName) newErrors.foodName = "Food Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePost = () => {
    if (validateForm()) {
      // Perform post action (API call, navigation, etc.)
      console.log("Form submitted successfully!");
      // navigate(PATHS.PROFILE);
    }
  };

  const getLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    handleInputChange("location", "Loading...");
    const locationData = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude,
    });

    if (address.length > 0) {
      const { city, country, street } = address[0];
      const readableAddress = `${street || ""}, ${city || ""}, ${country || ""}`;
      handleInputChange("location", readableAddress || "Address not found");
    } else {
      alert("Address not found");
    }
  }, [handleInputChange]);

  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder="Food Name (e.g., Vegetable Soup)"
        value={formData.foodName}
        onChangeText={(value) =>  handleInputChange("foodName", value)}
      />
      {errors.foodName && <Text style={styles.errorText}>{errors.foodName}</Text>}

      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="Description..."
        value={formData.description}
        onChangeText={(value) => handleInputChange("description", value)}
        multiline
        numberOfLines={3}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <TextInput
        style={styles.textInput}
        placeholder="Quantity (e.g., 3 servings or 2 kg)"
        value={formData.quantity}
        onChangeText={(value) => handleInputChange("quantity", value)}
        keyboardType="numeric"
      />
      {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

      <View style={styles.locationBox}>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          placeholder="Enter Pickup Location"
          value={formData.location}
          onChangeText={(value) => handleInputChange("location", value)}
        />
        <TouchableOpacity style={styles.mapbtn} onPress={getLocation}>
          <FontAwesome name="map-marker" size={24} color="white" />
          <Text style={styles.text}>Current place</Text>
        </TouchableOpacity>
      </View>
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      {formData.postImg?.uri ? (
        <TouchableOpacity onPress={fetchImage}>
          <Image source={{ uri: formData.postImg.uri }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.iconBox} onPress={fetchImage}>
          <FontAwesome name="image" style={styles.icon} />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.submitbtn} onPress={handlePost}>
        <Text style={styles.text}>Post</Text>
      </TouchableOpacity>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </>
  );
};

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
  textArea: {
    height: 100,
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
    justifyContent: "center",
    marginVertical: 50,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mapbtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PATHS.mainColor,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    marginLeft: 5,
  },
  submitbtn: {
    backgroundColor: PATHS.mainColor,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default AddDonateFood;
