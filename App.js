import React from 'react';
import {StyleSheet, View} from 'react-native';
import Rating from './components/Rating';

const App = () => {
  return (
    <View style={styles.container}>
      <Rating rating={4} numStars={5} starColor="#fd1d1d" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
