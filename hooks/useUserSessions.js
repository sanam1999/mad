import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserSessions = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem("userSession");
        if (userSession) {
          setUser(JSON.parse(userSession));
        }
      } catch (error) {
        console.error("Error retrieving user session: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const editUser = async (userdata) => {
    try {
      if (userdata) {
        await AsyncStorage.setItem("userSession", JSON.stringify(userdata));
        setUser(userdata); // Use userdata directly
      }
    } catch (error) {
      console.error("Error updating user session: ", error);
    }
  };

  return { user, isLoading, editUser };
};
