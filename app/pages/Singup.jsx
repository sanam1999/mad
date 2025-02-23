import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome"; 
import { useNavigate } from "react-router-native"; 
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postReq } from '../../hooks/useQuery';
import { PATHS } from "@/constants/pathConstants";

export default function Signup() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState(""); 
    const [Password, setPassword] = useState("");
    const [RePassword, setRePassword] = useState("");

    const handleSignup = async () => {
        let formErrors = {};

        // Form validation
        if (!Name) {
            formErrors.Name = "Name is required";
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!Email) {
            formErrors.Email = "Email is required";
        } else if (!emailRegex.test(Email)) {
            formErrors.Email = "Please enter a valid email address";
        }

        if (!Password) {
            formErrors.Password = "Password is required";
        }

        if (Password !== RePassword) {
            formErrors.RePassword = "Passwords do not match";
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const userData = {
                    Name,
                    Email,
                    Password,
                };
   
                const {data , error , isError} = await postReq('/user/signup', userData);
                if(!isError){
                    await AsyncStorage.setItem('userSession', JSON.stringify(data.user));
       
                    alert("Welcome "+ Name)
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

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.Subcontainer}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={setName} 
                        value={Name} 
                    />
                    {errors.Name && (
                        <Text style={styles.error}>
                            <FontAwesome name="exclamation-triangle" size={13} /> {errors.Name}
                        </Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={setEmail} 
                        value={Email} 
                        keyboardType="email-address"
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
                        onChangeText={setPassword} 
                        value={Password} 
                    />
                    {errors.Password && (
                        <Text style={styles.error}>
                            <FontAwesome name="exclamation-triangle" size={13} /> {errors.Password}
                        </Text>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Re-Password</Text>
                    <TextInput 
                        style={styles.input} 
                        secureTextEntry 
                        onChangeText={setRePassword} 
                        value={RePassword} 
                    />
                    {errors.RePassword && (
                        <Text style={styles.error}>
                            <FontAwesome name="exclamation-triangle" size={13} /> {errors.RePassword}
                        </Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLogin}>
                    <Text style={styles.goToLogin}>Already have an account?</Text>
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
         position:'static'
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
        marginBottom: 2,
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
    button: {
        backgroundColor: PATHS.mainColor,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 15,
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
        color: PATHS.mainColor,
        textAlign: "center",
        marginTop: 10,
    },
    error: {
        color: "red"
    }
});
