describe("WeatherApp Component", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000")
    })
  
    it("should display the search input and button", () => {
      cy.get('input[aria-label="Enter location to search for weather"]').should("be.visible")
      cy.get('button[aria-label="Search"]').should("be.visible").and("contain", "Search")
    })

    it("should show a loading spinner when fetching weather data", () => {
        cy.get('input[aria-label="Enter location to search for weather"]').type("New York")
        cy.get('button[aria-label="Search"]').click()
        cy.get('[aria-label="Loading weather data"]').should("be.visible")
    })

    it("should display an error message if the weather data fetch fails", () => {
        cy.intercept("GET", "**/weather*", { statusCode: 404, body: { message: "City not found" } })
        cy.get('input[aria-label="Enter location to search for weather"]').type("UnknownCity")
        cy.get('button[aria-label="Search"]').click()
        cy.get('[role="alert"]').should("contain", "City not found")
    })

    it("should show the forecast button after fetching weather data", () => {
        cy.get('input[aria-label="Enter location to search for weather"]').type("New York")
        cy.get('button[aria-label="Search"]').click()
        cy.get(".forecast-button").contains("Next Week's Forecast").first().click()
    })

    it("should display forecast tiles when the forecast button is clicked", () => {
        cy.get('input[aria-label="Enter location to search for weather"]').type("New York")
        cy.get('button[aria-label="Search"]').click()
        cy.get(".forecast-button").contains("Next Week's Forecast").click()
        cy.get(".forecast-tile").should("have.length.greaterThan", 0)
    })

    it("should show hourly forecast for selected date tile", () => {
        cy.get('input[aria-label="Enter location to search for weather"]').type("New York")
        cy.get('button[aria-label="Search"]').click()
        cy.get(".forecast-button").contains("Next Week's Forecast").click()
        cy.get(".forecast-tile").first().click()
        cy.get(".forecast-tile-horizontal").should("have.length.greaterThan", 0)
    })      
  })
  