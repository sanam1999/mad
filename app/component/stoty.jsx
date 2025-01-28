import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { useUserSessions } from '../../hooks/useUserSessions';
import { useNavigate } from 'react-router-native';
import { PATHS } from '@/constants/pathConstants';

export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);



  const stories = [
    {
      id: '1',
      username: 'Saroj Shrestha',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'First Story', timestamp: '2025-01-21T10:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Second Story', timestamp: '2025-01-21T11:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Third Story', timestamp: '2025-01-21T12:00:00Z' },
      ],
    },
    {
      id: '2',
      username: 'Sanam',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Morning Vibes', timestamp: '2025-01-21T08:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Afternoon Break', timestamp: '2025-01-21T14:00:00Z' },
      ],
    },
    {
      id: '3',
      username: 'Saroj Shrestha',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'First Story', timestamp: '2025-01-21T10:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Second Story', timestamp: '2025-01-21T11:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Third Story', timestamp: '2025-01-21T12:00:00Z' },
      ],
    },
    {
      id: '4',
      username: 'Sanam',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Morning Vibes', timestamp: '2025-01-21T08:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Afternoon Break', timestamp: '2025-01-21T14:00:00Z' },
      ],
    },
    {
      id: '5',
      username: 'Saroj Shrestha',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'First Story', timestamp: '2025-01-21T10:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Second Story', timestamp: '2025-01-21T11:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Third Story', timestamp: '2025-01-21T12:00:00Z' },
      ],
    },
    {
      id: '6',
      username: 'Sanam',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Morning Vibes', timestamp: '2025-01-21T08:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Afternoon Break', timestamp: '2025-01-21T14:00:00Z' },
      ],
    },
    {
      id: '7',
      username: 'Saroj Shrestha',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'First Story', timestamp: '2025-01-21T10:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Second Story', timestamp: '2025-01-21T11:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Third Story', timestamp: '2025-01-21T12:00:00Z' },
      ],
    },
    {
      id: '8',
      username: 'Sanam',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Morning Vibes', timestamp: '2025-01-21T08:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Afternoon Break', timestamp: '2025-01-21T14:00:00Z' },
      ],
    },
    {
      id: '9',
      username: 'Saroj Shrestha',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'First Story', timestamp: '2025-01-21T10:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Second Story', timestamp: '2025-01-21T11:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Third Story', timestamp: '2025-01-21T12:00:00Z' },
      ],
    },
    {
      id: '10',
      username: 'Sanam',
      storyImages: [
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Morning Vibes', timestamp: '2025-01-21T08:00:00Z' },
        { url: 'https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', caption: 'Afternoon Break', timestamp: '2025-01-21T14:00:00Z' },
      ],
    },
  ];

  const renderStory = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedStory(item);
      setCurrentIndex(0); // Start from the first story image
    }}>
      <View style={styles.storyContainer}>
        <Image source={{ uri: item.storyImages[0].url }} style={styles.storyImage} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNextStory = () => {
    if (currentIndex < selectedStory.storyImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setSelectedStory(null);
    }
  };

  const handlePreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setSelectedStory(null);
    }
  };

  return (
    <View >
      <FlatList
        horizontal
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={renderStory}
        showsHorizontalScrollIndicator={false}
      />

      {/* Full-Screen Modal */}
      {selectedStory && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedStory(null)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.navButtonLeft} onPress={handlePreviousStory}>
              <Text style={styles.navButtonText}>{'<'}</Text>
            </TouchableOpacity>

            <Image source={{ uri: selectedStory.storyImages[currentIndex].url }} style={styles.fullScreenImage} />
            <Text style={styles.storyCaption}>{selectedStory.storyImages[currentIndex].caption}</Text>

            <TouchableOpacity style={styles.navButtonRight} onPress={handleNextStory}>
              <Text style={styles.navButtonText}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 3,
  },
  storyImage: {
    width: 110,
    height: 200,
    borderColor: '#0000ff',
    borderRadius:5
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  storyCaption: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 10,
    borderRadius: 50,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

