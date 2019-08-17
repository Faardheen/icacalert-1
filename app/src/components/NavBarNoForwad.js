import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

class NavBarNoForward extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Link to={`/${this.props.backward}`} ><Text style={styles.text} accessibilityRole='link'>Back</Text></Link>
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

export default NavBarNoForward;