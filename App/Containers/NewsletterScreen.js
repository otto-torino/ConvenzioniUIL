import React from 'react'
import PropTypes from 'prop-types'
import { navigate, goBack } from '../Services/NavigationService'
import { View, Text } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Button from '../Components/Button'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Communications from 'react-native-communications'

import styles from './Styles/LaunchScreenStyles'

class NewsletterScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          rightElement='arrow-back'
          onRightElementPress={() => goBack()}
          centerElement={'Newsletter'}
        />
        <View style={styles.section}>
          <Text style={[styles.sectionTitle]}>
            Iscriviti alla newsletter Convenzioni UIL
          </Text>
          <Text style={styles.sectionText}>
            Per ricevere aggiornamenti su nuove convenzioni, promozioni e offerte riservate
            agli iscritti UIL e ai loro famigliari.
          </Text>
          <Button
            raised
            accent
            text='iscriviti'
            onPress={() =>
              Communications.web('https://myt50.mailrouter.it/user/register', true)
            }
          />
          <Text style={styles.sectionText}>
            Puoi anche iscriverti con il tuo account facebook
          </Text>
          <Text style={{ textAlign: 'center' }}>
            <Icon
              name='facebook-square'
              size={60}
              color={'#4267B2'}
              onPress={() =>
                Communications.web(
                  'https://myt50.mailrouter.it/user/register_facebook',
                  true
                )
              }
            />
          </Text>
        </View>
      </View>
    )
  }
}

NewsletterScreen.propTypes = {}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, null)(NewsletterScreen)
