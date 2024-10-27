import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWeather } from "../../store/actions/weatherActions"
import { ClipLoader } from "react-spinners"
import WeatherTile from "../weatherTile/WeatherTile"
import "./weather-app.css"

const WeatherApp = () => {
  const [location, setLocation] = useState("")
  const [showForecast, setShowForecast] = useState(false)
  const [selectedDateForecast, setSelectedDateForecast] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const dispatch = useDispatch()
  const { loading, weather, error } = useSelector((state) => state.weather)

  const handleSearch = () => {
    if (location) {
      dispatch(fetchWeather(location))
      setShowForecast(false)
      setSelectedDateForecast(null)
      setSelectedDate(null)
    }
  }

  const handleShowForecast = () => {
    setShowForecast(true)
  }

  const getDailyForecast = (forecast) => {
    const dailyForecastMap = {}
    forecast.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString()
      if (!dailyForecastMap[date]) {
        dailyForecastMap[date] = []
      }
      dailyForecastMap[date].push(item)
    })
    return dailyForecastMap
  }

  const handleDateClick = (date, forecastForDay) => {
    setSelectedDate(date)
    setSelectedDateForecast(forecastForDay)
  }

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <label htmlFor="location-search" className="visually-hidden">Location Search</label>
        <input
          type="text"
          id="location-search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter City/State/Country"
          aria-label="Enter location to search for weather"
        />
        <button className="forecast-button" onClick={handleSearch} aria-label="Search">
          Search
        </button>
      </div>
      {loading ? (
        <ClipLoader size={50} color={"#123abc"} loading={loading} aria-label="Loading weather data" />
      ) : error ? (
        <div role="alert" aria-live="assertive">{error}</div>
      ) : weather ? (
        <div className="weather-container">
          <WeatherTile weather={weather.current} isCurrent={true} />

          {!showForecast && (
            <button className="forecast-button" onClick={handleShowForecast} aria-label="Show next week's forecast">
              Next Week's Forecast
            </button>
          )}

          {showForecast && (
            <>
              <div className="forecast-tile-container" role="list">
                {Object.entries(getDailyForecast(weather.forecast)).map(
                  ([date, forecastForDay], index) => (
                    <div
                      key={index}
                      role="button"
                      tabIndex="0"
                      className={`forecast-tile ${
                        selectedDate === date ? "active" : ""
                      }`}
                      onClick={() => handleDateClick(date, forecastForDay)}
                      onKeyDown={(e) => e.key === "Enter" && handleDateClick(date, forecastForDay)}
                      aria-label={`Forecast for ${date}`}
                      aria-pressed={selectedDate === date}
                    >
                      <p>{date}</p>
                    </div>
                  )
                )}
              </div>
              <div className="forecast-tile-label" role="status" aria-live="polite">
                Click on the tile to know the weather forecast of each day
              </div>
            </>
          )}

          {selectedDateForecast && (
            <div className="selected-forecast-container-horizontal" role="list">
              {selectedDateForecast.map((item, index) => (
                <div key={index} role="listitem" className="forecast-tile-horizontal">
                  <p>
                    {new Date(item.dt_txt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <WeatherTile weather={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div role="status" aria-live="polite">Please search for a location</div>
      )}
    </div>
  )
}

export default WeatherApp
