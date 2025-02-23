import { PATHS } from "@/constants/pathConstants";
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  useEffect } from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function About() {
  const animatedValue = React.useRef(new Animated.Value(0)).current;


  const stats = [
    { number: 50, label: 'K+ Meals Served' },
    { number: 120, label: 'Communities' }
  ];

  const teamMembers = [
    { 
      name: 'Senvith',
      role: 'Lead Developer',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHDRlp-KGr_M94k_oor4Odjn2UzbAS7n1YoA&s'
    },
    { 
      name: 'Nethmi',
      role: 'Project Manager',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXQoo21z972uS-JHDFnD7PDQC7gJocS8U32FugISogE6JnvceTKmlYE9FMdalmbbwkbo&usqp=CAU'
    }
  ];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      padding: 10
    },
    heroImage: {
      width: '100%',
      height: 200,
      borderRadius: 20,
      marginVertical: 2
    },
    glassCard: {
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 15,
      padding: 20,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3
    },
    missionSection: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20
    },
    missionImage: {
      width: 100,
      height: 100,
      borderRadius: 15,
      marginRight: 15
    },
    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginVertical: 10,
      
    },
    iconItem: {
      width: '48%',
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
    
      marginVertical: 5
    },
    teamContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 20
    },
    teamMember: {
      alignItems: 'center',
      width: '48%'
    },
    memberPhoto: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: PATHS.mainColor
    },
    temp:{
      height:90
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/027/012/938/non_2x/hungry-starving-poor-little-child-looking-at-the-camera-photo.jpg' }}
        style={styles.heroImage}
      />
      <View style={styles.missionSection}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG9RR8t16QX9Ag9a_AydFoU8sfKHpfdDuZQg&s' }}
          style={styles.missionImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: PATHS.mainColor, fontSize: 18, fontWeight: 'bold' }}>
            Our Mission
          </Text>
          <Text style={{ color: '#333' }}>
            Eradicate global hunger through sustainable solutions and community empowerment.
          </Text>
        </View>
      </View>

      {/* Goals Section */}
      <View style={styles.glassCard}>
        <Text style={{ color: PATHS.mainColor, fontSize: 18, fontWeight: 'bold' }}>
          <Icon name="tasks" size={16} color={PATHS.mainColor} /> Our Goals
        </Text>
        <View style={styles.iconGrid}>
          {['leaf', 'heart', 'graduation-cap', 'globe'].map((icon, index) => (
            <View key={index} style={styles.iconItem}>
              <Icon name={icon} size={24} color={PATHS.mainColor} />
              <Text style={{ color: '#333', marginTop: 5 }}>
                {['Sustainable Farming', 'Food Aid', 'Education', 'Global Reach'][index]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Impact Section */}
      <View style={styles.glassCard}>
        <Text style={{ color: PATHS.mainColor, fontSize: 18, fontWeight: 'bold' }}>
        <FontAwesome5 name="chart-line" size={16} color={PATHS.mainColor} />  Our Impact
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
          {stats.map((stat, index) => (
            <Animated.View key={index} style={{ opacity: animatedValue }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: PATHS.mainColor }}>
                {stat.number}+
              </Text>
              <Text style={{ color: '#333' }}>{stat.label} </Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.glassCard}>
        <Text style={{ color: PATHS.mainColor, fontSize: 18, fontWeight: 'bold' }}>
          Our Team
        </Text>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <Image source={{uri: member.uri}} style={styles.memberPhoto} />
              <Text style={{ fontWeight: 'bold', marginTop: 5, color: '#333' }}>
                {member.name}
              </Text>
              <Text style={{ color: '#666', fontSize: 12 }}>
                {member.role}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.temp}>

      </View>
    </ScrollView>
  );
};