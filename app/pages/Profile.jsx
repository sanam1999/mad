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
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: 'https://img.freepik.com/premium-vector/hipster-frofile-hat-with-glasses_6229-762.jpg',
          }}
        />
        <Text style={styles.profileName}>{user?.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setVisible(true)}>
            <FontAwesome name="plus" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add to Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigate(PATHS.POST)}>
            <FontAwesome name="plus" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Add Post</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Donation and Volunteer Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <FontAwesome name="money" style={styles.statIcon} />
          <Text style={styles.statText}>Total Donations</Text>
          <Text style={styles.statValue}>$ 25</Text>
        </View>
        <View style={styles.statBox}>
          <FontAwesome name="handshake-o" style={styles.statIcon} />
          <Text style={styles.statText}>Volunteer Hours</Text>
          <Text style={styles.statValue}>25 hours</Text>
        </View>
      </View>

      {/* Modals */}
      <AddStory visible={visible} setVisible={setVisible} />
      <Post postsData={postsData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: PATHS.mainColor,
  },
  profileName: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: PATHS.mainColor,
    borderRadius: 25,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
    marginHorizontal: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    padding: 20,
    backgroundColor: PATHS.mainColor,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    color: '#ffffff',
    fontSize: 40,
    marginBottom: 10,
  },
  statText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 5,
  },
});