const mainContainer = document.getElementById("main-container")
const optionsContainer = document.getElementById("options")

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

    let deleteAppBtn = document.createElement("span")
    deleteAppBtn.innerHTML = "x"
    deleteAppBtn.setAttribute("class", "delete-list-btn")
    deleteAppBtn.setAttribute("onclick", "deleteTodoContainer(event)")

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
    todoApp.appendChild(deleteAppBtn)
    todoApp.appendChild(listTitle)
    todoApp.appendChild(listInputContainer)
    todoApp.appendChild(finishedItemsContainer)
    todoApp.appendChild(listContainer)

    mainContainer.insertBefore(todoApp, mainContainer.lastElementChild)

}

function deleteTodoContainer(e){
    todoListContainer = e.target.parentElement.remove();
    saveData()
}

function toggleOptionsVisibility(e){
    optionsContainer.classList.toggle("invisible")
    e.target.classList.toggle("clicked")
}

loadData()

// modal scripts
const modal = document.getElementById("myModal")
const closeModalBtn = document.getElementById("close-modal-btn")

function openModal(){
    modal.style.display = "block";
    generateTable()
    generateEmailSubject()
}

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal content div, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function formatDate() {

    let date = Date().date
    const dayOfWeekFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });
    const fullDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const dayOfWeek = dayOfWeekFormatter.format(date).toUpperCase();
    const fullDate = fullDateFormatter.format(date);

    return `${dayOfWeek}<br>${fullDate}`;
}

function collectTodoListData() {
    const data = {
        day: formatDate(),
        tasks: []
    }
    const listTitles = document.getElementsByClassName("list-title")
    for (const element of listTitles){

        let finishedTasks = []
        let customListElements = element.parentElement
        .querySelector(".finished-items-container")
        .querySelectorAll(".custom-list-element")

        for (const customListElement of customListElements){
            finishedTasks.push(customListElement.querySelector("li").textContent)
        }
        
        if(finishedTasks.length > 0){
            data.tasks.push(
                {
                    project: element.value,
                    subtasks: finishedTasks
                }
            )
        }
    }   
    return data
}


function generateTable() {
    const data = collectTodoListData();
    const table = document.getElementById('generated-table');
    const totalSubtasks = data.tasks.reduce((sum, task) => sum + task.subtasks.length, 0);

    let html = '<tr><th colspan="3" style="margin: 10px auto; border: 1px solid black; border-collapse: collapse;">EOD REPORT</th></tr>'
    html += '<tr>';
    html += `<td rowspan="${totalSubtasks}" style="padding: 10px; max-width: 500px; margin: 10px auto; border: 1px solid black; border-collapse: collapse;">${data.day}</td>`;
    
    data.tasks.forEach((task, taskIndex) => {
        if (taskIndex > 0) {
            html += '<tr>';
        }
        html += `<td rowspan="${task.subtasks.length}" style="padding: 10px; max-width: 500px; margin: 10px auto; border: 1px solid black; border-collapse: collapse;">${task.project}</td>`;
        task.subtasks.forEach((subtask, subtaskIndex) => {
            if (subtaskIndex > 0) {
                html += '<tr>';
            }
            html += `<td style="padding: 10px; max-width: 500px; margin: 10px auto; border: 1px solid black; border-collapse: collapse;">${subtask}</td></tr>`;
        });
    });

    table.innerHTML = html;
}

function generateEmailSubject(){
    let date = Date().date
    const fullDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const fullDate = fullDateFormatter.format(date);

    const emailSubject = document.getElementById("email-subject")
    let generatedSubject = `EOD Accomplishment Report | Your Name Here | ${fullDate}`
    emailSubject.innerHTML = generatedSubject
}

function copyEmailSubject(){
    const emailSubjectHeader = document.getElementById("email-subject")
    navigator.clipboard.writeText(emailSubjectHeader.innerText)
    showNotification()
    return
}

function copyGeneratedTable(){
    const generatedTableHTML = document.getElementById("generated-table").outerHTML
    navigator.clipboard.write([
        new ClipboardItem({
            "text/html": new Blob([generatedTableHTML], { type: "text/html" }),
            "text/plain": new Blob([generatedTableHTML], { type: "text/plain" })
        })
    ])
    showNotification()
    return
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.className = "show";
    setTimeout(() => {
        notification.className = notification.className.replace("show", "");
    }, 1250);
}