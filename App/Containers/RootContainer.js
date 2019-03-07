import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StatusBar, NetInfo } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import networkActions from '../Redux/NetworkRedux'
import { ThemeProvider } from 'react-native-material-ui'
import MaterialTheme from '../Themes/Material'
import { resetTo } from '../Services/NavigationService'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  /**
   * Checks for internet connection and redirect to connection screen
   * if no connection is active
   */
  checkInternetConnection (props) {
    let network = props ? props.network : this.props.network
    if (network.isConnected === false) {
      // reset navigation, otherwise after going to NoInternetConnection component,
      // the LaunchScreen remains active, its DidUpdate method gets fired on succesfull retrieving
      // of categories and user is redirected to home page
      console.tron.display({
        name: 'DEBUG',
        preview: 'Network stuff',
        value: {
          component: 'RootContainer',
          message: 'device is offline'
        }
      })
      resetTo('NoInternetConnectionScreen')
    }
  }

  /**
   * Check for internet connection
   */
  componentWillMount () {
    NetInfo.addEventListener('connectionChange', ({ type, effectiveType }) => {
      console.tron.display({
        name: 'DEBUG',
        preview: 'Network stuff',
        value: {
          component: 'RootContainer',
          message: 'connection change fired',
          type: type,
          isconnected: type !== 'none' && type !== 'unknown'
        }
      })
      this.props.dispatch(
        networkActions.setNetworkConnection(
          type !== 'none' && type !== 'unknown'
        )
      )
    })
  }

  /**
   * Check for internet connection change
   */
  componentWillReceiveProps (nextProps) {
    console.tron.display({
      name: 'DEBUG',
      preview: 'Network stuff',
      value: {
        component: 'RootContainer',
        message: 'received new props',
        props: nextProps
      }
    })
    this.checkInternetConnection(nextProps)
  }

  componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    return (
      <ThemeProvider uiTheme={MaterialTheme}>
        <View style={styles.applicationView}>
          <StatusBar barStyle='light-content' />
          <ReduxNavigation />
        </View>
      </ThemeProvider>
    )
  }
}

RootContainer.propTypes = {
  network: PropTypes.shape({
    isConnected: PropTypes.bool
  }),
  startup: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    network: state.network
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  dispatch: action => dispatch(action),
  startup: () => dispatch(StartupActions.startup())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
