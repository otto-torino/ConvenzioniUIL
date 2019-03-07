import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Linking, View, Text } from 'react-native'
import BannerImage from '../Components/BannerImage'
import AdsActions from '../Redux/AdsRedux'

class Banner extends Component {
  static propTypes = {
    banners: PropTypes.array,
    used: PropTypes.array,
    dispatch: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.state = {
      banner: null
    }
  }

  /**
   * Shuffles array in place
   * @param {Array} a items An array containing the items.
   */
  shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  openUrl (url) {
    return () => {
      Linking.openURL(url)
    }
  }

  getBanner () {
    let banner = null
    let banners = []
    this.props.banners.forEach(b => banners.push(b))
    this.shuffleArray(banners)
    for (let i = 0, len = banners.length; i < len; i++) {
      let b = banners[i]
      // still not used?
      if (this.props.used.indexOf(b.id) === -1) {
        banner = b
        this.props.dispatch(AdsActions.addUsed(b.id))
        break
      }
    }

    // all used?
    if (!banner) {
      // ...reset
      this.props.dispatch(AdsActions.resetUsed())
      // ...and get the first
      banner = this.props.banners[0]
      setTimeout(() => this.props.dispatch(AdsActions.addUsed(banner.id)), 500)
    }

    this.setState({
      banner: banner
    })
  }

  componentDidMount () {
    console.log('MOUNTED BANNER COMPONENT')
    if (this.props.banners && this.props.banners.length && !this.state.banner) {
      this.getBanner()
    }
  }

  render () {
    if (!this.state.banner) return null

    let { url, image } = this.state.banner
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderColor: '#999',
          borderWidth: 1
        }}
      >
        <View
          style={{
            backgroundColor: '#eee'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              padding: 5
            }}
          >
            Partner
          </Text>
        </View>
        <BannerImage onClick={this.openUrl(url)} imageUrl={image} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  banners: state.ads.banners,
  used: state.ads.used
})

const mapDispatchToProps = dispatch => ({
  dispatch: action => dispatch(action)
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
