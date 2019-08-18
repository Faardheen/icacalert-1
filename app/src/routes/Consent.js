import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { CheckBox, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import decode from 'jwt-decode'
import NavBar from '../components/NavBar';

class Consent extends React.Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('app-token')
    console.log(decode(token).user)
    this.setState({
      currentUser: decode(token).user
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      checkedOne: false,
      checkedTwo: false,
      currentUser: {},
    }
  }
  render() {
    const { currentUser, checkedOne, checkedTwo } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.component}>
          <Text style={styles.consentHeader}>CONSENT</Text>
          <Text style={styles.consentText}>*click on both checkboxes to proceed</Text>
          <View style={styles.consent}>
            <Text style={styles.consentWarning}>1. Incident being reported is authentic</Text>
            <CheckBox
              checkedIcon={<Image source={require('../../assets/check.png')} />}
              uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
              checked={this.state.checkedOne}
              onPress={() => this.setState({ checkedOne: !this.state.checkedOne })}
            />
          </View>
          <View style={styles.consent}>
            <Text style={styles.consentWarning}>2. I have been witness of this incident</Text>
            <CheckBox
              checkedIcon={<Image source={require('../../assets/check.png')} />}
              uncheckedIcon={<Image source={require('../../assets/uncheck.png')} />}
              checked={this.state.checkedTwo}
              onPress={() => this.setState({ checkedTwo: !this.state.checkedTwo })}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.list}>
              <Icon
                style={styles.iconUp}
                name="envelope"
                size={20}
                color="black"
              />
              <Text style={styles.infoText}>{currentUser.email}</Text>
            </View>
            <View style={styles.list}>
              <Icon
                style={styles.iconUp}
                name="id-card"
                size={20}
                color="black"
              />
              <Text style={styles.infoText}>{currentUser.id}</Text>
            </View>
          </View>
          <Text style={styles.consentTextWarning}>*fake entries and spamming may be liable to legal procedures</Text>
        </View>
        <NavBar forward={checkedOne && checkedTwo ? 'celebration' : 'consent'} backward='alert' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20
  },
  consentHeader: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  consentText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20
  },
  consentTextWarning: {
    color: 'red',
    fontSize: 16,
    marginTop: 50
  },
  consent: {
    flexDirection: 'row',
    marginVertical: 5
  },
  consentWarning: {
    fontSize: 16,
    paddingVertical: 15
  },
  list: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  infoText: {
    paddingHorizontal: 10,
    fontSize: 18
  }
})

export default Consent;