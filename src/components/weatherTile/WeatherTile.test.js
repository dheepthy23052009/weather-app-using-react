import React from 'react'
import { render, screen } from '@testing-library/react'
import WeatherTile from './WeatherTile'

describe('WeatherTile Component', () => {
  const mockWeather = {
    main: { temp: 20 },
    weather: [{ description: 'clear sky', icon: '01d' }],
    name: 'London',
  }
  test('renders the weather tile with location name', () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    expect(screen.getByRole('heading', { name: /London/i })).toBeInTheDocument()
  })

  test('displays the correct date', () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date().toLocaleDateString(undefined, dateOptions)
    expect(screen.getByText(formattedDate)).toBeInTheDocument()
  })

  test('displays the temperature in degrees Celsius', () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    expect(screen.getByText(/20°C/i)).toBeInTheDocument()
  })

  test('displays the weather description with proper formatting', () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    expect(screen.getByText(/Clear Sky/i)).toBeInTheDocument()
  })

  test('renders an icon with the correct alt text', async () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    const icon = await screen.findByRole('img')
    expect(icon).toHaveAttribute('alt', 'clear sky')
    expect(icon).toHaveAttribute('src', expect.stringContaining(mockWeather.weather[0].icon))
  })

  test('sets aria-label attributes for accessibility', () => {
    render(<WeatherTile weather={mockWeather} isCurrent={true} />)
    expect(screen.getByLabelText(/Weather tile for London/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Temperature: 20 degrees Celsius/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Weather condition: Clear Sky/i)).toBeInTheDocument()
  })
})
