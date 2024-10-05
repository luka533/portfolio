"use strict"

document.addEventListener("DOMContentLoaded", () => {

  const display = document.querySelector(".display")
  const keyNumbers = document.querySelectorAll(".calc-button")

  for(const keyNumber of keyNumbers) {
    keyNumber.addEventListener("click", (event) => {

        //if delete all button is clicked ("AC")
      if(event.target.dataset.value === "AC") {
        display.value = ""
      } //if delete single number is clicked ("DEL")
      else if(event.target.dataset.value === "DEL") {
          display.value = display.value.toString().slice(0, -1)
      } //if result is clicked ("=")
      else if(event.target.dataset.value === "=") {
          try {
            if(display.value !== "") {
              display.value = eval(display.value)
            }
          } catch(error) {
              display.value = "error"
          }
      }//if a number or operation is clicked
      else {
        display.value.toString()
          if(display.value.length <= 10) {
            console.log(event.target.dataset.value)
            display.value += event.target.dataset.value
          } else {
            display.value = "TOO LONG"
          }
      }
    })
  }
})

//eval is dangerous code but is in this case usable because the only inputs are numbers