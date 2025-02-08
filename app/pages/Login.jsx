import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { useNavigate } from "react-router-native"; 
import { useState } from "react";
import { postReq } from '../../hooks/useQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATHS } from "@/constants/pathConstants";



export default function Login() {
    const [errors, setErrors] = useState({});
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();
    let gotologin = () => {
        navigate('/singup');
    };
  
    let getfromdata = async() => {
        let formErrors = {};
        
        if (!Email) {
            formErrors.Email = "Email is required";
        } 
        if (!Password) {
            formErrors.Password = "Password is required";
        }
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            try {
                const userData = {
                    username:Email,
                    password:Password,
                };
                const {data , error , isError} = await postReq('/user/login', userData);
                if(!isError){
                    console.log(data)
                    alert("Welcome Back "+ data.user.name)
                    await AsyncStorage.setItem('userSession', JSON.stringify(data.user));
                    console.log(data)
                    navigate('/');
                }else{
                  
                    alert(error)
                }
            } catch (error) {
                alert("Error adding user or saving session:");
            }
        } else {

            alert("Please fix the errors and try again.");
        }
    
    };
  
   
    return (
        <View style={styles.container}>
            <View style={styles.Subcontainer}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={setEmail} // Corrected from onChange to onChangeText.
                        placeholder="Enter your email" 
                        value={Email} 
                    />
                       {errors.Email && (
        <Text style={styles.error}>
            <FontAwesome name="exclamation-triangle" size={13} /> {errors.Email}
        </Text>
    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        onChangeText={setPassword} // Corrected from onChange to onChangeText.
                        placeholder="Enter your password" 
                        value={Password} 
                    />
                       {errors.Password && (
        <Text style={styles.error}>
            <FontAwesome name="exclamation-triangle" size={13} /> {errors.Password}
        </Text>
    )}
                </View>
                <TouchableOpacity style={styles.button} onPress={getfromdata}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={gotologin}>
                    <Text style={styles.goToLogin}>Don't have an account?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
       
    },
    Subcontainer: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "#333",
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#f9f9f9",
    },
    button:{
        backgroundColor: PATHS.mainColor,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        margin: 15,

    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    googleSignup: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center",
    },
    icon: {
        fontSize: 20,
        color: PATHS.mainColor,
        marginRight: 8,
    },
    googleText: {
        fontSize: 16,
        color: "#333",
    },
    goToLogin: {
        textAlign:"center",
        color: PATHS.mainColor,
    },
    error:{
        color:"red"
    }
});
