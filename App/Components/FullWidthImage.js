import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'

export default class FullWidthImage extends Component {
  static propTypes = {
    ratio: PropTypes.number,
    source: PropTypes.object
  }

  constructor () {
    super()

    this.state = {
      width: 0,
      height: 0
    }

    this._onLayout = this._onLayout.bind(this)
  }

  _onLayout (event) {
    const containerWidth = event.nativeEvent.layout.width

    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      })
    } else {
      Image.getSize(this.props.source.uri, (width, height) => {
        // do not stretch image
        let newWidth = containerWidth > width ? width : containerWidth
        let newHeight = containerWidth > width ? height : containerWidth * height / width
        this.setState({
          width: newWidth,
          height: newHeight
        })
      })
    }
  }

  render () {
    return (
      <View onLayout={this._onLayout} style={{ alignItems: 'center' }}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height
          }}
        />
      </View>
    )
  }
}
