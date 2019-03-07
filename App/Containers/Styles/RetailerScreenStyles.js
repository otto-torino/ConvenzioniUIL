import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Fonts from '../../Themes/Fonts'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  sectionTitle: {
    ...ApplicationStyles.sectionTitle,
    textAlign: 'left',
    marginHorizontal: 0,
    paddingLeft: 0
  },
  mapDirections: {
    marginVertical: 0
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.silver
  }
})
