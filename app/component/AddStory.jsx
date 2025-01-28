import Dialog from 'react-native-dialog';
import { useState,useEffect } from 'react';
import { StyleSheet, TextInput, Image, Button, View,Touchable } from "react-native";
import { PATHS } from '../../constants/pathConstants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";

function AddStory({visible,setVisible}) {
    const [postImg, setPostImg] = useState(null);
    const [text, setText] = useState("");

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
     setPostImg(null);
     navigate(PATHS.PROFILE);
     alert("Post submitted successfully!");
   };
 
   let cancel = () => {
    setPostImg(null)
    setText("")
   setVisible(false)
   }

  return (
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.Dialog}>What's on your mind?</Dialog.Title>
        <TextInput
          style={styles.textInput}
          placeholder="Write a caption..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={5}
          maxLength={280}
        />

        {postImg && postImg.uri ? (
        <Image source={{ uri: postImg.uri }} style={styles.profileImage} />
      ) : (
        <View  style={styles.iconbox}>
          <FontAwesome onPress={() => { fetchImage(); }} name="image" style={styles.icon} />
        </View>
      )}

  
       
        <Dialog.Button label="Cancel" onPress={cancel} style={styles.cancel} />
        <Dialog.Button label="Confirm" onPress={handlePost} style={styles.confromebtn} />
      </Dialog.Container>
  );
}

const styles = StyleSheet.create({
    Dialog: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 8,
    },
    cancel: {
      backgroundColor: 'red',
      color: 'white',
      padding: 10,
      borderRadius: 5,
      marginRight: 15,
    },
    confromebtn: {
        backgroundColor: PATHS.mainColor,
        color: 'white',
        padding: 10,
        borderRadius: 5,
      },
      iconbox:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:120
       
      },
      icon:{
        color:PATHS.mainColor,
        fontSize:80,
        marginBottom:120
      },
      profileImage:{
        height:340,
        width:290,
        marginTop:10,
        marginBottom:10,
        borderRadius:10
      }
});

export default AddStory;
