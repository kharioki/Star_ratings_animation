import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

FontAwesome.loadFont();

const numStars = 5;

const App = () => {
  const [rating, setRating] = useState();

  let stars = [];

  for (let i = 1; i <= numStars; i++) {
    stars.push(
      <TouchableWithoutFeedback key={i}>
        <Animated.View>
          <Star />
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>{stars}</View>
    </View>
  );
};

const Star = () => {
  return (
    <FontAwesome
      name="star"
      color="purple"
      size={32}
      style={{marginHorizontal: 6}}
    />
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
