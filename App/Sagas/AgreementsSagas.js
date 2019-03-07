import { put, call } from 'redux-saga/effects'
import AgreementsActions from '../Redux/AgreementsRedux'

// attempts to fetch categories
export function * fetchCategories (api, action) {
  console.tron.display({
    name: 'SAGAS',
    preview: 'Starting categories fetch',
    value: {
      sagas: 'Agreements',
      api,
      action
    }
  })
  const response = yield call(api.fetchCategories)
  if (response.ok) {
    yield put(AgreementsActions.fetchCategoriesSuccess(response.data))
  } else {
    yield put(AgreementsActions.fetchCategoriesFailure(response.problem))
  }
}

export function * fetchRetailers (api, action) {
  console.tron.display({
    name: 'SAGAS',
    preview: 'Starting retailers fetch',
    value: {
      sagas: 'Agreements',
      api,
      action
    }
  })
  const response = yield call(api.fetchRetailers)
  if (response.ok) {
    yield put(AgreementsActions.fetchRetailersSuccess(response.data))
  } else {
    yield put(AgreementsActions.fetchRetailersFailure(response.problem))
  }
}
