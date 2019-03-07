import React from 'react'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import HomeStack from './HomeStack'
import CategoriesStack from './CategoriesStack'
import SearchStack from './SearchStack'
import NewsletterStack from './NewsletterStack'
import CreditsStack from './CreditsStack'
import NoInternetConnectionScreen from '../Containers/NoInternetConnectionScreen'
import AppDrawer from '../Components/AppDrawer'

import styles from './Styles/NavigationStyles'

// main screen (after splash) routes
const MainNavigator = DrawerNavigator(
  {
    HomeStack: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Convenzioni UIL',
        title: 'Convenzioni UIL'
      })
    },
    CategoriesStack: {
      screen: CategoriesStack,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Categorie',
        title: 'Categorie'
      })
    },
    SearchStack: {
      screen: SearchStack,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Ricerca',
        title: 'Ricerca'
      })
    },
    NewsletterStack: {
      screen: NewsletterStack,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Newsletter',
        title: 'Newsletter'
      })
    },
    CreditsStack: {
      screen: CreditsStack,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Credits',
        title: 'Credits'
      })
    }
  },
  {
    contentComponent: props => <AppDrawer {...props} />
  }
)

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  NoInternetConnectionScreen: { screen: NoInternetConnectionScreen },
  MainScreen: { screen: MainNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const navigateOnce = (getStateForAction) => {
  return (action, state) => {
    const { type, routeName } = action
    return (
      state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
    ) ? null : getStateForAction(action, state)
    // you might want to replace 'null' with 'state' if you're using redux (see comments below)
  }
}

// avoid double rendering on double click
PrimaryNav.router.getStateForAction = navigateOnce(PrimaryNav.router.getStateForAction)
// uncommentig next causes DrawerOpen on hambuger press to fail
// MainNavigator.router.getStateForAction = navigateOnce(MainNavigator.router.getStateForAction)
HomeStack.router.getStateForAction = navigateOnce(HomeStack.router.getStateForAction)
CategoriesStack.router.getStateForAction = navigateOnce(CategoriesStack.router.getStateForAction)
SearchStack.router.getStateForAction = navigateOnce(SearchStack.router.getStateForAction)
NewsletterStack.router.getStateForAction = navigateOnce(NewsletterStack.router.getStateForAction)
CreditsStack.router.getStateForAction = navigateOnce(CreditsStack.router.getStateForAction)

export default PrimaryNav
