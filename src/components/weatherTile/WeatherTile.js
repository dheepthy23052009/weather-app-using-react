import React from 'react'
import './weather-tile.css'

const WeatherTile = ({ weather, isCurrent }) => {
  const { main, weather: weatherInfo, name } = weather
  const iconUrl = `http://openweathermap.org/img/wn/${weatherInfo[0].icon}@2x.png`

  const formatDate = () => {
    const date = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString(undefined, options)
  }

  const formatDescription = (desc) => desc.split(' ').map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')

  return (
    <div className="weather-tile" role="region" aria-label={`Weather tile for ${name}`}>
      <h2>{name}</h2>
      <p aria-label={`Date: ${formatDate()}`}>{formatDate()}</p>
      <img src={iconUrl} alt={weatherInfo[0].description} />
      <p aria-label={`Temperature: ${main.temp} degrees Celsius`}>{main.temp}°C</p>
      <p aria-label={`Weather condition: ${formatDescription(weatherInfo[0].description)}`}>{formatDescription(weatherInfo[0].description)}</p>
    </div>
  )
}

export default WeatherTile
