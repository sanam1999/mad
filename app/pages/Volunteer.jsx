import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";
import FoodVolunteer from '../component/FoodDonate'
import { useEffect, useState } from "react";
import { getReq } from '../../hooks/useQuery';

export default function Volunteer() {
  let navigate = useNavigate();
  const [food ,setfood] = useState([])
  const [userHours, setuserhours] =useState(0)
  const fetchData = async () => {
    try {
        const response = await getReq('/user/getfood');
        setfood(response.data.foodpost);
        setuserhours(response.data.userHours)
    } catch (error) {
        console.error("Error fetching account data:", error);
    }
};

  const { user, isLoading } = useUserSessions();
   useEffect(()=>{
       if (!isLoading && !user) {
           return  navigate(PATHS.LOGIN);
          }
          fetchData();
         
   },[isLoading,user,navigate])

   const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes}m`;
  };
     
  return (
    <ScrollView style={styles.container}>
      <View style={styles.totalV}>
        <Text style={styles.text}>Total Volunteer Hours</Text>
        <Text style={styles.hours}> {formatTime(userHours)}</Text>
      </View>
      <FoodVolunteer foodPosts={food}/>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  totalV: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#ffffff", // White background for the card
    padding: 20,
    borderRadius: 12, // Rounded corners for a modern look
    shadowColor: "#000", // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // For Android shadow
    marginBottom:14
  },
  text: {
    fontSize: 18,
    fontWeight: "500", // Semi-bold for better readability
    color: "#333333", // Darker text for contrast
  },
  hours: {
    fontSize: 18,
    fontWeight: "700", 
    color: PATHS.mainColor ,
  },
});