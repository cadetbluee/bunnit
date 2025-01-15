import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator'; // 네비게이터 임포트
import {AppRegistry} from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
