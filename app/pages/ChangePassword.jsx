import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { PATHS } from "@/constants/pathConstants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { postReq } from "../../hooks/useQuery";
import { useUserSessions } from "@/hooks/useUserSessions";
import { useNavigate } from "react-router-native";


export default function ChangePassword() {
  const navigate = useNavigate();
  const { user, isLoading, editUser } = useUserSessions();
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword === "" || newPassword !== confirmPassword || oldPassword === "") {
      alert("Passwords do not match or all fields are not filled.");
      return;
    }

    try {
      const userData = {
        username: user.username,
        currentPassword: oldPassword,
        newPassword: confirmPassword,
      };
      const { data, error, isError, message } = await postReq("/user/changepassword", userData);
      if (!isError) {
        console.log(data);
        alert("Password updated successfully!");
        navigate(PATHS.SETTING);
      } else {
        console.log("Error:", message);
        alert(message);
      }
    } catch (err) {
      alert("Error updating password."+err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeaderText}>Change Password</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Enter old password"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Re-enter New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter new password"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>
          Save Password <FontAwesome name="save" size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: PATHS.mainColor,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: PATHS.mainColor,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "40%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
