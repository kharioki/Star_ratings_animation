import React, {useState} from 'react';
import {View, TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

FontAwesome.loadFont();

const numStars = 5;

const Rating = props => {
  const [rating, setRating] = useState(props.rating ?? 1);
  const [numStars, setNumStars] = useState(props.numStars ?? 5);
  const [starColor, setStarColor] = useState(props.starColor ?? '#6f3bd8');
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
          <Star filled={i <= rating ? true : false} color={starColor} />
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }
  return (
    <View>
      <View style={{flexDirection: 'row'}}>{stars}</View>
    </View>
  );
};

const Star = ({filled, color}) => {
  return (
    <FontAwesome
      name={filled === true ? 'star' : 'star-o'}
      color={color}
      size={32}
      style={{marginHorizontal: 6}}
    />
  );
};

export default Rating;
