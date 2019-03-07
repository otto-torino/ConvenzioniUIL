import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate, goBack } from '../Services/NavigationService'
import { View, Text, ScrollView } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import Permissions from 'react-native-permissions'
import { MaterialDialog } from 'react-native-material-dialog'
import RNSettings from 'react-native-settings'
import Toast from 'react-native-simple-toast'
import { distance, getLocation } from '../Lib/Location'
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
  constructor () {
    super()
    this.state = {
      showLocationSettingsDialog: false,
      locationPermission: null,
      position: {
        lat: null,
        lng: null
      }
    }
  }

  // @TODO check for location enabled and ask to enable it
  // https://github.com/yonahforst/react-native-permissions
  componentWillMount () {
    // check if user already has authorized the app location
    Permissions.check('location').then(
      response => {
        // response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('CHECK LOCATION PERMISSION RESPONSE', response)
        this.setState({ locationPermission: response })

        if (response === 'authorized') {
          this.checkLocationSetting()
        } else {
          this.setState({
            showLocationSettingsDialog: true
          })
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  checkLocationSetting () {
    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then(result => {
      console.log('RNSETTINGS RESULT', result)
      if (result === RNSettings.ENABLED) {
        this.getCurrentLocation()
      } else {
        this.setState({
          showLocationSettingsDialog: true
        })
      }
    })
  }

  componentDidMount () {
    console.log('MOUNTED CATEGORY SCREEN')
  }

  requestLocationPermission () {
    Permissions.request('location').then(response => {
      // returns once the user has chosen to 'allow' or to 'not allow' access
      // response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      console.log('LOCATION PERMISSION: ', response)
      this.setState({ locationPermission: response })
      if (response === 'authorized') {
        this.checkLocationSetting()
      } else {
        Toast.show(
          'devi dare il permesso di utilizzare la tua posizione per calcolare ' +
          'la distanza ed il percorso per ragigungere i punti vendita.'
        )
      }
    })
  }

  openSettings () {
    RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then(
      result => {
        console.log('AFTER SETTINGS', result)
        if (result === RNSettings.ENABLED) {
          console.log('GET LOCATION')
          this.getCurrentLocation()
        }
      }
    )
  }

  getCurrentLocation () {
    getLocation(coords => {
      this.setState({
        position: {
          lng: coords.longitude,
          lat: coords.latitude
        }
      })
    })
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
    if (!this.state.position.lat || !point.lat) return ''
    let d = distance(
      point.lat,
      point.lng,
      this.state.position.lat,
      this.state.position.lng
    )
    return _.round(d, 1)
  }

  locationOrderedRetailers (retailers) {
    let cnt = 100000 // to give a distance id to unlocalized points
    let key = this.state.position.lat ? 'distance' : 'name'
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
    // location settings dialog
    let locationSettingsDialog = (
      <MaterialDialog
        title='Possiamo accedere alla tua posizione?'
        visible={this.state.showLocationSettingsDialog}
        okLabel={
          this.state.locationPermission !== 'authorized'
            ? 'OK'
            : 'IMPOSTAZIONI'
        }
        onOk={() => {
          if (this.state.locationPermission !== 'authorized') {
            this.requestLocationPermission()
          } else {
            this.openSettings()
          }
          this.setState({ showLocationSettingsDialog: false })
        }}
        cancelLabel='ANNULLA'
        onCancel={() => this.setState({ showLocationSettingsDialog: false })}
      >
        <Text>
          Abbiamo bisogno della tua posizione per calcolare la distanza dei
          punti vendita
        </Text>
      </MaterialDialog>
    )

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
        <ScrollView style={styles.container}>
          <View>
            {locationSettingsDialog}
            {this.locationOrderedRetailers(
              this.props.retailers.filter(
                obj => obj.company.categories.indexOf(category.id) !== -1
              )
            ).map(obj => {
              return (
                <ListItem
                  divider
                  leftElement={
                    <View style={{ alignItems: 'center' }}>
                      <Icon name='map' size={30} />
                      <Text style={{ textAlign: 'center' }}>
                        {obj.distanceText}
                      </Text>
                    </View>
                  }
                  centerElement={{
                    primaryText: obj.company.name,
                    secondaryText: obj.address + ', ' + obj.city
                  }}
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
        </ScrollView>
      </View>
    )
  }
}

CategoryScreen.propTypes = {
  retailers: PropTypes.array,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    retailers: state.agreements.retailers
  }
}

export default connect(mapStateToProps, null)(CategoryScreen)
