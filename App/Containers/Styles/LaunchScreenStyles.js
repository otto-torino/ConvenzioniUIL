import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Fonts from '../../Themes/Fonts'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  welcomeText: {
    ...Fonts.style.h1,
    textAlign: 'center'
  },
  centered: {
    alignItems: 'center'
  }
})
