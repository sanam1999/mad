import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { PATHS } from "@/constants/pathConstants";
import Dialog from 'react-native-dialog';
import { useUserSessions } from "@/hooks/useUserSessions";

export default function Post({ postsData }) {
  const { user, isLoading } = useUserSessions();
  const [visible, setVisible] = useState(false);
  const [donate, setDonate] = useState({ doname: "", donameamount: 0 });

  const donatenow = (userid) => {
    setDonate({ ...donate, doname: userid });
    setVisible(true);
  };

  const handleSubmit = () => {
    console.log(donate);
    setVisible(false);
    setDonate({ ...donate, doname: "", donameamount: 0 });
  };

  if (isLoading) {
    return <Text style={styles.isLoading}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {postsData?.map((post, index) => (
        <View key={index} style={styles.postContainer}>
          {/* Post Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: post.profile.imageUrl }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.username}>{post.profile.username}</Text>
                <Text style={styles.date}>2020-02-90</Text>
              </View>
            </View>
            {user._id === post.profile._id ? (
              <View style={styles.donationInfo}>
                <Text style={styles.totalDonation}>Total donated: $200</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.donateButton}
                onPress={() => donatenow(post.profile._id)}
              >
                <Text style={styles.donateButtonText}>Donate now</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Post Content */}
          <Text style={styles.postText}>{post.postText}</Text>
          <Image
            source={{ uri: post.postImageUrl }}
            style={styles.postImage}
          />

         
        </View>
      ))}

      {/* Donation Dialog */}
      <Dialog.Container visible={visible}>
        <Dialog.Title style={styles.dialogTitle}>Enter Donation Amount</Dialog.Title>
        <Dialog.Input
          placeholder="Enter amount"
          keyboardType="numeric"
          value={donate.donameamount.toString()}
          onChangeText={(text) => {
            const parsedValue = parseInt(text, 10);
            setDonate({
              ...donate,
              donameamount: isNaN(parsedValue) ? 0 : parsedValue,
            });
          }}
          style={styles.dialogInput}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setVisible(false)}
          style={styles.dialogCancelButton}
        />
        <Dialog.Button
          label="Donate"
          onPress={handleSubmit}
          style={styles.dialogDonateButton}
        />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  donationInfo: {
    backgroundColor: PATHS.secColor,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  totalDonation: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  donateButton: {
    backgroundColor: PATHS.mainColor,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  donateButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  postText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  dialogInput: {
    fontSize: 16,
    color: '#333',
  },
  dialogCancelButton: {
    color: '#666',
  },
  dialogDonateButton: {
    color: PATHS.secColor,
    fontWeight: '600',
  },
  isLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#666',
  },
});