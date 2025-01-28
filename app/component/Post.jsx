import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { PATHS } from "@/constants/pathConstants";
import Dialog from 'react-native-dialog';
import { useUserSessions } from "@/hooks/useUserSessions";

export default function Post({postsData}) {
const { user,isLoading } = useUserSessions();
    // State to control the visibility of the dialog
    const [visible, setVisible] = useState(false);
    const [donate, setDonate] = useState({doname:"",donameamount:0}); // State to store the donation input
 

    // Function to show the donation dialog
    const donatenow = (userid) => {
        setDonate({ ...donate, doname: userid,});
        setVisible(true);
    };

    // Function to handle donation submission
    const handleSubmit = () => {
        console.log(donate);
        setVisible(false);
        setDonate({ ...donate, doname:"",donameamount:0});
      
    };


    return (  isLoading ? <Text style={styles.isLoading}> Loading...</Text> : (
        <View style={styles.container}>
           {postsData?.map((post, index) => (
    <View key={index} style={styles.content}>
        <View style={styles.header}>
            <View style={styles.userbox}>
            <Image 
                source={{ uri: post.profile.imageUrl }} 
                style={styles.profileImage} 
            />
            <View>
            <Text style={styles.username}>{post.profile.username}</Text>
            <Text style={styles.date} >2020-02-90</Text>
            </View>
            </View>
            {user._id == post.profile._id ? (
                <View style={ styles.donate}>
                    <Text style={ styles.totaldonation}>
                    Total donated: $200
                    </Text>
                </View>
            ) : (
            <TouchableOpacity style={styles.donate} onPress={() =>donatenow(post.profile._id)}>
                <Text style={styles.donatetext}>
                    Donate now
                </Text>
            </TouchableOpacity>
        )}
        </View>
        <Text style={styles.postText}>
            {post.postText}
        </Text>
        <View style={styles.imageContainer}>
            <Image 
                source={{ uri: post.postImageUrl }} 
                style={styles.postImage} 
            />
        </View>
        <View style={styles.horizontalLine} />
    </View>

  
))}

           

            {/* Donation Dialog */}
            <Dialog.Container visible={visible}>
                <Dialog.Title style={styles.Dialog}>Enter Donation Amount</Dialog.Title>
                <Dialog.Input
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={donate.donameamount.toString()} // Convert to string for display
                    color="black"
                    onChangeText={(text) => {
                        // Ensure the value is a valid integer
                        const parsedValue = parseInt(text, 10);
                        setDonate({ ...donate, donameamount: isNaN(parsedValue) ? 0 : parsedValue });
                    }}
                />
                <Dialog.Button label="Cancel" onPress={()=>{setVisible(false);}} />
                <Dialog.Button label="Donate" onPress={handleSubmit} />
            </Dialog.Container>
        </View>
     ) );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 90
    },
    content: {
        marginBottom: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25, // Circle shape
        marginRight: 10,
    },
   
    username: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    postText: {
        fontSize: 14,
        color: '#333',
        marginTop: 2,
        textAlign:'justify',
        marginTop:5,
        marginBottom:7
    },
    imageContainer: {},
    postImage: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    icon: {
        fontSize: 24,
        color: '#333',
    },
    donate: {
      
        
    },
    donatetext: {
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: PATHS.secColor,
        color: 'white',
        borderRadius: 4

    },
    Dialog:{
        color:'black'
    },
    horizontalLine: {
        marginTop:10,
        width: '100%', // Adjust width as needed
        height: 1.3,    // Thickness of the line
        backgroundColor: '#000', // Color of the line
      },
      date:{
        color:'black',

        fontSize:12
      },
      isLoading:{
       margin:110,
       fontSize:40,
       width:200
      },
      totaldonation:{
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: PATHS.secColor,
        color: 'white',
        borderRadius: 4
      },
      userbox:{
        flexDirection:'row'
      }
});
