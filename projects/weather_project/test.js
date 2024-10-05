"use strict"


document.addEventListener("DOMContentLoaded", () => {

  const API_KEY = "32e5f22a3a8e44df6e48279c1df97100"

  const input = document.querySelector(".location-input")
  

  const submit = document.querySelector(".location-submit")

  const card = document.querySelector(".card")
  
  //const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`


  submit.addEventListener("click", () => {
    const cityInput = input.value
    const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + API_KEY 

    fetch(API_URL)
      .then((result) => {
        return result.json()
      })
      .then((result) => {
        console.log(result)

        const cityName = result.name
        const cityTemp = result.main.temp
        const citySky = result.weather[0].description
        const cityWeatherIcon = result.weather[0].id

        displayData(cityName, cityTemp, citySky, cityWeatherIcon)
      })
      .catch((err) => {
        cityName = "Error"
        console.error(err)
      })

      function displayData(cityName, cityTemp, citySky, cityWeatherIcon) {
        const cityNameElement = document.createElement("h1")
        const cityTempElement = document.createElement("p")
        const citySkyElement = document.createElement("p")
        const cityWeatherIconElement = document.createElement("p")

        cityNameElement.classList.add("card__location")
        cityTempElement.classList.add("card__temp")
        citySkyElement.classList.add("card__sky")
        cityWeatherIconElement.classList.add("card__icon")

        cityNameElement.innerText = cityName
        cityTempElement.innerText = cityTemp
        citySkyElement.innerText = citySky
        cityWeatherIconElement.innerText = cityWeatherIcon


        card.style["display"] = "initial"

        card.appendChild(cityNameElement)
        card.appendChild(cityTempElement)
        card.appendChild(citySkyElement)
        card.appendChild(cityWeatherIconElement)
        
      }


      /* example of the html structure
      <h1 class="card__location">Cuxhaven</h1>
      <p class="card__temp">22*</p>
      <p class="card__sky">rainy</p>
      <p class="card__icon">☁️</p>
      */
  })

  // it should also appear
  

})