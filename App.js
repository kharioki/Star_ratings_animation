import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

FontAwesome.loadFont();

const numStars = 5;

const App = () => {
  const [rating, setRating] = useState(1);
  const [animation, setAnimation] = useState(new Animated.Value(1));

  const rate = star => {
    setRating(star);
  };

  const animate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(1);
    });
  };

  let stars = [];

  const animateScale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.6, 1],
  });

  const animateWobble = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ['0deg', '-3deg', '3deg', '0deg'],
  });

  const animationStyle = {
    transform: [{scale: animateScale}, {rotate: animateWobble}],
    opacity: animateOpacity,
  };

  for (let i = 1; i <= numStars; i++) {
    stars.push(
      <TouchableWithoutFeedback
        key={i}
        onPress={() => {
          rate(i), animate();
        }}>
        <Animated.View style={i <= rating ? animationStyle : ''}>
          <Star filled={i <= rating ? true : false} />
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

const Star = ({filled}) => {
  return (
    <FontAwesome
      name={filled === true ? 'star' : 'star-o'}
      color="orangered"
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
