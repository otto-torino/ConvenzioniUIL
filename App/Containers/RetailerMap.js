import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import Toast from 'react-native-simple-toast'
import { ActionButton } from 'react-native-material-ui'
import LocationManager from 'react-native-location-manager'
import MapViewDirections from '../Components/react-native-maps-directions'
import Modal from 'react-native-modalbox'
import HTMLView from 'react-native-htmlview'
import Icon from 'react-native-vector-icons/MaterialIcons'
import config from '../Config/AppConfig'
import _ from 'lodash'
import Colors from '../Themes/Colors'
// Styles
import styles from '../Containers/Styles/RetailerScreenStyles'

import moment from 'moment'
import 'moment/locale/it'
moment.locale('it')

const modeMap = {
  'directions-car': 'driving',
  'directions-transit': 'transit',
  'directions-walk': 'walking'
}

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height

class RetailerMap extends Component {
  static propTypes = {
    retailer: PropTypes.object,
    location: PropTypes.object
  }

  constructor () {
    super()
    this.map = null
    this.onLayout = this.onLayout.bind(this)
    this.onDirectionsFetched = this.onDirectionsFetched.bind(this)
    this.markersFitted = false

    this.state = {
      width: width,
      height: height,
      showDirections: false,
      showDirectionsText: false,
      directionsMode: null,
      directionsSuccess: false,
      directions: null
    }
  }

  fitMarkers () {
    if (!this.map) return null
    let { position } = this.props.location

    this.map.fitToCoordinates(
      [
        {
          latitude: parseFloat(position.latitude),
          longitude: parseFloat(position.longitude)
        },
        {
          latitude: parseFloat(this.props.retailer.lat),
          longitude: parseFloat(this.props.retailer.lng)
        }
      ],
      { edgePadding: { top: 100, bottom: 250, left: 100, right: 100 } } // not animated
    )
    this.markersFitted = true
  }

  onLayout (e) {
    const { width, height } = Dimensions.get('window')
    this.setState({ width, height })
  }

  actionButton () {
    let { position } = this.props.location
    if (!position || this.state.showDirectionsText) return null
    return (
      <ActionButton
        icon='navigation'
        transition='speedDial'
        onPress={icon => {
          if (Object.keys(modeMap).indexOf(icon) !== -1) {
            this.setState({
              showDirections: true,
              directionsMode: modeMap[icon]
            })
          } else if (icon === 'list') {
            if (!this.state.directionsSuccess) {
              Toast.show('Selezionare prima un mezzo di trasporto')
            } else {
              this.setState({ showDirectionsText: true })
              this.refs['modal'].open()
            }
          }
        }}
        style={{
          container: {
            zIndex: 1000
          }
        }}
        actions={[...Object.keys(modeMap), 'list']}
      />
    )
  }

  directions () {
    let { position } = this.props.location
    if (!this.state.showDirections || !position) return null
    return (
      <MapViewDirections
        origin={{
          latitude: parseFloat(position.latitude),
          longitude: parseFloat(position.longitude)
        }}
        destination={{
          latitude: parseFloat(this.props.retailer.lat),
          longitude: parseFloat(this.props.retailer.lng)
        }}
        apikey={config.mapsApiKey}
        strokeWidth={5}
        strokeColor={Colors.accent}
        mode={this.state.directionsMode}
        language='it'
        onSuccess={this.onDirectionsFetched}
        onError={e =>
          Toast.show(
            'Impossibile recuperare le indicazioni stradali, prova con un altro mezzo di trasporto'
          )
        }
      />
    )
  }

  directionsText () {
    let summary = null
    let content = null
    if (this.state.directionsSuccess) {
      let distanceKm = this.state.directions.distance
      let timeMinutes = this.state.directions.duration
      summary = (
        <Text style={styles.sectionText}>
          Distanza: {_.round(distanceKm, 1)} Km{'\n'}
          Durata: {moment.duration(timeMinutes, 'minutes').humanize()}
        </Text>
      )
      content = (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
          {this.state.directions.json.routes[0].legs[0].steps.map((s, k) => {
            let divider = null
            if (k !== 0) {
              divider = (
                <View style={{ alignItems: 'center', marginBottom: 15 }}>
                  <Icon name='arrow-downward' size={30} color={Colors.accent} />
                </View>
              )
            }
            return (
              <View key={'dt-' + k} style={[styles.mapDirections, styles.section]}>
                {divider}
                <HTMLView
                  value={
                    '<p>' +
                    s.html_instructions.replace(/(\r\n|\n|\r)/gm, '') +
                    '</p>'
                  }
                  style={{ width: '100%' }}
                />
                <Text style={{ textAlign: 'right', fontWeight: 'bold' }}>{s.distance.text}</Text>
              </View>
            )
          })}
        </ScrollView>
      )
    }

    return (
      <Modal
        backdrop
        position={'center'}
        ref={'modal'}
        swipeArea={100}
        swipeToClose
        style={{ backgroundColor: Colors.modalBackground }}
        onClosed={() => this.setState({ showDirectionsText: false })}
      >
        {summary}
        {content}
      </Modal>
    )
  }

  onDirectionsFetched (json) {
    this.setState({ directionsSuccess: true, directions: json })
  }

  render () {
    let mapStyles = {
      width: this.state.width,
      height: this.state.height
    }
    let { position } = this.props.location

    let currentLocationMarker = null
    if (position) {
      currentLocationMarker = (
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(position.latitude),
            longitude: parseFloat(position.longitude)
          }}
          title='sono qui'
          identifier='muser'
          key={0}
        >
          <View>
            <Icon name='person-pin-circle' size={50} color={Colors.marker} />
          </View>
        </MapView.Marker>
      )
      if (!this.markersFitted) {
        setTimeout(() => this.fitMarkers(), 500)
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.container}>
            <LocationManager
              highAccuracyTimeout={10000}
              deniedPermissionMessage={null}
              onSearchHighAccuracy={() => Toast.show('Ricerca posizione')}
              onSuccessHighAccuracy={() => Toast.show('Posizione GPS trovata')}
              onSuccessLowAccuracy={() => Toast.show('Posizione trovata')}
              onLocationError={() =>
                Toast.show('Impossibile recuperare la posizione')
              }
            />
            <MapView
              ref={ref => {
                this.map = ref
              }}
              style={mapStyles}
              initialRegion={{
                latitude: parseFloat(this.props.retailer.lat),
                longitude: parseFloat(this.props.retailer.lng),
                latitudeDelta: 2,
                longitudeDelta: 2 * ASPECT_RATIO
              }}
            >
              <MapView.Marker
                identifier='mretailer'
                coordinate={{
                  latitude: parseFloat(this.props.retailer.lat),
                  longitude: parseFloat(this.props.retailer.lng)
                }}
                title={this.props.retailer.company.name}
                key={this.props.retailer.id}
              >
                <View>
                  <Icon name='place' size={45} color={Colors.marker} />
                </View>
              </MapView.Marker>
              {currentLocationMarker}
              {this.directions()}
            </MapView>
          </View>
        </ScrollView>
        {this.directionsText()}
        {this.actionButton()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  }
}

export default connect(mapStateToProps, null)(RetailerMap)
