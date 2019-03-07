import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import { reducer as locationManagerReducer } from 'react-native-location-manager/Redux'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  network: require('./NetworkRedux').reducer,
  location: locationManagerReducer,
  agreements: require('./AgreementsRedux').reducer,
  ads: require('./AdsRedux').reducer
  // github: require('./GithubRedux').reducer,
  // search: require('./SearchRedux').reducer
})

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
