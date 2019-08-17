import React from 'react';
import { StyleSheet, View, Text, Image, StatusBar, Dimensions } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get("window")

class SlidingInfoPane extends React.Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(p => {
      this.setState({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      })
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    }
  }

  render() {
    const { lat, lng } = this.state;
    return (
      <View styles={styles.infoDisplay}>
        <StatusBar hidden />
        <SlidingUpPanel draggableRange={{ top: 400, bottom: 60 }} ref={c => this._panel = c}>
          <View style={styles.panelContent}>
            <Icon
              style={styles.iconUp}
              name="minus"
              size={15}
              color="black"
            />
            <Text style={styles.cardHeader}>Details</Text>
            <View style={styles.list}>
              <View style={styles.imageContainer}>
                <Image resizeMode="contain" style={styles.icon} source={require('../../assets/location.png')} />
              </View>
              <View style={styles.information}>
                <Text style={styles.listHeader}>Coordinates</Text>
                <Text style={styles.listInfo}>{`${lat}, ${lng}`}</Text>
              </View>
            </View>

            <View style={styles.listNoBorder}>
              <View style={styles.imageContainer}>
                <Image resizeMode="contain" style={styles.icon} source={require('../../assets/warning.png')} />
              </View>
              <View style={styles.information}>
                <Text style={styles.listHeader}>Low</Text>
                <Text style={styles.listInfo}>Tendency</Text>
              </View>
            </View>
            <View style={styles.locationAccess}>
              <Icon
                name="location-arrow"
                size={15}
                color="black"
              />
              <Text style={styles.locationAccessText}>App has access to your location</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  information: {
    paddingHorizontal: 15
  },
  iconUp: {
    textAlign: 'center',
    paddingBottom: 30,
    paddingTop: 10,
    fontSize: 40,
    color: '#E0E0E0'
  },
  panelContent: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1.20,
    shadowRadius: 16.00,
    elevation: 24,
  },
  locationAccess: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F9FF',
    padding: 30,
    width: width,
  },
  locationAccessText: {
    textAlign: 'center',
    paddingHorizontal: 10
  },
  cardHeader: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '400',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 40,
    borderBottomColor: '#EFEFEF'
  },
  listNoBorder: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 35,
  },
  icon: {
    height: 50,
    width: 50,
  },
  listInfo: {
    color: '#C5C5C5'
  },
  listHeader: {
    fontWeight: '400',
    fontSize: 18,
  },
})

export default SlidingInfoPane;