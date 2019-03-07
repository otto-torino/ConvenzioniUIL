import { NavigationActions } from 'react-navigation'

const config = {}

export function setNavigator (nav) {
  if (nav) {
    config.navigator = nav
  }
}

export function navigate (routeName, params) {
  if (config.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params })
    config.navigator.dispatch(action)
  }
}

export function resetTo (routeName, params) {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    key: null, // https://github.com/react-community/react-navigation/issues/1127
    actions: [NavigationActions.navigate({ routeName }, params)]
  })
  config.navigator.dispatch(actionToDispatch)
}

export function goBack () {
  if (config.navigator) {
    let action = NavigationActions.back({})
    config.navigator.dispatch(action)
  }
}
