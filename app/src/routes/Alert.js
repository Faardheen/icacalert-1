import React from 'react';
import { View, StyleSheet, Text, Picker, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import decode from 'jwt-decode';
import { Link, Redirect } from 'react-router-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
const { width } = Dimensions.get('window');

let data = [{
  value: 'Bribery by public official', id: 1
}, {
  value: 'Taking gratification to screen offender from punishment', id: 2
}, {
  value: 'Public official using his office for gratification', id: 3
}, {
  value: 'Bribery of or by a public official to influence the decision of a public body', id: 4
}, {
  value: 'Traffic d’influence', id: 5
}, {
  value: 'Public official taking gratification', id: 6
}, {
  value: 'Bribery for procuring contracts', id: 7
}, {
  value: 'Conflict of interests', id: 8
}, {
  value: 'Treating of public official', id: 9
}, {
  value: 'Receiving gift for a corrupt purpose', id: 10
}, {
  value: 'Corruption of agent', id: 11
}, {
  value: 'Corruption to provoke a serious offence', id: 12
}];

class Alert extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('app-token')
    navigator.geolocation.getCurrentPosition(p => {
      this.setState({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        currentUser: decode(token).user
      })
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      type: 'Bribery by public official',
      description: '',
      currentUser: {},
      lat: 0,
      lng: 0,
      err: '',
      redirect: false,
      alertData: {}
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeText = (text, type) => this.setState({ [type]: text });

  async onSubmit() {
    const { type, description, lat, lng, currentUser } = this.state;
    const response = await this.props.mutate({
      variables: { type, description, lat, long: lng, userId: currentUser.id },
    }).catch(err => console.log(err))
    this.setState({ userData: this.state.type })

    const { ok, errors } = response.data.createAlert;
    console.log(errors);
    if (ok) {
      this.setState({
        redirect: true
      })
    } else {
      this.setState({
        err: errors.message,
      });
    }
  }

  render() {
    const { currentUser, err, redirect } = this.state;
    const errList = [];

    if (err) {
      errList.push(err);
    }

    if (redirect) {
      return <Redirect to='/consent' />
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.component}>
          <View style={styles.user}>
            <View style={styles.List}>
              <Icon
                style={styles.icon}
                name="envelope"
                size={15}
                color="black"
              />
              <Text style={styles.listText}>{currentUser.email ? currentUser.email : 'user@user.com'}</Text>
            </View>
            <View style={styles.List}>
              <Icon
                style={styles.icon}
                name="address-card"
                size={15}
                color="black"
              />
              <Text style={styles.listText}>{currentUser.id ? currentUser.id : '5d8d545e21c5e454ff763'}</Text>
            </View>
          </View>
          <View style={styles.form}>
            <Text style={styles.header}>Type of Corruption</Text>
            <Picker
              selectedValue={this.state.type}
              style={{ height: 50, width: width - 30 }}
              onValueChange={(itemValue) =>
                this.setState({ type: itemValue })
              }>
              {data.map(d => (
                <Picker.Item key={d.id} label={d.value} value={d.value} />
              ))}
            </Picker>

            <Text style={styles.header}>Brief Description</Text>
            <Input placeholder='Give us some details' onChangeText={text => this.onChangeText(text, 'description')} />
          </View>
          {errList.length ? (
            <Text style={styles.errorMessage}>{errList[0]}</Text>
          ) : null}
        </View>
        <View style={styles.container}>
          <Link to='/observe' ><Text style={styles.text} accessibilityRole='link'>Back</Text></Link>
          <Link to='/consent' data={this.state.userData} ><Text onPress={this.onSubmit} style={styles.text} accessibilityRole='link'>Continue</Text></Link>
        </View>
      </View>
    );
  }
}

const createAlertMutation = gql`
	mutation($type: String!, $description: String, $lat: Float, $long: Float, $userId: String) {
		createAlert(type: $type, description: $description, lat: $lat, long: $long, userId: $userId) {
			ok
			alert {
				type
				description
				lat
				long
			}
			errors {
				path
				message
			}	
		}
	}
`;

const styles = StyleSheet.create({
  // ======= navbar START ==========
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0365D6',
  },
  text: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 20,
    paddingHorizontal: 30,
    textDecorationLine: 'underline'
  },
  // ========== navbar END =========
  component: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20
  },
  List: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10
  },
  listText: {
    fontSize: 18,
    paddingLeft: 10
  },
  user: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  header: {
    fontWeight: '400',
    paddingVertical: 20,
    fontSize: 20
  },
  icon: {
    fontSize: 20
  },
  form: {
    flex: 6
  },
})

export default graphql(createAlertMutation)(Alert);