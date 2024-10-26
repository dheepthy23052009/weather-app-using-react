import axios from 'axios'

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST'
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS'
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE'

const API_KEY = '20816a5e230b2e0e89da82ac22a9ab10'

export const fetchWeather = (location) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_WEATHER_REQUEST })

    try {
      const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`)

      dispatch({
        type: FETCH_WEATHER_SUCCESS,
        payload: {
          current: currentWeatherResponse.data,
          forecast: forecastResponse.data.list,
        },
      })
    } catch (error) {
      dispatch({
        type: FETCH_WEATHER_FAILURE,
        payload: error?.response?.data?.message,
      })
    }
  }
}
