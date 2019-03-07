import React from 'react'
import PropTypes from 'prop-types'
// import { Text, View, ScrollView } from 'react-native'
import Gallery from 'react-native-image-gallery'
import { View, Text } from 'react-native'

const RetailerImages = props => {
  let info = null
  if (props.retailer.company.images.length > 1) {
    info = (
      <Text style={{ textAlign: 'center', color: '#fff', marginTop: 20 }}>
        {props.retailer.company.images.length} immagini, scorri per
        visualizzarle tutte
      </Text>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {info}
      <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        onPageSelected={p => console.log(p)}
        images={props.retailer.company.images.map(url => {
          return { source: { uri: url } }
        })}
      />
    </View>
  )
}

RetailerImages.propTypes = {
  retailer: PropTypes.shape({
    company: PropTypes.shape({
      images: PropTypes.array
    })
  })
}

export default RetailerImages
