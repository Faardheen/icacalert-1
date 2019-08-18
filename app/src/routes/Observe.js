import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './Map';
import NavBarNoBack from '../components/NavBarNoBack';
import SlidingInfoPane from '../components/SlidingInfoPane';

class Observe extends React.Component {
  render() {
    return (
      <View style={styles.component}>
        <Map style={styles.map} />
        <View>
          <SlidingInfoPane />
        </View>
        <NavBarNoBack forward='alert' />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
})

export default Observe;