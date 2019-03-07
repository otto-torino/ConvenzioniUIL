import { StackNavigator } from 'react-navigation'
import CreditsScreen from '../Containers/CreditsScreen'

// import { Colors } from '../Themes/'

// import styles from './Styles/NavigationStyles'

const CreditsStack = StackNavigator(
  {
    CreditsScreen: {
      screen: CreditsScreen
    }
  },
  {
    initialRouteName: 'CreditsScreen',
    headerMode: 'none'
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: 'Convenzioni UIL',
    //   headerStyle: styles.header,
    //   headerTintColor: Colors.snow,
    //   headerTitleStyle: styles.title
    // })
  }
)

export default CreditsStack
