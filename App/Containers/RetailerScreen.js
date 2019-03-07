import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate, goBack } from '../Services/NavigationService'
import { View } from 'react-native'
import {
  Toolbar,
  BottomNavigation
} from 'react-native-material-ui'
import RetailerInfo from '../Components/RetailerInfo'
import RetailerImages from '../Components/RetailerImages'
import RetailerVideos from '../Components/RetailerVideos'
import RetailerMap from '../Containers/RetailerMap'
import RetailerAttachments from '../Components/RetailerAttachments'

class RetailerScreen extends Component {
  constructor () {
    super()

    this.state = {
      active: 'info'
    }
  }

  content () {
    if (this.state.active === 'info') {
      return <RetailerInfo retailer={this.retailer} />
    } else if (this.state.active === 'images') {
      return <RetailerImages retailer={this.retailer} />
    } else if (this.state.active === 'videos') {
      return <RetailerVideos retailer={this.retailer} />
    } else if (this.state.active === 'where') {
      return <RetailerMap retailer={this.retailer} />
    } else if (this.state.active === 'attachments') {
      return <RetailerAttachments retailer={this.retailer} />
    }
  }

  bottomNavigationActions () {
    let actions = []
    actions.push(
      <BottomNavigation.Action
        key='info'
        icon='info'
        style={{ container: { minWidth: null } }}
        onPress={() => this.setState({ active: 'info' })}
      />
    )
    if (this.retailer.company.images && this.retailer.company.images.length) {
      actions.push(
        <BottomNavigation.Action
          key='images'
          icon='camera-alt'
          style={{ container: { minWidth: null } }}
          onPress={() => this.setState({ active: 'images' })}
        />
      )
    }
    if (this.retailer.company.videos && this.retailer.company.videos.length) {
      actions.push(
        <BottomNavigation.Action
          key='videos'
          icon='camera-roll'
          style={{ container: { minWidth: null } }}
          onPress={() => this.setState({ active: 'videos' })}
        />
      )
    }
    if (this.retailer.lat) {
      actions.push(
        <BottomNavigation.Action
          key='where'
          icon='place'
          style={{ container: { minWidth: null } }}
          onPress={() => this.setState({ active: 'where' })}
        />
      )
    }
    if (this.retailer.company.attachments && this.retailer.company.attachments.length) {
      actions.push(
        <BottomNavigation.Action
          key='attachments'
          icon='attachment'
          style={{ container: { minWidth: null } }}
          onPress={() => this.setState({ active: 'attachments' })}
        />
      )
    }

    return actions
  }

  render () {
    let retailer = (this.retailer = this.props.navigation.state.params.retailer)
    console.log(retailer)
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigate('DrawerOpen')}
          rightElement='arrow-back'
          onRightElementPress={() => goBack()}
          centerElement={retailer.company.name}
        />
        {this.content()}
        <BottomNavigation active={this.state.active} hidden={false}>
          {this.bottomNavigationActions()}
        </BottomNavigation>
      </View>
    )
  }
}

RetailerScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        retailer: PropTypes.object.isRequired
      })
    })
  })
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps, null)(RetailerScreen)
