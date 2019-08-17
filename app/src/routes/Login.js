import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LoginView from '../components/LoginView';

class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../assets/logo-lg.jpg')} />
        </View>
        <View>
          <LoginView />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 0.5,
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    left: 50,
    top: 90,
    width: 200,
    height: 70
  }
})

export default Login;