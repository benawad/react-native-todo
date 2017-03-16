import React from 'react';
import { Text } from 'react-native';

export default class Loading extends React.Component {
  componentWillMount() {
    this.props.checkIfSignedIn();
  }

  render() {
    return (
      <Text>Loading...</Text>
    );
  }
}
