"use strict"

document.addEventListener("DOMContentLoaded", () => {
  //hamburgerMenu section
  const headerNavList = document.querySelector(".header__navbar-list-menu-toggle")

  const whiteHamburgIcon = document.querySelector(".header__navbar-hamburger-icon-white")
  const blackHamburgerIcon = document.querySelector(".header__navbar-hamburger-icon")

  const hamburgerCloseIcon = document.querySelector(".header__navbar-list-close")

  const hamburgerIconCheckbox = document.querySelector(".header__navbar-hamburger-icon-checkbox")

  hamburgerIconCheckbox.addEventListener("click", () => {
      headerNavList.classList.add("header__navbar-list-menu-toggle-clicked")
      
      hamburgerCloseIcon.addEventListener("click", () => {
        headerNavList.classList.remove("header__navbar-list-menu-toggle-clicked")
      })
  })


  //darkmode section
  const darkmodeButton = document.querySelector(".checkbox")

  darkmodeButton.addEventListener("change", () => {
    if(darkmodeButton.checked) {
      document.documentElement.style.setProperty("--color-primary", "rgb(128, 188, 225)")
      document.documentElement.style.setProperty("--white", "rgb(210, 210, 210)")
      document.documentElement.style.setProperty("--black", "rgb(130, 130, 130)")
      document.body.style["color"] = "rgb(220, 220, 220)"
      document.body.style["background-color"] = "rgb(26, 26, 46)"

      //make the white hamburgerMenu appear and the black one disappear
      whiteHamburgIcon.style["display"] = "initial"
      blackHamburgerIcon.style["display"] = "none"
    } else {
      document.documentElement.style.setProperty("--color-primary", "rgb(158, 218, 255)")
      document.documentElement.style.setProperty("--white", "rgb(255, 255, 255)")
      document.documentElement.style.setProperty("--black", "rgb(0, 0, 0)")
      document.body.style["color"] = "initial"
      document.body.style["background-color"] = "initial"

      //make the white hamburgerMenu disappear and the black one appear just like before
      whiteHamburgIcon.style["display"] = "none"
      blackHamburgerIcon.style["display"] = "initial"
    }
  })
})