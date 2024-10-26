import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'
import { thunk } from 'redux-thunk'
import {
  fetchWeather,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from './weatherActions'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})
const mockAxios = new AxiosMockAdapter(axios)

describe('fetchWeather action creator', () => {
  beforeEach(() => {
    mockAxios.reset()
    store.clearActions()
  })
  it('dispatches FETCH_WEATHER_SUCCESS when fetching weather data has been done', async () => {
    const weatherData = {
      main: {
        temp: 20,
      },
      weather: [{ description: 'clear sky', icon: '01d' }],
      name: 'London',
    }
    const forecastData = {
      list: [
        { dt: 1729956032, main: { temp: 20 } },
        { dt: 1729998000, main: { temp: 22 } },
      ],
    }
    const location = 'London'
    const API_KEY = '20816a5e230b2e0e89da82ac22a9ab10'
    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`).reply(200, weatherData)
    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`).reply(200, forecastData)
    const expectedActions = [
      { type: FETCH_WEATHER_REQUEST },
      {
        type: FETCH_WEATHER_SUCCESS,
        payload: {
          current: weatherData,
          forecast: forecastData.list,
        },
      },
    ]
    await store.dispatch(fetchWeather(location))
    console.log("Dispatched actions on success:", store.getActions())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('dispatches FETCH_WEATHER_FAILURE when fetching weather data fails', async () => {
    const location = 'InvalidLocation'
    const API_KEY = '20816a5e230b2e0e89da82ac22a9ab10'
    mockAxios.onGet(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`).reply(404, { message: 'city not found' })
    const expectedActions = [
      { type: FETCH_WEATHER_REQUEST },
      { type: FETCH_WEATHER_FAILURE, payload: 'city not found' },
    ]
    await store.dispatch(fetchWeather(location))
    console.log("Dispatched actions on failure:", store.getActions())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
