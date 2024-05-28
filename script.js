const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const listElements = document.getElementsByTagName("li")
const finishedItemsContainer = document.getElementById("finished-items-container")
const mainContainer = document.getElementById("main-container")
const addNewList = document.getElementById("add-new-list")

console.log(mainContainer.lastElementChild)

function addTask(e){
    if(inputBox.value === ""){
        alert("Write a task")
    }else{

        // create custom list element container
        let customListElement = document.createElement("div")
        customListElement.setAttribute("class", "custom-list-element")

        // create list element to be appended inside of custom list element
        let listElement = document.createElement("li")
        listElement.innerHTML = inputBox.value

        // add span tag with X mark
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"

        // append newly created elements to customListElement
        customListElement.appendChild(listElement)
        customListElement.appendChild(span)

        //append newly created custom list element to the list container
        listContainer.appendChild(customListElement)
    }

    // clear the input field
    inputBox.value = ""
    saveData()
}

function updateEntryState(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        
        let elementToTransfer = e.target.parentElement
        if(e.target.classList.contains("checked")){
            finishedItemsContainer.insertBefore(elementToTransfer, finishedItemsContainer.firstChild)
        }else{
            listContainer.append(elementToTransfer)
        }

        saveData()
    }else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}

listContainer.addEventListener("click", updateEntryState, false)
finishedItemsContainer.addEventListener("click", updateEntryState, false)

function saveData(){
    localStorage.setItem(
        "data",
        listContainer.innerHTML
    )
}

function loadData(){
    listContainer.innerHTML = localStorage.getItem("data")
}

loadData()


function createTodoContainer(e){

    console.log(e.target.id)
    // this function creates another todo-app div
    let todoApp = document.createElement("div")
    todoApp.setAttribute("class", "todo-app")

    let listTitle = document.createElement("input")
    listTitle.setAttribute("class", "list-title")
    listTitle.setAttribute("value", "To Do List")

    let listInputContainer = document.createElement("div")
    listInputContainer.setAttribute("class", "row")

    // elements to be appended inside listInputContainer
    let listInput = document.createElement("input")
    listInput.setAttribute("class", "list-input")
    listInput.setAttribute("type", "text")
    listInput.setAttribute("placeholder", "Add your task")

    let addButton = document.createElement("button")
    addButton.setAttribute("onclick", "addTask()")
    addButton.innerHTML = "Add"

    listInputContainer.appendChild(listInput)
    listInputContainer.appendChild(addButton)

    // append new elements to todoApp 
    todoApp.appendChild(listTitle)
    todoApp.appendChild(listInputContainer)

    mainContainer.insertBefore(todoApp, mainContainer.lastElementChild)

}

addNewList.addEventListener("click", createTodoContainer, false)