import weatherReducer from './weatherReducer'
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from '../actions/weatherActions'

describe('weatherReducer', () => {
  const initialState = {
    loading: false,
    weather: null,
    error: null,
  }

  it('should return the initial state', () => {
    const action = { type: '@@INIT' }
    const state = weatherReducer(undefined, action)
    expect(state).toEqual(initialState)
  })

  it('should handle FETCH_WEATHER_REQUEST', () => {
    const action = { type: FETCH_WEATHER_REQUEST }
    const state = weatherReducer(initialState, action)
    expect(state).toEqual({ loading: true, weather: null, error: null })
  })

  it('should handle FETCH_WEATHER_SUCCESS', () => {
    const weatherData = {
      current: { main: { temp: 20 }, name: 'Test City' },
      forecast: [{ dt: 1729956032, main: { temp: 20 } }],
    }
    const action = { type: FETCH_WEATHER_SUCCESS, payload: weatherData }
    const state = weatherReducer(initialState, action)
    expect(state).toEqual({ loading: false, weather: weatherData, error: null })
  })

  it('should handle FETCH_WEATHER_FAILURE', () => {
    const errorMessage = 'city not found'
    const action = { type: FETCH_WEATHER_FAILURE, payload: errorMessage }
    const state = weatherReducer(initialState, action)
    expect(state).toEqual({ loading: false, weather: null, error: errorMessage })
  })
})
