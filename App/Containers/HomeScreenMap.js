import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

class HomeScreen extends Component {
  componentDidMount () {
    console.log('MOUNTED HOME SCREEN')
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.agreements.searchText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => dispatch(action)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
