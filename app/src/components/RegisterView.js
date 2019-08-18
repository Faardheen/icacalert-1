import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { Link } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class RegisterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      password: '',
      err: '',
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onChangeText = (text, type) => this.setState({ [type]: text });

  async onButtonPress() {
    const { email, password, phone } = this.state;
    const response = await this.props.mutate({
      variables: { email, password, phone },
    }).catch(err => console.log(err))

    const { ok, errors } = response.data.register;

    console.log(errors);
    if (ok) {
      console.log('Hooooray')
    } else {
      this.setState({
        err: errors.message,
      });
    }
  }

  render() {
    const { err } = this.state;
    const errList = [];

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
        <TextInput
          style={styles.input}
          placeholder='Phone Number (+230XXXXXXX)'
          onChangeText={text => this.onChangeText(text, 'phone')}
        />
        <TextInput style={styles.input}
          placeholder='Password'
          returnKeyType="go"
          onChangeText={text => this.onChangeText(text, 'password')}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Link to='/login'>
          <Text style={styles.loginText}>or Log In here</Text>
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
  loginText: {
    fontSize: 20,
    padding: 10,
    textAlign: "center"
  }
})

const registerMutation = gql`
	mutation($email: String!, $phone: String!, $password: String!) {
		register(email: $email, phone: $phone, password: $password) {
			ok
			errors {
				path
				message
			}
		}
	}
`;


export default graphql(registerMutation)(RegisterView);