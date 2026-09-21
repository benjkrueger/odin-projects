let is_farenheit = true

async function get_weather_data(search_string) {
    try {
        const encoded = encodeURIComponent(search_string)
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encoded}?unitGroup=us&include=current&key=297EYLW6NAWV2EZ3BMW9QD5X9&contentType=json`
        const response = await (await fetch(url)).json()
        //console.log(response)
        return response
    } catch (error) {
        return {currentConditions:""}
    }
}

function f_to_c(temp) {
    return ((temp - 32) * (5/9)).toFixed(1)
}
function m_to_km(mph) {
    return (1.60934*mph).toFixed(1)
}

function make_p(div, text_content) {
    const p = document.createElement("p")
    p.textContent = text_content
    div.appendChild(p)
}

function generate_content(conditions) {
    if (conditions === "") {return}
    const content = document.getElementById("content")
    content.replaceChildren()
    make_p(content, `Location: ${text.value}`)
    make_p(content, `Conditions: ${conditions.conditions}`)
    make_p(content, `Temperature: ${is_farenheit ? conditions.temp : f_to_c(conditions.temp)} ${is_farenheit ? "°F" : "°C"}`)
    make_p(content, `Percipitation: ${conditions.precipprob}%`)
    make_p(content, `Humidity: ${conditions.humidity}%`)
    make_p(content, `Wind: ${is_farenheit ? conditions.windspeed : m_to_km(conditions.windspeed)} ${is_farenheit ? "mph" : "km/h"}`)
    console.log(conditions)
}

async function fetch_and_generate_content() {
    const data = await get_weather_data(text.value)
    const currentConditions = data.currentConditions
    generate_content(currentConditions)
}

const text = document.getElementById("text-input")
text/addEventListener("keydown", (event) => {
    if (event.key === "Enter") {fetch_and_generate_content()}
})
const submitBtn = document.getElementById("submit")
submitBtn.addEventListener("click", fetch_and_generate_content)
const degreesBtn = document.getElementById("degrees")
degreesBtn.addEventListener("click", () => {
    is_farenheit = !is_farenheit
    degreesBtn.textContent = is_farenheit ? "°F" : "°C"
    fetch_and_generate_content()
})

fetch_and_generate_content()

/*
{
  "datetime": "12:40:00",
  "datetimeEpoch": 1784137200,
  "temp": 87.8,
  "feelslike": 94.2,
  "humidity": 58.8,
  "dew": 71.6,
  "precip": 0,
  "precipprob": 0,
  "snow": 0,
  "snowdepth": 0,
  "preciptype": null,
  "windgust": 11.2,
  "windspeed": 5.6,
  "winddir": 310,
  "pressure": 1018,
  "visibility": 9.9,
  "cloudcover": 25,
  "solarradiation": 586,
  "solarenergy": 2.1,
  "uvindex": 6,
  "conditions": "Partially cloudy",
  "icon": "partly-cloudy-day",
  "stations": [
    "KORD",
    "KMDW",
    "45198_maritime"
  ],
  "source": "obs",
  "sunrise": "05:29:11",
  "sunriseEpoch": 1784111351,
  "sunset": "20:24:06",
  "sunsetEpoch": 1784165046,
  "moonphase": 0.04
}

Chicago
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Chicago?unitGroup=us&key=297EYLW6NAWV2EZ3BMW9QD5X9&contentType=json

Madison, WI
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Madison%2C%20WI?unitGroup=us&key=297EYLW6NAWV2EZ3BMW9QD5X9&contentType=json

Calcutta
https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Calcutta?unitGroup=us&key=297EYLW6NAWV2EZ3BMW9QD5X9&contentType=json
*/