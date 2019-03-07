import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Text, Image, View } from 'react-native'
import * as NavigationService from '../Services/NavigationService'
import { connect } from 'react-redux'

import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

class NoInternetConnectionScreen extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.network.isConnected) {
      NavigationService.resetTo('MainScreen')
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              L'applicazione richiede una connessione internet attiva, attivare la rete dati o WiFi e riprovare.
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

NoInternetConnectionScreen.propTypes = {
  network: PropTypes.shape({
    isConnected: PropTypes.bool
  })
}

const mapStateToProps = (state) => {
  return {
    network: state.network
  }
}

export default connect(mapStateToProps, null)(NoInternetConnectionScreen)
