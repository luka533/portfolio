"use strict"

document.addEventListener("DOMContentLoaded", () => {

  const ENTER_KEY = 13;

  const card = document.querySelector(".card")
  const input = document.querySelector(".location-input")
  const submit = document.querySelector(".location-submit")
  const apiKey = "32e5f22a3a8e44df6e48279c1df97100"

  function weatherInfoWithErrorCatching() {
    const userInput = input.value
    
    if(!userInput) {
      console.error("Type a city name")
    } else {
      getWeatherInfo(userInput)
    }
    

    function getWeatherInfo(city) {
      //https://api.openweathermap.org/data/2.5/weather?q=Miami&appid=32e5f22a3a8e44df6e48279c1df97100
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  
      fetch(apiUrl)
        .then((result => {
          return result.json()
        }))
        .then((res) => {
          displayData(res)

          input.value = ""
        })
        .catch((error) => {
          console.error( `${userInput} was not found! ${error}`)
          displayError(`${userInput} was not found!`)
        });
    }

  }

  submit.addEventListener("click", (event) => {
    weatherInfoWithErrorCatching()
  })

  input.addEventListener("keydown", (event) => {
    if(event.keyCode === ENTER_KEY) {
      weatherInfoWithErrorCatching()
    }
  })


  function displayData(weatherInfo) {
    card.innerHTML = ""
    card.style.display = "flex"

    const cardLocationElement = document.createElement("h1")
    cardLocationElement.classList.add("card__location")
    cardLocationElement.innerText = weatherInfo.name

    //prevents that a text of "undefined" is created in the h1
    if(weatherInfo.name) {
      card.appendChild(cardLocationElement)
    }

    const cardTempElement = document.createElement("p")
    cardTempElement.classList.add("card__temp")
    const tempIntoCelsius = (weatherInfo.main.temp - 273.15)
    cardTempElement.innerText = tempIntoCelsius.toFixed(1) + "°C"
    card.appendChild(cardTempElement)

    const cardSkyElement = document.createElement("p")
    cardSkyElement.classList.add("card__sky")
    cardSkyElement.innerText = weatherInfo.weather[0].description
    card.appendChild(cardSkyElement)

    const cardIconElement = document.createElement("p")
    cardIconElement.classList.add("card__icon")
    cardIconElement.innerText = displayWeatherIcon(weatherInfo.weather[0].id)
    card.appendChild(cardIconElement)

    // just for appearance when the weather is displayed the location-card gets its own border so that the border isn't twice its size (card-border + location-card-border)
    const locationCardElement = document.querySelector(".location-card")
    locationCardElement.style["border-bottom"] = "1px solid black"
  }

  function displayWeatherIcon(id) {

    if(id >= 200 && id <= 299) {
      return "🌩";
    } else if(id >= 300 && id <= 399) {
      return "☔";
    }
    else if(500 && id <= 599) {
      return "🌧️";
    }
    else if(600 && id <= 699) {
      return "❄️";
    }
    else if(700 && id <= 799) {
      return "🌫️";
    }
    else if(id === 800) {
      return "☀️";
    }
    else if(id >= 801 && id <= 804) {
      return "☁️";
    } else {
      return "Something went wrong"
    }
  }

  function displayError(failed) {
    const cardLocationElement = document.createElement("h1")
    cardLocationElement.classList.add("card__location")
    cardLocationElement.innerText = failed
    card.appendChild(cardLocationElement)
  }

})