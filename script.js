const mainContainer = document.getElementById("main-container")
const addNewList = document.getElementById("add-new-list")

function addTask(e){

    let relativeTodoAppContainer = e.target.parentElement.parentElement
    let relativeListContainer = relativeTodoAppContainer.querySelector(".list-container")
    let relativeInputBox = relativeTodoAppContainer.querySelector(".row").querySelector(".list-input")

    if(relativeInputBox.value === ""){
        alert("Write a task")
    }else{

        // create custom list element container
        let customListElement = document.createElement("div")
        customListElement.setAttribute("class", "custom-list-element")
        customListElement.setAttribute("onclick", "updateEntryState(event)")

        // create list element to be appended inside of custom list element
        let listElement = document.createElement("li")
        listElement.innerHTML = relativeInputBox.value

        // add span tag with X mark
        let span = document.createElement("span")
        span.innerHTML = "\u00d7"

        // append newly created elements to customListElement
        customListElement.appendChild(listElement)
        customListElement.appendChild(span)

        //append newly created custom list element to the list container
        relativeListContainer.appendChild(customListElement)
    }

    // clear the input field
    relativeInputBox.value = ""
    saveData()
}

function updateEntryState(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked")
        
        let relativeTodoAppContainer = e.target.parentElement.parentElement.parentElement

        let finishedItemsContainer = relativeTodoAppContainer.querySelector(".finished-items-container")
        let listContainer = relativeTodoAppContainer.querySelector(".list-container")

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

function saveData(){
    localStorage.setItem(
        "data",
        mainContainer.innerHTML
    )
}

function loadData(){
    let savedData = localStorage.getItem("data")

    if(savedData != null){
        mainContainer.innerHTML = savedData
    }
    
    return
}


function createTodoContainer(e){

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
    addButton.setAttribute("onclick", "addTask(event)")
    addButton.innerHTML = "Add"

    listInputContainer.appendChild(listInput)
    listInputContainer.appendChild(addButton)

    //create finished items container
    let finishedItemsContainer = document.createElement("ul")
    finishedItemsContainer.setAttribute("class", "finished-items-container")

    // create list container for unfinished tasks
    let listContainer = document.createElement("ul")
    listContainer.setAttribute("class", "list-container")

    // append new elements to todoApp 
    todoApp.appendChild(listTitle)
    todoApp.appendChild(listInputContainer)
    todoApp.appendChild(finishedItemsContainer)
    todoApp.appendChild(listContainer)

    mainContainer.insertBefore(todoApp, mainContainer.lastElementChild)

}

addNewList.addEventListener("click", createTodoContainer, false)

loadData()