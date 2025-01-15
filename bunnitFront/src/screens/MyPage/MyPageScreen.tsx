import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
});

export default MyPageScreen;
