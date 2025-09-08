import React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons'; // Заменено на смайлики
import { RootStackParamList, MainTabParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';
import JournalScreen from '../screens/JournalScreen';
import StatsScreen from '../screens/StatsScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import EntryDetailsScreen from '../screens/EntryDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let emoji: string;

          if (route.name === 'Home') {
            emoji = focused ? require('../assets/img/bottom/11.png') : require('../assets/img/bottom/1.png');
          } else if (route.name === 'Journal') {
            emoji = focused ? require('../assets/img/bottom/22.png') : require('../assets/img/bottom/2.png');
          } else if (route.name === 'Stats') {
            emoji = focused ? require('../assets/img/bottom/33.png') : require('../assets/img/bottom/3.png');
          } else {
            emoji = '🏡';
          }

          return (
            <Image source={emoji} style={{width: 20, height: 20}} resizeMode='cover'/>
          );
        },
        tabBarActiveTintColor: '#00FF88',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333333',
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#1A1A1A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: '' }}
      />
      <Tab.Screen 
        name="Journal" 
        component={JournalScreen}
        options={{ title: '' }}
      />
      <Tab.Screen 
        name="Stats" 
        component={StatsScreen}
        options={{ title: '' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1A1A1A',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Information" 
          component={InformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Journal" 
          component={JournalScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddEntry" 
          component={AddEntryScreen}
          options={{ title: 'Add entry' }}
        />
        <Stack.Screen 
          name="EntryDetails" 
          component={EntryDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
