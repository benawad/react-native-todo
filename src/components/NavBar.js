import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Icon,
} from 'react-native-elements';

export default (props) => (
  <View style={styles.container}>
    <Icon 
      style={styles.icon} 
      name='menu'
      size={30}
      onPress={() => props.menuButtonClicked()} />
  </View>
);

const {height, width} = Dimensions.get('window');
const lbPadding = 5;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#75A8F5',
    paddingTop: 20,
    paddingBottom: lbPadding,
    paddingLeft: lbPadding,
    width,
    flexDirection: 'row',
  },
  icon: {
  },
});
