import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MapView from 'react-native-maps'

class MapViewDirections extends Component {
  constructor (props) {
    super(props)

    this.state = {
      coordinates: null,
      distance: null,
      duration: null
    }
  }

  componentDidMount () {
    console.log('DIRECTION MOUNTED')
    this.fetchAndRenderRoute()
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.origin.latitude !== this.props.origin.latitude ||
      nextProps.origin.longitude !== this.props.origin.longitude ||
      nextProps.destination.latitude !== this.props.destination.latitude ||
      nextProps.destination.longitude !== this.props.destination.longitude ||
      nextProps.mode !== this.props.mode
    ) {
      this.resetState(this.fetchAndRenderRoute)
    }
  }

  resetState = (cb = null) => {
    this.setState(
      {
        coordinates: null,
        distance: null,
        duration: null
      },
      cb
    )
  }

  /* eslint-disable */
  decode(t, e) {
    for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }

    return d = d.map(function(t) {
      return {
        latitude: t[0],
        longitude: t[1]
      }
    });
  }
  /* eslint-enable */

  fetchAndRenderRoute = () => {
    let { origin, destination, apikey, mode, language } = this.props

    if (origin.latitude && origin.longitude) {
      origin = `${origin.latitude},${origin.longitude}`
    }

    if (destination.latitude && destination.longitude) {
      destination = `${destination.latitude},${destination.longitude}`
    }

    this.fetchRoute(origin, destination, mode, language, apikey)
      .then(result => {
        if (this.props.onSuccess) {
          this.props.onSuccess(result)
        }
        this.setState(result)
      })
      .catch(e => {
        this.resetState()
        if (this.props.onError) {
          this.props.onError(e)
        }
        console.warn(e)
      })
  }

  fetchRoute = (origin, destination, mode, language, apikey) => {
    const url = `https://maps.googleapis.com/maps/api/directions/json` +
      `?origin=${origin}&destination=${destination}&key=${apikey}&mode=${mode}&language=${language}`

    return fetch (url)
      .then(response => response.json())
      .then(json => {
        if (json.routes.length) {
          const route = json.routes[0]

          return Promise.resolve({
            json: json,
            distance:
              route.legs.reduce((carry, curr) => {
                return carry + curr.distance.value
              }, 0) / 1000,
            duration:
              route.legs.reduce((carry, curr) => {
                return carry + curr.duration.value
              }, 0) / 60,
            coordinates: this.decode(route.overview_polyline.points)
          })
        } else {
          return Promise.reject(new Error('cannot retrieve route'))
        }
      })
  }

  render () {
    if (!this.state.coordinates) {
      return null
    }

    const { origin, destination, apikey, ...props } = this.props

    return <MapView.Polyline coordinates={this.state.coordinates} {...props} />
  }
}

MapViewDirections.defaultProps = {
  mode: 'driving',
  language: 'en'
}

MapViewDirections.propTypes = {
  origin: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  destination: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  apikey: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  mode: PropTypes.string, // driving, walking, bicycling, transit
  language: PropTypes.string
}

export default MapViewDirections
