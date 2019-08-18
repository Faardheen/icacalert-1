import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';

class LoginSuccess extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.header}>YOU'RE ALL SET!</Text>
          <Text style={styles.welcomeText}>You have successfully created an account! You can not help us track down acts of corruption in your area</Text>
        </View>

        <View style={styles.loginSuccessContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../assets/guyphonex4.jpg')} />
        </View>

        <NavBar forward='observe' backward='signup' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100
  },
  head: {
    flex: 1,
    padding: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 38,
    fontWeight: '700'
  },
  welcomeText: {
    textAlign: "center",
    lineHeight: 20,
  },
  loginSuccessContainer: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    height: 300
  },
})

export default LoginSuccess;