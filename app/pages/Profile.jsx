import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native"; 
import { PATHS } from "@/constants/pathConstants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useState} from "react";
import Post from "../component/Post";
import AddStory from "../component/AddStory";
const postsData = [
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "Sanam shrestha",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "Sanam shrestha",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "Sanam shrestha",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "Sanam shrestha",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
]

export default function Profile() {
   const [visible, setVisible] = useState(false);
    let navigate = useNavigate();
    const { user, isLoading, editUser } = useUserSessions();
    if (!isLoading && !user) {
        navigate(PATHS.LOGIN);
    }
  
    return (
    <ScrollView style={styles.container}>
        <View style={styles.profilebox}>
            <Image
                style={styles.profileimg}
                source={{
                    uri: 'https://img.freepik.com/premium-vector/hipster-frofile-hat-with-glasses_6229-762.jpg',
                }}
            />
            <Text style={styles.profiletext}>{user.name}</Text>
            <View style={styles.btnperents}>
                <TouchableOpacity style={styles.storyBox} onPress={()=>{setVisible(true)}}>
                    <FontAwesome name="plus" style={styles.icon} />
                    <Text style={styles.btnText}>Add to story</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.storyBox} onPress={()=>navigate(PATHS.POST)}>
                        <FontAwesome name="plus" style={styles.icon} />
                        <Text style={styles.btnText}>Add post</Text>
                </TouchableOpacity>
            </View>
        </View>
         
    <View style={styles.horizontalLine} />
    <View style={styles.container2}>
  <View style={styles.donationBox}>
    <FontAwesome name="money" style={styles.icon2} />
    <Text style={styles.donationText}>Total Donations</Text>
    <Text style={styles.donationHours}>$ 25</Text>
  </View>
  <View style={styles.donationBox}>
    <FontAwesome name="handshake-o" style={styles.icon2} />
    <Text style={styles.donationText}>Volunteer Hours</Text>
    <Text style={styles.donationHours}>25 hours</Text>
  </View>
</View>
<AddStory visible={visible} setVisible={setVisible}/>
<Post postsData={postsData}/>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
   
  },
  profileimg:{
    height:190,
    width:190,
    borderRadius:100,
    borderColor:10,
    borderWidth:5,
    borderColor:PATHS.mainColor,
  },
  profilebox:{
    marginTop:30,
    marginLeft:5
  },
  profiletext:{
    marginTop:8,
    fontSize:25,
    fontWeight:500,
    marginLeft:15
  },
  icon:{
    color:'white',
    marginRight:8,
    fontSize:20,
    fontWeight:'200'
  },
  btnperents:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:15

  },
  storyBox: {
    flexDirection: 'row', // Aligns icon and text horizontally
    alignItems: 'center', 
   justifyContent:'center',
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    width:140,
    shadowOpacity: 0.1,
    backgroundColor:PATHS.mainColor,
    
  },
  btnText:{
    fontSize:20,
    fontWeight:400,
    color:'white'
  },
  horizontalLine: {
    marginTop:8,
    width: '97%', // Adjust width as needed
    height: 1.3,    // Thickness of the line
    backgroundColor: '#000', // Color of the line
    paddingHorizontal:5,
    marginLeft:5

  },
  
  container2: {
    marginTop:8,
    flexDirection: 'row', 
    justifyContent:'space-around'
  },
  donationBox: {
  justifyContent:'space-evenly',
    width:150,
    height:130,
    backgroundColor:PATHS.mainColor,
    borderRadius:13
  },
  icon2: {
    color: 'white',
    fontSize: 50,
    textAlign:'center',
  },
  donationText: {
    fontSize: 18,
    textAlign:'center',
    fontWeight: '500',
    color: 'white',
  },
  donationHours: {
    fontSize: 16,
    textAlign:'center',
    color: 'white',
  },

});
