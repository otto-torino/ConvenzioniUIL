import React from 'react'
import PropTypes from 'prop-types'
import { navigate, goBack } from '../Services/NavigationService'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'
import Communications from 'react-native-communications'
import { Images } from '../Themes'

import images from '../Themes/Images'

import styles from './Styles/LaunchScreenStyles'

class CreditsScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          rightElement='arrow-back'
          onRightElementPress={() => goBack()}
          centerElement={'Credits'}
        />
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Applicazione Convenzioni UIL{'\n'}
            versione: 1.1.0
          </Text>
          <Text style={styles.sectionText}>Sviluppata da</Text>
          <TouchableOpacity
            onPress={() => Communications.web('https://www.otto.to.it', true)}
            style={{ alignItems: 'center' }}
          >
            <Image source={images.otto} />
          </TouchableOpacity>
          <Text style={styles.sectionText}>per</Text>
          <TouchableOpacity
            onPress={() => Communications.web('http://www.rtpcomunicazione.it', true)}
            style={{ alignItems: 'center' }}
          >
            <Image source={images.rtpComunicazione} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

CreditsScreen.propTypes = {}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, null)(CreditsScreen)
