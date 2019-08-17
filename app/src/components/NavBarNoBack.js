import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

class NavBarNoBack extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Link to={`/${this.props.forward}`} ><Text style={styles.text} accessibilityRole='link'>Continue</Text></Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0365D6',
  },
  text: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 30,
    textDecorationLine: 'underline'
  }
})

export default NavBarNoBack;