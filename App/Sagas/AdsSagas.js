import { put, call } from 'redux-saga/effects'
import AdsActions from '../Redux/AdsRedux'

// attempts to fetch categories
export function * fetchBanners (api, action) {
  console.tron.display({
    name: 'SAGAS',
    preview: 'Starting banners fetch',
    value: {
      sagas: 'Ads',
      api,
      action
    }
  })
  const response = yield call(api.fetchBanners)
  if (response.ok) {
    yield put(AdsActions.fetchBannersSuccess(response.data))
  } else {
    yield put(AdsActions.fetchBannersFailure(response.problem))
  }
}
