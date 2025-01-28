import { StyleSheet, Text, View } from "react-native";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native"; 
import { PATHS } from "@/constants/pathConstants";
export default function About(props) {
    let navigate = useNavigate();
    const { user, isLoading,editUser } = useUserSessions();
    !isLoading && !user ? (navigate(PATHS.LOGIN)) : " ";
  return (
    <View style={styles.container}>
      <Text>About page {props.username} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
