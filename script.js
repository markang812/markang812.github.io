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

function toggleOptionsVisibility(e){
    optionsContainer.classList.toggle("invisible")
    e.target.classList.toggle("clicked")
}

// loadData()

// modal scripts
const modal = document.getElementById("myModal")
const closeModalBtn = document.getElementById("close-modal-btn")

function openModal(){
    modal.style.display = "block";
    generateTable()
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

// // table generation scripts
// function generateTable() {
//     // Data to be populated in the table
//     const data = {
//         day: 'Monday',
//         tasks: [
//             {
//                 project: 'Envision EV',
//                 subtasks: ['Bug fix', 'Collect data']
//             },
//             {
//                 project: 'Envision Standard',
//                 subtasks: ['Refactor', 'Bug Fixes']
//             }
//         ]
//     };

//     // Create table element
//     const table = document.createElement('table');
    
//     // Create the header row
//     const headerRow = table.insertRow();
//     const headerCell = document.createElement('th');
//     headerCell.colSpan = 3;
//     headerCell.textContent = 'EOD REPORT';
//     headerRow.appendChild(headerCell);

//     // Create the first row with the day and the first project and its tasks
//     const firstRow = table.insertRow();
//     const dayCell = firstRow.insertCell();
//     dayCell.rowSpan = data.tasks.length;
//     dayCell.textContent = data.day;

//     const firstTask = data.tasks[0];
//     const projectCell = firstRow.insertCell();
//     projectCell.rowSpan = firstTask.subtasks.length;
//     projectCell.textContent = firstTask.project;

//     const firstSubtaskCell = firstRow.insertCell();
//     firstSubtaskCell.textContent = firstTask.subtasks[0];

//     // Insert remaining subtasks for the first project
//     for (let i = 1; i < firstTask.subtasks.length; i++) {
//         const row = table.insertRow();
//         const subtaskCell = row.insertCell();
//         subtaskCell.textContent = firstTask.subtasks[i];
//     }

//     // Insert rows for the remaining projects and their subtasks
//     for (let i = 1; i < data.tasks.length; i++) {
//         const task = data.tasks[i];
//         const projectRow = table.insertRow();
//         const projectCell = projectRow.insertCell();
//         projectCell.rowSpan = task.subtasks.length;
//         projectCell.textContent = task.project;

//         const subtaskCell = projectRow.insertCell();
//         subtaskCell.textContent = task.subtasks[0];

//         for (let j = 1; j < task.subtasks.length; j++) {
//             const row = table.insertRow();
//             const subtaskCell = row.insertCell();
//             subtaskCell.textContent = task.subtasks[j];
//         }
//     }

//     // Append the table to the container
//     document.getElementById('table-container').appendChild(table);
// }

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

        data.tasks.push(
            {
                project: element.value,
                subtasks: finishedTasks
            }
        )

    }   
    return data
}


function generateTable() {
    const data = collectTodoListData();
    const table = document.getElementById('generated-table');
    const totalSubtasks = data.tasks.reduce((sum, task) => sum + task.subtasks.length, 0);

    let html = '<tr><th colspan="3">EOD REPORT</th></tr>'
    html += '<tr>';
    html += `<td rowspan="${totalSubtasks}">${data.day}</td>`;
    
    data.tasks.forEach((task, taskIndex) => {
        if (taskIndex > 0) {
            html += '<tr>';
        }
        html += `<td rowspan="${task.subtasks.length}">${task.project}</td>`;
        task.subtasks.forEach((subtask, subtaskIndex) => {
            if (subtaskIndex > 0) {
                html += '<tr>';
            }
            html += `<td>${subtask}</td></tr>`;
        });
    });

    table.innerHTML = html;
}
