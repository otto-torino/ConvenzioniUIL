import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScrollView, Text, Image, View, ActivityIndicator } from 'react-native'
import { Images } from '../Themes'
import { resetTo } from '../Services/NavigationService.js'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  /**
   * Redirect to main screen when initial data are fetched
   */
  componentDidUpdate () {
    if (this.props.agreements.categories.length && this.props.agreements.retailers.length) {
      // @TODO timeout only if coming here before 3s
      setTimeout(() => {
        console.log('GOING TO MAIN SCREEN')
        resetTo('MainScreen')
      }, 0)
    }
  }

  componentWillMount () {
    console.log('WILL MOUNT LAUNCH SCREEN')
  }

  componentDidMount () {
    if (this.props.agreements.categories.length && this.props.agreements.retailers.length) {
      // @TODO timeout only if coming here before 3s
      setTimeout(() => {
        console.log('GOING TO MAIN SCREEN')
        resetTo('MainScreen')
      }, 0)
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

          <View style={[styles.section, styles.centered]} >
            <ActivityIndicator />
            <Text style={styles.welcomeText}>
              Benvenuto!
            </Text>
            <Text style={styles.sectionText}>
              Inizia subito a risparmiare con
            </Text>
            <Image source={Images.ready} />
            <Text style={styles.sectionTextSmall}>
              Attenzione: per usufruire degli sconti dovrai esibire
              la tua tessera UIL
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

LaunchScreen.propTypes = {
  agreements: PropTypes.shape({
    categories: PropTypes.array,
    retailers: PropTypes.array
  })
}

const mapStateToProps = (state) => {
  return {
    agreements: state.agreements
  }
}

export default connect(mapStateToProps, null)(LaunchScreen)
