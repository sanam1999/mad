import { useState, useEffect, useCallback } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  Switch, ScrollView 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigate } from "react-router-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { PATHS } from "@/constants/pathConstants";
import AddPost from '../component/AddPost'
import AddDonateFood from '../component/AddDonatefood'

export default function Post() {
  const navigate = useNavigate();
  const { user, isLoading } = useUserSessions();

  const [toggle, setToggle] = useState(true);
  const [formData, setFormData] = useState({
    text: "",
    foodName: "",
    description: "",
    quantity: "",
    expiryDate: new Date(),
    location: "",
    postImg: null,
  });
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(PATHS.LOGIN);
    }
  }, [isLoading, user, navigate]);


  const fetchImage = useCallback(async () => {
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

    if (!result.canceled) {
      handleInputChange("postImg", result.assets[0]);
    }
  }, []);




  return (
    <ScrollView style={styles.container}>
      <View style={styles.toggle}>
        <Text style={styles.toggleText}>{toggle ? "Post" : "Food Donate"}</Text>
        <Switch
          value={toggle}
          onValueChange={() => setToggle(!toggle)}
          trackColor={{ false: PATHS.secColor ,true: PATHS.secColor }}
          thumbColor={PATHS.mainColor}
        />
      </View>

      {toggle ? (
        <AddPost 
          formData={formData} 
          handleInputChange={handleInputChange} 
          fetchImage={fetchImage} 
          user={user}
          navigate={navigate}
          
        />
      ) : (
        <AddDonateFood 
          formData={formData} 
          handleInputChange={handleInputChange} 
          fetchImage={fetchImage}
          user={user}
          navigate={navigate}
        />
      )}
    </ScrollView>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginBottom:50,
  
  },
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
    justifyContent:'center',
    marginVertical: 50,
  },
  iconBox: {

    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 19,
    fontWeight: "500",
    color: "#333",
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
  
    borderColor: "#ccc",
   

    marginBottom: 10,
  },

    mapbtn: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
      textAlign: 'center',
      backgroundColor: PATHS.mainColor,
      padding:10,
      borderRadius:10,
      marginBottom:10,
      height:50,
      marginLeft:5
      
    },
    submitbtn:{
      backgroundColor:PATHS.mainColor,
      padding:10,
      borderRadius:10
    },
    text:{
      color:'white',
      fontSize:15,
      textAlign:'center'
    }
});
