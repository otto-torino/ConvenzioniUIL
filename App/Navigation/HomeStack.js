import React from 'react'
import { StackNavigator } from 'react-navigation'
import HomeScreen from '../Containers/HomeScreen'

import DrawerIcon from '../Components/DrawerIcon'
// import { Colors } from '../Themes/'

// import styles from './Styles/NavigationStyles'

const HomeStack = StackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerIcon navigation={navigation} />
      })
    }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none'
    // navigationOptions: ({ navigation }) => ({
    //   headerTitle: 'Convenzioni UIL',
    //   headerStyle: styles.header,
    //   headerTintColor: Colors.snow,
    //   headerTitleStyle: styles.title
    // })
  }
)

export default HomeStack
