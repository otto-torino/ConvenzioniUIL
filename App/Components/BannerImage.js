import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import FullWidthImage from './FullWidthImage'

const propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const BannerImage = props => {
  return (
    <TouchableOpacity onPress={props.onClick}>
      <FullWidthImage
        source={{ uri: props.imageUrl }}
      />
    </TouchableOpacity>
  )
}

BannerImage.propTypes = propTypes
export default BannerImage
