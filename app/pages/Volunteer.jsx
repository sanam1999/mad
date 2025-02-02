import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import { PATHS } from "@/constants/pathConstants";
import FoodVolunteer from '../component/FoodDonate'
const foodPosts = [
  {
    
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Apple Pie",
    description: "Homemade with fresh apples and a flaky crust.",
    quantity: "2",
    location: "hcbt",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "67890",
    user_id: "user123",
    date: new Date("2023-10-26"),
    picupuser_id: ""
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Banana Bread",
    description: "Moist and delicious, made with ripe bananas.",
    quantity: "3",
    location: "789 Oak St, Villagetown",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "54321",
    user_id: "user456",
    date: new Date("2023-10-27"),
    picupuser_id: "e5f6g7h8"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Chocolate Cake",
    description: "Rich and decadent, perfect for celebrations.",
    quantity: "1",
    location: "321 Pine St, Hamletville",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "98765",
    user_id: "user789",
    date: new Date("2023-10-28"),
    picupuser_id: ""
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Vegetable Soup",
    description: "Hearty and healthy, packed with fresh veggies.",
    quantity: "4",
    location: "654 Birch St, Countryside",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "11223",
    user_id: "user101",
    date: new Date("2023-10-29"),
    picupuser_id: "m3n4o5p6"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Cheese Pizza",
    description: "Classic cheese pizza with a crispy crust.",
    quantity: "6",
    location: "987 Cedar St, Mountainview",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "44556",
    user_id: "user202",
    date: new Date("2023-10-30"),
    picupuser_id: "q7r8s9t0"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Blueberry Muffins",
    description: "Freshly baked with juicy blueberries.",
    quantity: "8",
    location: "hcbt",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "77889",
    user_id: "user303",
    date: new Date("2023-10-31"),
    picupuser_id: "u1v2w3x4"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Grilled Chicken Salad",
    description: "Healthy and filling, with a lemon vinaigrette.",
    quantity: "2",
    location: "246 Walnut St, Riverside",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "99001",
    user_id: "user404",
    date: new Date("2023-11-01"),
    picupuser_id: "y5z6a7b8"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Beef Stew",
    description: "Slow-cooked with tender beef and vegetables.",
    quantity: "5",
    location: "369 Spruce St, Hilltop",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "22334",
    user_id: "user505",
    date: new Date("2023-11-02"),
    picupuser_id: "c9d0e1f2"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Vanilla Cupcakes",
    description: "Soft and fluffy, topped with buttercream frosting.",
    quantity: "12",
    location: "482 Cherry St, Meadowland",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "55667",
    user_id: "user606",
    date: new Date("2023-11-03"),
    picupuser_id: "g3h4i5j6"
  },
  {
    profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
    foodName: "Tomato Basil Pasta",
    description: "Simple and flavorful, made with fresh basil.",
    quantity: "3",
    location: "573 Willow St, Brookside",
    postImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRmYX4OqLGoOrbQXe2XFcDAbNphmu7dgkdQ&s",
    post_id: "88990",
    user_id: "user707",
    date: new Date("2023-11-04"),
    picupuser_id: "k7l8m9n0"
  }
];
export default function Volunteer(props) {
  let navigate = useNavigate();
  const { user, isLoading, editUser } = useUserSessions();
  !isLoading && !user ? navigate(PATHS.LOGIN) : " ";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.totalV}>
        <Text style={styles.text}>Total Volunteer Hours</Text>
        <Text style={styles.hours}>40 Hours</Text>
      </View>
      <FoodVolunteer foodPosts={foodPosts}/>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light background for better contrast
    // alignItems: "center",
    
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