import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Link, Redirect } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      password: '',
      err: '',
      loggedIn: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onChangeText = (text, type) => this.setState({ [type]: text });

  async onButtonPress() {
    const { email, password } = this.state;
    const response = await this.props.mutate({
      variables: { email, password },
    }).catch(err => console.log(err))

    const { ok, errors, token } = response.data.login;
    if (ok) {
      await AsyncStorage.setItem('app-token', token)
      this.setState({ loggedIn: true })
    } else {
      this.setState({
        err: errors.message,
      });
    }
  }

  render() {
    const { err, loggedIn } = this.state;
    const errList = [];

    if (loggedIn) {
      return <Redirect to='/login-success' />
    }

    if (err) {
      errList.push(err);
    }
    return (
      <View style={styles.container}>
        {errList.length ? (
          <Text style={styles.errorMessage}>{errList[0]}</Text>
        ) : null}
        <TextInput style={styles.input}
          autoCapitalize="none"
          keyboardType='email-address'
          onChangeText={text => this.onChangeText(text, 'email')}
          placeholder='Email Address'
        />
        <TextInput style={styles.input}
          placeholder='Password'
          returnKeyType="go"
          onChangeText={text => this.onChangeText(text, 'password')}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Link to='/'>
          <Text style={styles.registerText}>or Register Here</Text>
        </Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 60,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'black'
  },
  buttonContainer: {
    backgroundColor: '#0365D6',
    paddingVertical: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 10
  },
  registerText: {
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  }
})

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;


export default graphql(loginMutation)(LoginView);