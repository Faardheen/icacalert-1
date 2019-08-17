import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NavBarNoForward from '../components/NavBarNoForwad';

class Celebration extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.component}>
          <Image resizeMode="contain" style={styles.celebration} source={require('../../assets/celebration.png')} />
        </View>
        <NavBarNoForward backward='observe' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  celebration: {
    height: 500
  },
})

export default Celebration;