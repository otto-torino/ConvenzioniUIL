import { StackNavigator } from 'react-navigation'
import NewsletterScreen from '../Containers/NewsletterScreen'

// import { Colors } from '../Themes/'

// import styles from './Styles/NavigationStyles'

const NewsletterStack = StackNavigator(
  {
    NewsletterScreen: {
      screen: NewsletterScreen
    }
  },
  {
    initialRouteName: 'NewsletterScreen',
    headerMode: 'none'
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: 'Convenzioni UIL',
    //   headerStyle: styles.header,
    //   headerTintColor: Colors.snow,
    //   headerTitleStyle: styles.title
    // })
  }
)

export default NewsletterStack
