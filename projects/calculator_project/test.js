"use strict"

document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".display")
  const buttons = document.querySelectorAll(".calc-button")

  for(const button of buttons) {
    button.addEventListener("click", (event) => {
      let calcValue = event.target.dataset.value

      if(calcValue === "=") {
        //calculates the value chains
        try {
          display.value = eval(display.value)
        } catch(error) {
          display.value = "ERROR"
        }
      } else if(calcValue === "AC") {
        //deletes all
        display.value = ""
      } else if(calcValue === "DEL") {
        //deletes single letters
        display.value = display.value.slice(0, -1)
      } else {
        //chains the values together and also prevents it from being too long
        if(display.value.length < 10) {
          display.value = display.value + calcValue
        } else {
          display.value = "TOO LONG"
        }
      }
      
    })
  }
})