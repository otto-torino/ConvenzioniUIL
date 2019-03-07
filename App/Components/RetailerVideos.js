import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-native-youtube'
import { View } from 'react-native'

const RetailerVideos = props => {
  return (
    <View style={{ flex: 1 }}>
      {props.retailer.company.videos.map((v, index) => {
        return (
          <View key={'video-' + index}>
            <YouTube
              apiKey={'AIzaSyBWGiXvdj9ojfmjf5DtBBjGAzUh0j2FY2U'}
              videoId={v.code}
              play={false} // control playback of video with true/false
              fullscreen // control whether the video should play in fullscreen or inline
              loop={false} // control whether the video should loop when ended
              style={{ alignSelf: 'stretch', height: 300 }}
            />
          </View>
        )
      })}
    </View>
  )
}

RetailerVideos.propTypes = {
  retailer: PropTypes.shape({
    company: PropTypes.shape({
      videos: PropTypes.array
    })
  })
}

export default RetailerVideos
