"use strict"

document.addEventListener("DOMContentLoaded", () => {

  //It's better to use event.key instead of event.keyCode because it's deprecated
  //const KEY_ENTER = 13

  const input = document.querySelector(".todo-input")
  const submit = document.querySelector(".todo-submit")
  const todoContainer = document.querySelector(".todo-container")
  const deleteAllButton = document.querySelector(".todo-delete-All")

  let todoCounter = 0


  submit.addEventListener("click", (event) => {
    addTodo()
  })

  input.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
      addTodo()
    }
  })

  //adds todos
  function addTodo() {
    if(input.value !== "") {
      const todoDivElement = document.createElement("div")
      const todoParagraphElement = document.createElement("p")
      const editButtonElement = document.createElement("input")

      const todoDeleteButtonElement = document.createElement("button")

      todoDivElement.classList.add("todo")
      todoParagraphElement.classList.add("todo-paragraph")
      editButtonElement.classList.add("todo-edit-checkbox")
      todoDeleteButtonElement.classList.add("todo-delete-button")

      todoParagraphElement.innerText = input.value
      todoDeleteButtonElement.innerText = "x"

      todoParagraphElement.setAttribute("contentEditable", false)
      todoParagraphElement.setAttribute("maxlength", "15")
      editButtonElement.type = "checkbox"
    
      todoDivElement.appendChild(todoParagraphElement)
      todoDivElement.appendChild(todoDeleteButtonElement)
      todoDivElement.appendChild(editButtonElement)


      todoContainer.appendChild(todoDivElement)

      input.value = ""

      //removes single todos
      document.addEventListener("click", (event) => {
        if(event.target === todoDeleteButtonElement) {
          todoDeleteButtonElement.parentElement.remove()

          todoCounter--
          todoCounting(todoCounter)

          //when the last todo is removed manually updates the deleteAllButton
          deleteAllButtonAppearance()
        }
      })

      // when the checkbox is checked the todoParagraphElement is editable 
      editButtonElement.addEventListener("change", (event) => {
        if(editButtonElement.checked) {
          todoParagraphElement.setAttribute("contentEditable", true);
          todoParagraphElement.focus()
        } else{
          todoParagraphElement.setAttribute("contentEditable", false);
        }
      })

      //when enter is pressed no breakpoint will happen and the focus of the input gets removed + the editButtonElement gets unchecked and the attribute also changes
      todoParagraphElement.addEventListener("keydown", (event) => {
        if(event.key === "Enter") {
          event.preventDefault()
          todoParagraphElement.blur();
          editButtonElement.checked = false
          todoParagraphElement.setAttribute("contentEditable", false)

          //removes todo when the innerText is set at ""
          if(todoParagraphElement.innerText === "") {
            todoParagraphElement.parentElement.remove()

            //updates the todoCounter when todo gets deleted due to being ""
            todoCounter--
            todoCounting(todoCounter)

            //updates the todoDeleteAllButton when todo gets deleted due to being ""
            deleteAllButtonAppearance()

          }
        }

        //when the letter limit of 15 is reached every new character is getting deleted
        if (todoParagraphElement.innerText.length > 15) {
          todoParagraphElement.innerText = todoParagraphElement.innerText.slice(0, -1)
        }

      })

      //when todo is added todoCounter is increased by 1
      todoCounter++
      todoCounting(todoCounter)
    }

    //when first todo is added makes the deleteAllButton appear
    deleteAllButtonAppearance()
  }

  //removes all todos inside todoContainer
  deleteAllButton.addEventListener("click", () => {
    todoContainer.innerHTML = ""

    todoCounter = 0
    todoCounting(todoCounter)

    //when all todos are removed make the deleteAllButton disappear
    deleteAllButtonAppearance()
  })

  //calls the function which sets the todoCounterParagraphElement display property on "none"
  todoCounting(todoCounter)

  
  //the deleteAllButton appears when atleast 1 todo is added
  function deleteAllButtonAppearance() {
    if(todoContainer.children.length >= 1) {
      deleteAllButton.style["display"] = "block"
    } else if(todoContainer.children.length <= 0){
      deleteAllButton.style["display"] = "none"
    } else {
      console.log("Error")
    }
  }

  function todoCounting(todoCounter) {
    const todoCounterElement = document.querySelector(".todo-counter")
    const todoCounterParagraphElement = document.querySelector(".todo-counter-paragraph")
  
    todoCounterElement.innerText = todoCounter
  
    if(todoContainer.children.length >= 1) {
      todoCounterParagraphElement.style["display"] = "inline-block"
    } else if(todoContainer.children.length <= 0){
      todoCounterParagraphElement.style["display"] = "none"
    } else {
      console.log("Error")
    }
  }

})