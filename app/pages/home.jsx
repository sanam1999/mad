import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,  ScrollView } from 'react-native';
import { useUserSessions } from '../../hooks/useUserSessions';
import { useNavigate } from 'react-router-native';
import { PATHS } from '@/constants/pathConstants';
import Story from "../component/stoty";
import Post from "../component/Post";
import {getReq} from '../../hooks/useQuery'

export default function Home() {
     let navigate = useNavigate();
     const [post , setpost]=useState([]);
     const { user, isLoading } = useUserSessions();
   useEffect(()=>{
       if (!isLoading && !user) {
           return  navigate(PATHS.LOGIN);
          }
   },[isLoading,user,navigate])
     // If still loading, return a placeholder
  
   
     
           const fetchData = async () => {
               try {
                   const response = await getReq('/user/getpost?type=all');
                   setpost(response.data.post)
               } catch (error) {
                   console.error("Error fetching account data:", error);
               }
           };
       
           useEffect(() => {
               fetchData();
           }, []);
           if (isLoading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }
   
  return (
    <ScrollView style={styles.container}>
     <Story/>
      <Post postsData={post}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },

});

