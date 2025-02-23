import { StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from "react-native";
import { PATHS } from "@/constants/pathConstants";
import { Link } from "react-router-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useUserSessions } from "../../hooks/useUserSessions";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {getReq} from '../../hooks/useQuery'
export default function Setiins() {
    let navigate = useNavigate();
    const { user,isLoading, editUser } = useUserSessions();

    useEffect(() => {
      
        if (!isLoading && !user) {
            navigate(PATHS.LOGIN);
        }
    }, [isLoading, user, navigate]);

    const [isEnabled, setIsEnabled] = useState(false);

    let logoutbtn = async () => {
        try {
          
          
                      try {
                            const response = await getReq('/user/logout');
                            if( response.data.success ){
                            await AsyncStorage.removeItem("userSession")
                            navigate("/")  
                        }else{
                            console.log(response)
                        }
                            
                         
                      } catch (error) {
                             alert(error)
                        
                      }
                  
              
             

        } catch (e) {
            console.log(e);
        }
    };
    if(!isLoading){


}
    return ( isLoading ? (<View> 
        <Text>Loading...</Text>
        </View>):
       
            <View style={styles.container}>
                <Link to={PATHS.PROFILE} underlayColor="#ddd">
                <View style={styles.profileInfo}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: user.profileImage ? `${PATHS.BASEURL}${user.profileImage}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPq_GdHrAfGdnr3cLDeagSc7X_twjR_6Cz9Q&s"
                        }} 
                    />
                    <Text style={styles.email}>{user?.username}</Text>
                </View>
                </Link>

                <TouchableOpacity>
                    <Link to={PATHS.UPDATEPROFILE} underlayColor="#ddd">
                        <View style={styles.linkContent}>
                            <Text style={styles.name}>{user?.name}</Text>
                            <FontAwesome name="edit" style={styles.edit} />
                        </View>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Link to={PATHS.CHANGEPASSWORD} underlayColor="#ddd">
                        <View style={styles.linkContent}>
                            <Text style={styles.name}>Change password</Text>
                            <FontAwesome name="edit" style={styles.edit} />
                        </View>
                    </Link>
                </TouchableOpacity>

                <View style={styles.linkContent}>
                <Text>Enable Notifications</Text>
                    <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)}>
                        
                        <View style={styles.radio}>
                            <View
                                style={isEnabled ? styles.radioSelected : styles.radioUnselected}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={logoutbtn} style={styles.log}>
                    <View style={styles.logout}>
                        <Text style={styles.logoutText}>Logout</Text>
                      
                    </View>
                </TouchableOpacity>
            </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    profileInfo: {
        alignItems: "center",
        marginBottom: 5,
    },
    logo: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "normal",
    },
    email: {
        fontSize: 20,
        fontWeight: "300",
    },
    linkContent: {
        padding: 8,
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    edit: {
        fontSize: 20,
        color: PATHS.mainColor,
        marginLeft: -10,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: PATHS.mainColor,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    radioSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: PATHS.mainColor,
    },
    radioUnselected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "transparent",
    },
    logout: {
        padding: 8,
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    logouti: {
        color: "red",
    },
    logoutText: {
        color: "red",
        fontSize: 20,
        fontWeight: "500",
    },
    log:{
        marginTop:260
    }
});
