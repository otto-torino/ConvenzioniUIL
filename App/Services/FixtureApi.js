export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  fetchCategories: () => {
    const data = []
    return {
      ok: true,
      data: data
    }
  },
  fetchRetailers: () => {
    const data = []
    return {
      ok: true,
      data: data
    }
  },
  fetchBanners: () => {
    const data = {}
    return {
      ok: true,
      data: data
    }
  }
}
