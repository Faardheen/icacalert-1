import React from 'react';
import { View } from 'react-native';
import Alert from './Alert';

class AlertContent extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Alert />
      </View>
    )
  }
}

export default AlertContent;