import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchBanners: null,
  fetchBannersSuccess: ['banners'],
  fetchBannersFailure: ['error'],
  addUsed: ['bannerId'],
  resetUsed: null
})

export const AdsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  banners: [],
  used: [],
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to fetch banners
export const requestBanners = (state) => state.merge({ fetching: true })

// we've successfully fetched categories
export const successBanners = (state, { banners }) => {
  console.tron.display({
    name: 'DEBUG',
    preview: 'Fetch banners success',
    value: {
      reducer: 'Ads',
      banners: banners
    }
  })
  return state.merge({ fetching: false, error: null, banners })
}

// we've had a problem
export const failureBanners = (state, { error }) =>
  state.merge({ fetching: false, error })

// add banner to used array
export const addUsed = (state, { bannerId }) => {
  console.tron.display({
    name: 'DEBUG',
    preview: 'Add used banner',
    value: {
      reducer: 'Ads',
      bannerId: bannerId
    }
  })
  return state.merge({ used: [...state.used, bannerId] })
}

// add banner to used array
export const resetUsed = (state) => {
  console.tron.display({
    name: 'DEBUG',
    preview: 'Reset used banners',
    value: {
      reducer: 'Ads'
    }
  })
  return state.merge({ used: [] })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_BANNERS]: requestBanners,
  [Types.FETCH_BANNERS_SUCCESS]: successBanners,
  [Types.FETCH_BANNERS_FAILURE]: failureBanners,
  [Types.ADD_USED]: addUsed,
  [Types.RESET_USED]: resetUsed
})

/* ------------- Selectors ------------- */
