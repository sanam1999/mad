import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';
import {getReq} from '../../hooks/useQuery'
import { PATHS } from '@/constants/pathConstants';
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stories , setstory]= useState([]);
     const fetchData = async () => {
          try {
              const response = await getReq('/user/getstory');
            
              setstory(response.data.story)
            
             
          } catch (error) {
              console.error("Error fetching account data:", error);
          }
      };
  
      useEffect(() => {
          fetchData();
      }, []);



 

  const renderStory = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedStory(item);
      setCurrentIndex(0); // Start from the first story image
    }}>
      <View style={styles.storyContainer}>
        <Image source={{ uri: `${PATHS.BASEURL}${item.story[0].imgUri}` }} style={styles.storyImage} />
        <Text style={styles.username}>{item.user.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNextStory = () => {
    if (currentIndex < selectedStory.story.length - 1) {
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
              <Text style={styles.navButtonText}> <FontAwesome name="arrow-left"  style={styles.icons} /></Text>
            </TouchableOpacity>

            <Image source={{ uri:  `${PATHS.BASEURL}${selectedStory.story[currentIndex].imgUri}`  }} style={styles.fullScreenImage} />
            <Text style={styles.storycaption}>{selectedStory.story[currentIndex].caption}</Text>

            <TouchableOpacity style={styles.navButtonRight} onPress={handleNextStory}>
              <Text style={styles.navButtonText}><FontAwesome name="arrow-right"  style={styles.icons} /></Text>
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
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  storycaption: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
  },
  navButtonLeft: {
    position: 'absolute',
    left: 1,
    top: '50%',
    transform: [{ translateY: -20 }],  
    zIndex:1000
  },
  navButtonRight: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex:1000

  },
  navButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  icons:{
    fontSize:30,
    color:PATHS.secColor
  }
});

