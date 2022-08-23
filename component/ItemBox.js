import React, { useRef, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { getColorByLetter } from '../colors/index';

const SCREEN_WIDTH = Dimensions.get('window').width;



const ItemBox = (props) => {
  const color = getColorByLetter(props.data.firstname[0]);
  const leftSwipe = (progress, dragX, ref) => {
    const scale = dragX.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (

      <View style={styles.deleteBox}>
        <Animated.Text style={
          styles.anima,
          { transform: [{ scale: scale }] }}
          onPress={props.handleEdit}
        >
          Edit
          </Animated.Text>
        <Animated.Text
          style={styles.anima2, { transform: [{ scale: scale }] }}
          onPress={props.handleDelete}
        >
          Delete
          </Animated.Text>
      </View>
    );
  };

  
  /* const closeRow= (index)  => {
   
  } */
  return (
    <Swipeable renderLeftActions={leftSwipe}
      /*  renderRightActions={leftSwipe}  */
      onSwipeableWillOpen={props.handlechangetouch}
      onSwipeableOpen={props.closediv}
    >
      <View style={styles.itemWrapperStyle}>
        <View style={styles.itemImageStyle}>
          <View style={{ ...styles.icon, backgroundColor: color }}>
            <Text style={styles.iconContent}>
              {props.data.firstname[0]} </Text>
          </View>
        </View>
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}> {`${props.data.firstname} ${props.data.lastname} `}</Text>
          <Text style={styles.txtphoneStyle}>{props.data.phone}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
    shadowOpacity: 0.88,
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'silver'

  },
  iconContent: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: 'white',
    marginHorizontal: 5
  },
  icon: {
    borderRadius: 25,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    padding: 1,
    backgroundColor: 'green'
  },
  anima: {
    backgroundColor: '#ffffff'
  },
  anima2: {
    backgroundColor: '#ffffff'
  },
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#ffffff',
    padding: 20,
    backgroundColor: '#E7E7E7'
  },
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtphoneStyle: {
    color: "#777",
    marginLeft: 5
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});