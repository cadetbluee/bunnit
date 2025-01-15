import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import LibraryScreen from '../screens/Library/LibraryScreen';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import AppBar from '../components/AppBar/AppBar';
import {useNavigationState} from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Library"
          component={LibraryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <AppBar />
    </>
  );
};

export default AppNavigator;
