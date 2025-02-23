import { StyleSheet, Text, View, Image, TouchableOpacity,ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native"; 
import { PATHS } from "@/constants/pathConstants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useState,useEffect} from "react";
import Post from "../component/Post";
import AddStory from "../component/AddStory";
import {getReq} from '../../hooks/useQuery'

export default function Profile() {
  const [visible, setVisible] = useState(false);
  let navigate = useNavigate();
  const { user, isLoading, editUser } = useUserSessions();
  if (!isLoading && !user) {
    navigate(PATHS.LOGIN);
  }
  const [post , setpost]=useState([]);
  const [userHours , setuserHours]=useState('');

      const fetchData = async () => {
          try {
              const response = await getReq('/user/getpost?type=user');
              setpost(response.data.post)
              setuserHours(response.data.userHours)
          } catch (error) {
              console.error("Error fetching account data:", error);
          }
      };
  
      useEffect(() => {
          fetchData();
      }, []);

      const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes} m`;
      };
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
           uri: user?.profileImage ? `${PATHS.BASEURL}${user.profileImage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPq_GdHrAfGdnr3cLDeagSc7X_twjR_6Cz9Q&s"
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
          <Text style={styles.statValue}>{formatTime(userHours)}</Text>
        </View>
      </View>

      {/* Modals */}
      <AddStory visible={visible} setVisible={setVisible} user={user} />
      <Post postsData={post} />
   
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