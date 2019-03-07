import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { AgreementsTypes } from '../Redux/AgreementsRedux'
import { AdsTypes } from '../Redux/AdsRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { fetchCategories, fetchRetailers } from './AgreementsSagas'
import { fetchBanners } from './AdsSagas'
// import { getUserAvatar } from './GithubSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  console.tron.display({
    name: 'SAGAS',
    preview: 'Registering SAGAS fired on actions',
    value: {
      actions: [
        'STARTUP',
        'FETCH_CATEGORIES',
        'FETCH_RETAILERS',
        'FETCH_BANNERS'
      ]
    }
  })
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(AgreementsTypes.FETCH_CATEGORIES, fetchCategories, api),
    takeLatest(AgreementsTypes.FETCH_RETAILERS, fetchRetailers, api),
    takeLatest(AdsTypes.FETCH_BANNERS, fetchBanners, api)
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
