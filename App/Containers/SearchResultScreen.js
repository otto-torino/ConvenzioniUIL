import React from 'react'
import PropTypes from 'prop-types'
import { navigate, goBack } from '../Services/NavigationService'
import { View, Text, ScrollView } from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Icon from 'react-native-vector-icons/FontAwesome'
import Toast from 'react-native-simple-toast'
import { connect } from 'react-redux'
import { distance } from 'react-native-location-manager/Utils'
import LocationManager from 'react-native-location-manager'
import _ from 'lodash'

// Styles
import styles from './Styles/LaunchScreenStyles'

class SearchResultScreen extends React.Component {
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

  filteredRetailers () {
    let cnt = 100000 // to give a distance id to unlocalized points
    let re = new RegExp(this.props.agreements.searchText, 'i')
    let key = this.props.location.position ? 'distance' : 'name'
    let retailers = []
    this.props.agreements.retailers.forEach(retailer => {
      let r = Object.assign({}, retailer)
      if (re.test(r.company.name) || re.test(r.company.tags.join(','))) {
        r.distance = this.distance(r)
        r.distanceText = r.distance ? r.distance + ' Km' : 'N.D.'
        if (key === 'distance') {
          r.sort = r.distance ? r.distance : cnt++
        } else {
          r.sort = r.company.name
        }
        retailers.push(r)
      }
    })
    return _.sortBy(retailers, [
      function (o) {
        return o.sort
      }
    ])
  }

  onPress (retailer) {
    return () => {
      navigate('RetailerScreen', {
        retailer: retailer
      })
    }
  }

  render () {
    console.log('RENDRING LIST RESULT')
    let { searchText } = this.props.agreements
    let filtered = this.filteredRetailers()
    let noResults = null
    if (filtered.length === 0) {
      noResults = (
        <Text style={styles.sectionText}>La ricerca non ha prodotto risultati</Text>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          rightElement='arrow-back'
          onRightElementPress={() => goBack()}
          centerElement={'Ricerca'}
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
        <Text style={styles.sectionText}>Risultati ricerca: {searchText}</Text>
        {noResults}
        <ScrollView style={styles.container}>
          <View>
            {filtered.map(obj => {
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

SearchResultScreen.propTypes = {
  agreements: PropTypes.shape({
    searchText: PropTypes.string,
    retailers: PropTypes.array
  }),
  location: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    agreements: state.agreements,
    location: state.location
  }
}

export default connect(mapStateToProps, null)(SearchResultScreen)
