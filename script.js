const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const title = document.getElementById("list-title")
const listElements = document.getElementsByTagName("li")

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
        saveData()
    }else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
}

listContainer.addEventListener("click", updateEntryState, false)

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

