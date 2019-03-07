import { StackNavigator } from 'react-navigation'
import SearchResultScreen from '../Containers/SearchResultScreen'
import RetailerScreen from '../Containers/RetailerScreen'

// import { Colors } from '../Themes/'

// import styles from './Styles/NavigationStyles'

const SearchStack = StackNavigator(
  {
    SearchResultScreen: {
      screen: SearchResultScreen
    },
    RetailerScreen: {
      screen: RetailerScreen
    }
  },
  {
    initialRouteName: 'SearchResultScreen',
    headerMode: 'none'
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: 'Convenzioni UIL',
    //   headerStyle: styles.header,
    //   headerTintColor: Colors.snow,
    //   headerTitleStyle: styles.title
    // })
  }
)

export default SearchStack
