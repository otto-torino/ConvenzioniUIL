import { StackNavigator } from 'react-navigation'
import CategoriesScreen from '../Containers/CategoriesScreen'
import CategoryScreen from '../Containers/CategoryScreen'
import RetailerScreen from '../Containers/RetailerScreen'

// import { Colors } from '../Themes/'

// import styles from './Styles/NavigationStyles'

const CategoriesStack = StackNavigator(
  {
    CategoriesScreen: {
      screen: CategoriesScreen
    },
    CategoryScreen: {
      screen: CategoryScreen
    },
    RetailerScreen: {
      screen: RetailerScreen
    }
  },
  {
    initialRouteName: 'CategoriesScreen',
    headerMode: 'none'
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: 'Convenzioni UIL',
    //   headerStyle: styles.header,
    //   headerTintColor: Colors.snow,
    //   headerTitleStyle: styles.title
    // })
  }
)

export default CategoriesStack
