import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,  ScrollView } from 'react-native';
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
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user2",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user3",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id: "67988e9738ae8ff4cd31b296",
          username: "@user4",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user5",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user6",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user7",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user8",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Mauris eleifend est et turpis. Nullam lectus erat, cursus a eleifend at, efficitur eu erat.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user9",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Sed vel enim nec nisl placerat faucibus. Sed ac auctor arcu. Ut vestibulum turpis eu libero faucibus euismod.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",       },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user10",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Nam aliquam magna ligula, ac suscipit arcu dapibus non. Vivamus lacinia leo sit amet lorem auctor, vel tristique nisl elementum.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user11",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Fusce interdum, justo eu pellentesque vehicula, felis leo sollicitudin libero, non dapibus nisi nisi vitae erat.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user12",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Aenean interdum, lectus eget tincidunt lacinia, sapien dolor egestas felis, eu congue ipsum eros eu augue.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user13",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Proin non metus fermentum, vehicula felis nec, aliquet orci. Donec vestibulum lacus at justo dictum, sit amet dictum sem tincidunt.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user14",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Mauris a justo nec erat tristique sollicitudin. Vivamus suscipit sapien sit amet arcu gravida, id interdum arcu fermentum.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user15",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Quisque in felis risus. Integer et purus nisl. Etiam sit amet lorem in leo condimentum euismod.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user16",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Cras ut venenatis dui. Integer id magna sollicitudin, vestibulum nunc ut, sollicitudin odio.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user17",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Etiam malesuada nunc id velit cursus, et facilisis sapien sollicitudin. Integer ac dui orci.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user18",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Quisque sit amet massa a purus convallis maximus ac eget risus. Fusce interdum suscipit orci.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user19",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Mauris vel turpis vel odio tincidunt aliquam. Suspendisse vehicula risus nec auctor posuere.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
  {
      profile: {
          _id:"kdfljg9eiojvflksdjvkfdjsf984u",
          username: "@user20",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      },
      postText: "Curabitur imperdiet sollicitudin eros, ac hendrerit odio convallis sit amet. Cras a ante eget lacus suscipit pellentesque.",
      postImageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZwuwkzjJimOw2LVIsf6m3SSjv0gh0-smlwQ&s",
      }
];
export default function Home() {
     let navigate = useNavigate();
     const { user, isLoading } = useUserSessions();
   useEffect(()=>{
       if (!isLoading && !user) {
           return  navigate(PATHS.LOGIN);
          }
   },[isLoading,user,navigate])
     // If still loading, return a placeholder
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

