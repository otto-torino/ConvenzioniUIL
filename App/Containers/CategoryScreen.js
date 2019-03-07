import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate, goBack } from '../Services/NavigationService'
import { View, Text, ScrollView } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-simple-toast'
import { distance } from 'react-native-location-manager/Utils'
import LocationManager from 'react-native-location-manager'
import Banner from './Banner'
import _ from 'lodash'

// Styles
import styles from './Styles/CategoryScreenStyles'

// @TODO place all the permissions, dialogs, location settings and location logic
// inside a new shining component to centralize the matter, since it'll differ
// on ios. Maybe better to ask permission only for undetermined status, because
// ios only allows to ask for such permission once. In such case show a message to manually
// grant permission if status is denied or restricted
// Also, id permission is denied or restricted, do not open the dialog asking to
// enable location. Also if the user decides not to allow location, save it somewhere
// in the redux store in order to not continuing asking the same thing forever during
// the same working session
class CategoryScreen extends Component {
  componentDidMount () {
    console.log('MOUNTED CATEGORY SCREEN')
  }

  onPress (retailer) {
    return () => {
      navigate('RetailerScreen', {
        retailer: retailer
      })
    }
  }

  distance (point) {
    // return empty string if some geo coords are missing
    let { position } = this.props.location
    if (!position || !point.lat) return ''
    let d = distance(
      point.lat,
      point.lng,
      position.latitude,
      position.longitude
    )
    return _.round(d, 1)
  }

  locationOrderedRetailers (retailers) {
    let cnt = 100000 // to give a distance id to unlocalized points
    let key = this.props.location.position ? 'distance' : 'name'
    let sortedRetailers = []
    retailers.forEach(retailer => {
      let r = Object.assign({}, retailer)
      r.distance = this.distance(r)
      r.distanceText = r.distance ? r.distance + ' Km' : 'N.D.'
      if (key === 'distance') {
        r.sort = r.distance ? r.distance : cnt++
      } else {
        r.sort = r.company.name
      }
      sortedRetailers.push(r)
    })
    return _.sortBy(sortedRetailers, [
      function (o) {
        return o.sort
      }
    ])
  }

  render () {
    let category = this.props.navigation.state.params.category
    return (
      <View>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          rightElement='arrow-back'
          onRightElementPress={() => goBack()}
          centerElement={category.name}
        />
        <LocationManager
          highAccuracyTimeout={10000}
          deniedPermissionMessage={
            <View style={{ backgroundColor: 'red', padding: 10 }}>
              <Text style={{ color: 'white' }}>
                Per poter utilizzare la localizzazione e calcolare distanza
                e indicazioni stradali per i punti di rivendita, devi
                autorizzare l'applicazione all'utilizzo della
                localizzazione!
              </Text>
            </View>
          }
          onSearchHighAccuracy={() => Toast.show('Ricerca posizione')}
          onSuccessHighAccuracy={() => Toast.show('Posizione GPS trovata')}
          onSuccessLowAccuracy={() => Toast.show('Posizione trovata')}
          onLocationError={() =>
            Toast.show('Impossibile recuperare la posizione')
          }
        />
        <ScrollView style={styles.container}>
          <View>
            {this.locationOrderedRetailers(
              this.props.retailers.filter(
                obj => obj.company.categories.indexOf(category.id) !== -1
              )
            ).map(obj => {
              return (
                <ListItem
                  divider
                  numberOfLines='dynamic'
                  leftElement={
                    <View style={{ alignItems: 'center' }}>
                      <Icon name='map' size={30} />
                      <Text style={{ textAlign: 'center' }}>
                        {obj.distanceText}
                      </Text>
                    </View>
                  }
                  centerElement={
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: 'black' }}>{obj.company.name}</Text>
                      <Text style={{ color: 'gray' }}>{obj.address}, {obj.city}</Text>
                    </View>
                  }
                  rightElement={
                    <Icon
                      name='angle-right'
                      style={{ marginRight: 5 }}
                      size={30}
                    />
                  }
                  key={obj.id}
                  onPress={this.onPress(obj)}
                />
              )
            })}
          </View>
          <View style={[styles.section, { paddingBottom: 50, marginTop: 0 }]}>
            <View style={styles.banner}>
              <Banner />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

CategoryScreen.propTypes = {
  retailers: PropTypes.array,
  navigation: PropTypes.object.isRequired,
  location: PropTypes.object
}

const mapStateToProps = state => {
  return {
    retailers: state.agreements.retailers,
    location: state.location
  }
}

export default connect(mapStateToProps, null)(CategoryScreen)
