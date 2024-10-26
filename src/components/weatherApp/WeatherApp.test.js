import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import WeatherApp from './WeatherApp'

const mockStore = configureStore([])
const store = mockStore({
  weather: {
    loading: false,
    weather: null,
    error: null,
  },
})

describe('WeatherApp Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <WeatherApp />
      </Provider>
    )
    expect(screen.getByLabelText(/enter location to search for weather/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  test('shows loading spinner when loading', () => {
    const loadingStore = mockStore({
      weather: {
        loading: true,
        weather: null,
        error: null,
      },
    })
    render(
      <Provider store={loadingStore}>
        <WeatherApp />
      </Provider>
    )
    expect(screen.getByLabelText(/loading weather data/i)).toBeInTheDocument()
  })

  test('displays error message when there is an error', () => {
    const errorStore = mockStore({
      weather: {
        loading: false,
        weather: null,
        error: 'Unable to fetch weather data',
      },
    })
    render(
      <Provider store={errorStore}>
        <WeatherApp />
      </Provider>
    )
    expect(screen.getByRole('alert')).toHaveTextContent(/unable to fetch weather data/i)
  })

  test('displays weather tile when weather data is available', () => {
    const weatherData = {
      current: {
        dt: 1729956032,
        main: {
          temp: 20,
        },
        weather: [{ description: 'clear sky', icon: '01d' }],
        name: 'Test City',
      },
      forecast: [],
    }
    const weatherStore = mockStore({
      weather: {
        loading: false,
        weather: weatherData,
        error: null,
      },
    })
    render(
      <Provider store={weatherStore}>
        <WeatherApp />
      </Provider>
    )
    expect(screen.getByText(/test city/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/temperature: 20 degrees celsius/i)).toBeInTheDocument()
  })
})
