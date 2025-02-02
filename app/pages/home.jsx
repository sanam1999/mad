import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { useUserSessions } from '../../hooks/useUserSessions';
import { useNavigate } from 'react-router-native';
import { PATHS } from '@/constants/pathConstants';
import Story from "../component/stoty";
import Post from "../component/Post";
const postsData = [
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296", 
          username: "@user1",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user2",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user3",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user4",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user5",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user6",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user7",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user8",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Mauris eleifend est et turpis. Nullam lectus erat, cursus a eleifend at, efficitur eu erat.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user9",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Sed vel enim nec nisl placerat faucibus. Sed ac auctor arcu. Ut vestibulum turpis eu libero faucibus euismod.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user10",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Nam aliquam magna ligula, ac suscipit arcu dapibus non. Vivamus lacinia leo sit amet lorem auctor, vel tristique nisl elementum.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user11",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Fusce interdum, justo eu pellentesque vehicula, felis leo sollicitudin libero, non dapibus nisi nisi vitae erat.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user12",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Aenean interdum, lectus eget tincidunt lacinia, sapien dolor egestas felis, eu congue ipsum eros eu augue.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user13",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Proin non metus fermentum, vehicula felis nec, aliquet orci. Donec vestibulum lacus at justo dictum, sit amet dictum sem tincidunt.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user14",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Mauris a justo nec erat tristique sollicitudin. Vivamus suscipit sapien sit amet arcu gravida, id interdum arcu fermentum.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user15",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Quisque in felis risus. Integer et purus nisl. Etiam sit amet lorem in leo condimentum euismod.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user16",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Cras ut venenatis dui. Integer id magna sollicitudin, vestibulum nunc ut, sollicitudin odio.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user17",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Etiam malesuada nunc id velit cursus, et facilisis sapien sollicitudin. Integer ac dui orci.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user18",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Quisque sit amet massa a purus convallis maximus ac eget risus. Fusce interdum suscipit orci.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user19",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Mauris vel turpis vel odio tincidunt aliquam. Suspendisse vehicula risus nec auctor posuere.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user20",
          imageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      postText: "Curabitur imperdiet sollicitudin eros, ac hendrerit odio convallis sit amet. Cras a ante eget lacus suscipit pellentesque.",
      postImageUrl: "https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      }
];
export default function Home() {
  const navigate = useNavigate();
  const { user, isLoading } = useUserSessions();


  // Redirect to login if not authenticated
  if (!isLoading && !user) {
   return  navigate(PATHS.LOGIN);
  }

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }



  return (
    <ScrollView style={styles.container}>
     <Story/>
      <Post postsData={postsData}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },

});

