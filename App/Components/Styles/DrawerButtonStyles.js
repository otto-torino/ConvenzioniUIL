import { Metrics, Colors, Fonts } from '../../Themes'
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  text: {
    ...Fonts.style.h5,
    color: Colors.snow,
    marginVertical: Metrics.baseMargin
  }
})
