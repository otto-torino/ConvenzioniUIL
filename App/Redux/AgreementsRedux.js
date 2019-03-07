import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchCategories: null,
  fetchCategoriesSuccess: ['categories'],
  fetchCategoriesFailure: ['error'],
  fetchRetailers: null,
  fetchRetailersSuccess: ['retailers'],
  fetchRetailersFailure: ['error'],
  setSearchText: ['text']
})

export const AgreementsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: [],
  retailers: [],
  error: null,
  fetching: false,
  searchText: null
})

/* ------------- Reducers ------------- */

// we're attempting to fetch categories
export const requestCategories = (state) => state.merge({ fetching: true })
// we're attempting to fetch retailers
export const requestRetailers = (state) => state.merge({ fetching: true })

// we've successfully fetched categories
export const successCategories = (state, { categories }) => {
  console.tron.display({
    name: 'DEBUG',
    preview: 'Fetch categories success',
    value: {
      reducer: 'Agreements',
      categories: categories
    }
  })
  return state.merge({ fetching: false, error: null, categories })
}

// we've successfully fetched retailers
export const successRetailers = (state, { retailers }) => {
  console.tron.display({
    name: 'DEBUG',
    preview: 'Fetch retailers success',
    value: {
      reducer: 'Agreements',
      retailers: retailers
    }
  })
  return state.merge({ fetching: false, error: null, retailers })
}

// we've had a problem
export const failureCategories = (state, { error }) =>
  state.merge({ fetching: false, error })

export const failureRetailers = (state, { error }) =>
  state.merge({ fetching: false, error })

export const setSearchTex = (state, { text }) =>
  state.merge({ searchText: text })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CATEGORIES]: requestCategories,
  [Types.FETCH_CATEGORIES_SUCCESS]: successCategories,
  [Types.FETCH_CATEGORIES_FAILURE]: failureCategories,
  [Types.FETCH_RETAILERS]: requestRetailers,
  [Types.FETCH_RETAILERS_SUCCESS]: successRetailers,
  [Types.FETCH_RETAILERS_FAILURE]: failureRetailers,
  [Types.SET_SEARCH_TEXT]: setSearchTex
})

/* ------------- Selectors ------------- */
