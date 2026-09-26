// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

const stateInput = document.querySelector("#state-input")
const fetchButton = document.querySelector("#fetch-alerts")
const alertsDisplay = document.querySelector("#alerts-display")
const errorMessage = document.querySelector("#error-message")

async function fetchWeatherAlerts(state) {//takes the state
  const response = await fetch(weatherApi + state)
  const data = await response.json()

  return data
}

function displayAlerts(data) {
  alertsDisplay.innerHTML = ""// clears out the old weather results.

  const summary = document.createElement("p")
  summary.textContent = `${data.title}: ${data.features.length}`
  alertsDisplay.appendChild(summary)

  data.features.forEach((alert) => {
  const headline = document.createElement("p")
  headline.textContent = alert.properties.headline
  alertsDisplay.appendChild(headline)
  })
}

fetchButton.addEventListener("click", async () => {
  const state = stateInput.value

  try {
    const data = await fetchWeatherAlerts(state)

    displayAlerts(data)

    errorMessage.textContent = ""
    errorMessage.classList.add("hidden")
  } catch (error) {
    errorMessage.textContent = error.message
    errorMessage.classList.remove("hidden")
  }

  stateInput.value = ""
});