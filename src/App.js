import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import WeatherApp from './components/weatherApp/WeatherApp'

const App = () => {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  )
}

export default App
