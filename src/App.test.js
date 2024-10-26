import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'

describe('App Component', () => {
  test('renders WeatherApp within Provider', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const inputElement = getByLabelText(/enter location to search for weather/i)
    expect(inputElement).toBeInTheDocument()
  })

  test('renders the search button', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const buttonElement = getByRole('button', { name: /search/i })
    expect(buttonElement).toBeInTheDocument()
  })
})
