import React from 'react';
import { View, StyleSheet, Image, Text, AsyncStorage } from 'react-native';
import RegisterView from '../components/RegisterView';
import { Redirect } from 'react-router-native';

class Register extends React.Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('app-token');
      if (token != null) {
        this.setState({ loggedIn: true })
      }
    } catch (err) {
      console.log(err)
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  render() {
    const { loggedIn } = this.state
    if (loggedIn) {
      return <Redirect to='/observe' />
    }
    return (
      <View style={styles.container}>
        <View style={styles.registerContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../assets/logo-lg.jpg')} />
        </View>
        <View>
          <RegisterView />
        </View>
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>Your email address and / or phone number will not be disclosed to the public. However, the ICAC may contact you during the course of enquiry.</Text>
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
  registerContainer: {
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
  },
  warningContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 2,
    padding: 30,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
  },
})

export default Register;