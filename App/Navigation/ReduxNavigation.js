import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { BackHandler } from 'react-native'
import PropTypes from 'prop-types'
import { setNavigator } from '../Services/NavigationService'

class ReduxNavigation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  }

  _isDrawerOpen = nav => nav.routes[0].index === 1

  _shouldCloseApp = nav => {
    if (nav.index > 0) return false

    if (nav.routes) {
      return nav.routes.every(this._shouldCloseApp)
    }

    return true
  }

  _goBack = () => this.props.dispatch(ReactNavigation.NavigationActions.back())

  _closeDrawer = () =>
    this.props.dispatch(
      ReactNavigation.NavigationActions.navigate({
        routeName: 'DrawerClose'
      })
    )

  _handleBackPress = () => {
    if (this._isDrawerOpen(this.props.nav)) {
      this._closeDrawer()
      return true
    }
    if (this._shouldCloseApp(this.props.nav)) {
      return false
    }
    this._goBack()
    return true
  }

  componentWillMount () {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  render () {
    const { dispatch, nav } = this.props
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav
    })
    setNavigator(navigation)

    return <AppNavigation navigation={navigation} />
  }
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
