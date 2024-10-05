"use strict"


document.addEventListener("DOMContentLoaded", () => {


//hamburgerMenu section

  const hamburgerIconCheckbox = document.querySelector(".header__hamburger-menu-toggle-checkbox")
  const hamburgerMenu = document.querySelector(".header__list-hamburger-menu")
  const hamburgerMenuClose = document.querySelector(".header__hamburger-close")

  const hamburgerMenuListItems = document.querySelectorAll(".header__list-item-hamburger-menu")

  //when the hamburgerIcon is clicked the hamburgerMenu is opened
  hamburgerIconCheckbox.addEventListener("change", () => {
    if(hamburgerIconCheckbox.checked) {
      hamburgerMenu.classList.add("header__list-hamburger-menu-move")
      hamburgerMenu.style["display"] = "block"
    } else if(!hamburgerIconCheckbox.checked){
      console.log("unchecked")
      hamburgerMenu.classList.remove("header__list-hamburger-menu-move")
      hamburgerMenu.style["display"] = "none"
    }
  })

  //when hamburgerMenuListItem is clicked the page scrolls to the clicked section
  for(const hamburgerMenuListItem of hamburgerMenuListItems) {
    hamburgerMenuListItem.addEventListener("click", () => {
      console.log("unchecked")
      hamburgerMenu.classList.remove("header__list-hamburger-menu-move")
      hamburgerMenu.style["display"] = "none"
    })
  }


//workout section

  //input for exercise details
  const exerciseInput = document.querySelector(".workout__exercise-input")
  const setsInput = document.querySelector(".workout__sets-input")
  const repsInput = document.querySelector(".workout__reps-input")

  // the parent for the created Elements
  const workoutContainer = document.querySelector(".workout__container")

  // workout submit button
  const workoutSubmit = document.querySelector(".workout__add-exercise")

  workoutSubmit.addEventListener("click", () => {

    if(exerciseInput.value === "" || setsInput.value === "" || repsInput.value === "") {
      alert("Please fill the whole plan")

      //resets the input values
      exerciseInput.value = ""
      setsInput.value = ""
      repsInput.value = ""
      return
    }

    //console.log(userExerciseInput, userSetsInput, userRepsInput)

    addExercises(exerciseInput.value, setsInput.value, repsInput.value)

    //resets the input values
    exerciseInput.value = ""
    setsInput.value = ""
    repsInput.value = ""
  })

  function addExercises(exercise, sets, reps) {
    const workoutElement = document.createElement("div")

    const exerciseElement = document.createElement("p")
    const setsElement = document.createElement("p")
    const repsElement = document.createElement("p")
    const deleteElement = document.createElement("button")

    workoutElement.classList.add("workout__elements")

    exerciseElement.classList.add("workout__exercise")
    setsElement.classList.add("workout__exercise-sets")
    repsElement.classList.add("workout__exercise-reps")

    //Just for BEM styles
    deleteElement.classList.add("button")
    deleteElement.classList.add("button--smaller")
    //normal styling class
    deleteElement.classList.add("workout__exercise-delete")

    exerciseElement.innerText = "exercise: " + exercise
    setsElement.innerText = "sets: " + sets
    repsElement.innerText = "reps: " + reps
    deleteElement.innerText = "delete"

    workoutElement.appendChild(exerciseElement)
    workoutElement.appendChild(setsElement)
    workoutElement.appendChild(repsElement)
    workoutElement.appendChild(deleteElement)

    workoutContainer.appendChild(workoutElement)

    deleteElement.addEventListener("click", deleteExercise)

  }

  function deleteExercise() {
    this.parentElement.remove()
    deleteData(workoutElement)
  }


//timer section
  const timerStartButton = document.querySelector(".timer__start")
  const timerStopButton = document.querySelector(".timer__stop")
  const timerResetButton = document.querySelector(".timer__reset")

  const display = document.querySelector(".timer__countdown")

  let hours = 0
  let minutes = 0
  let seconds = 0
  let milliseconds = 0

  let timer = null


  timerStartButton.addEventListener("click", timerStart)
  timerStopButton.addEventListener("click", timerStop)
  timerResetButton.addEventListener("click", timerReset)


  function timerStart() {
    timer = setInterval(timerDisplay, 10)
  }


  function timerStop() {
    clearInterval(timer)
  }

  function timerReset() {
    clearInterval(timer)
     hours = 0
     minutes = 0
     seconds = 0
     milliseconds = 0

     display.innerText = "00:00:00:000"
  }

  function timerDisplay() {
    milliseconds += 10

    if(milliseconds === 1000) {
      milliseconds = 0
      seconds++

      if(seconds === 60) {
        seconds = 0
        minutes++

        if(minutes === 60) {
          minutes = 0
          hours++
        }
      }
    }

    let h = hours <= 10 ? "0" + hours : hours
    let m = minutes <= 10 ? "0" + minutes : minutes
    let s = seconds <= 10 ? "0" + seconds : seconds

    let ms = milliseconds <= 100 ? "0" + milliseconds : milliseconds

    display.innerText = `${h}:${m}:${s}:${ms}`
  }




//bmi section

  //const bmiAge = document.querySelector(".bmi__input-age")
  const bmiWeight = document.querySelector(".bmi__input-weight")
  const bmiHeigth = document.querySelector(".bmi__input-heigth")

  const bmiInputs = document.querySelectorAll(".bmi__input")

  const bmiCalculateButton = document.querySelector(".bmi-calculate")

  // bmi = weight / height^2
  // heigth^2 = (height * height)
  const bmiResult = document.querySelector(".bmi__result")

  const bmiHealthText = document.querySelector(".bmi__health")

  bmiLetterReplacement()

  function bmiLetterReplacement() {
    for(const bmiInput of bmiInputs) {
      bmiInput.addEventListener("keypress", () => {
        bmiInput.value = bmiInput.value.replace(",", ".")
        
        bmiInput.value = bmiInput.value.replace(/[a-zA-Z]/g, "");
      })
    }
  }
  
  
  bmiCalculateButton.addEventListener("click", () => {
    //const bmi = bmiWeight.value / (bmiHeigth.value * bmiHeigth.value)
    
    // allows to type in cm 
    //height is divided by 100 and then multiplied by two
    // e.g 175cm / 100 = 1.75m and then 1.75m * 2 = 3.5 and then divided by the weigth
    const bmi = bmiWeight.value / ((bmiHeigth.value / 100) * 2)

    //resets the input and guides the user to type a number
    if(!(bmi >= 0)) {
      console.log("HALLO")
      alert("Please enter your only numbers")
      bmiWeight.value = ""
      bmiHeigth.value = ""
      return
    }

    bmiResult.innerText = "Your Body-Mass-Index is: " + bmi.toFixed(1)
    bmiHealth(bmi)
    
    
  })

  function bmiHealth(bmi) {
    let health = ""

    if(bmi <= 18.5) {
      console.log("Underweight")
      health = "underweigth"
      bmiHealthText.style["color"] = "red"
    } else if(bmi <= 24.9) {
      console.log("Normal")
      health = "normal"
      bmiHealthText.style["color"] = "green"
    } else if(bmi <= 29.9) {
      console.log("Overweigth")
      health = "overweight"
      bmiHealthText.style["color"] = "red"
    } else if(bmi >= 30) {
      console.log("Obesity")
      health = "obese"
      bmiHealthText.style["color"] = "darkred"

    } else {
      return
    }
    
    // source: https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm#:~:text=BMI%20is%20an%20estimate%20of,breathing%20problems%2C%20and%20certain%20cancers.
    bmiHealthText.innerText = "You are in the " + health + " range!"
  }


//motivation section

  const motivationalQuote = document.querySelector(".motivational__quote")
  const motivationalQuoteAuthor = document.querySelector(".motivational__quote-author")
  const motivationalQuoteButton = document.querySelector(".motivational__quote-generator")

  quoateGenerator()

  motivationalQuoteButton.addEventListener("click", quoateGenerator)

  function quoateGenerator() {
    // local json file
    //need to go out of the directory for it to work when loading the website from portfolio.html
      fetch("../../projects/gym_project/gym-quotes.json")
      .then((result) => {
        return result.json()
      })
      .then((data) => {
        const dataIndex = Math.floor(Math.random() * data.length)
        const quote = data[dataIndex]
        motivationalQuote.innerText = `"${quote.quote}"`
        motivationalQuoteAuthor.innerText = "~ " +  quote.author
        //console.log(quote)
      })
      .catch(e => {
          console.log("Somethign went wrong")
      })
      }
   
  })