let $inputNewTask = document.querySelector('#inputNewTask')
let $addTaskBtn = document.querySelector('#addTaskBtn')
let $allTasks = document.querySelector('#allTasks')


function Tasks (taskValue) {
    this.taskValue = taskValue
    this.checked = false
}

// create new task and put it to storage
function createElement (taskText, taskObj) {
    let newTaskBody = document.createElement('div')
    newTaskBody.setAttribute('class', 'body__tasks')
    newTaskBody.setAttribute('id', putId())
    newTaskBody.setAttribute('onClick', 'checkId(this)')
    let elementId = newTaskBody.getAttribute('id')

    localStorage.setItem(elementId, JSON.stringify(taskObj))

    let newTaskCheck = document.createElement('input')
    newTaskCheck.type = 'checkbox'
    newTaskCheck.setAttribute('class', 'task__check')
    newTaskCheck.setAttribute('onClick', 'checkBox(this)')

    let newTaskText = document.createElement('div')
    newTaskText.setAttribute('class', 'task__text')
    newTaskText.innerHTML = taskText

    let newTaskDeleteBtn = document.createElement('button')
    newTaskDeleteBtn.setAttribute('class', 'delete__task')
    newTaskDeleteBtn.innerHTML = 'X'

    $allTasks.appendChild(newTaskBody)
    newTaskBody.appendChild(newTaskCheck)
    newTaskBody.appendChild(newTaskText)
    newTaskBody.appendChild(newTaskDeleteBtn)
}

function saveTask (inputInfo) {
    let task = inputInfo.value
    let newTask = new Tasks(task)
    
    console.log(newTask)
    return newTask
}

//make id for task and add it (need for saving and getting infrmatin from storage)
function putId () {
    let id = Math.round(Math.random() * 10000)
    

    if (localStorage.getItem !== id) {
        return id
    } else {
        id = Math.round(Math.random() * 10000)
        return id
    }
}

function checkId(elem) {
    let getId = elem.parentNode.id
    
    return getId
}

//adding new task t the page
$addTaskBtn.addEventListener('click', () => {
    let taskInfo = saveTask($inputNewTask)
    let taskText = taskInfo.taskValue
    
    createElement (taskText, taskInfo)
})


function checkBox (element) {
    let isChecked;

    if (element.checked) {
        isChecked = true
    } else {
        isChecked = false
    }

    return isChecked
}

//changhing informatin about task check in storage
function changeTaskCheck (id, check) {
    let getTaskFromStorage = JSON.parse(localStorage.getItem(id))
    if ( check == true) {
        getTaskFromStorage.checked = true
        localStorage.setItem(id, JSON.stringify(getTaskFromStorage))
        console.log(getTaskFromStorage)
        return
    } else {
        getTaskFromStorage.checked = false
        localStorage.setItem(id, JSON.stringify(getTaskFromStorage))
        console.log(getTaskFromStorage)
        return
    }

    
}

//operatin with changin check info of elemetn
$allTasks.addEventListener('click', e => {
    let target = e.target
    let isChecked = checkBox(target)
    let getId = checkId(e.target)

    changeTaskCheck(getId, isChecked)
    console.log(isChecked)
    console.log(getId)
})


//getting infrmation from storage and load it on the page
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        let getElementId = keys[i]
        let getElement = localStorage.getItem(keys[i])
        let elementFromStorage = {}
        elementFromStorage[getElementId] = getElement
        values.push(elementFromStorage)
    }

    return values;
}

function createElementsOnLoad (taskText, id, check) {
    let newTaskBody = document.createElement('div')
    newTaskBody.setAttribute('class', 'body__tasks')
    newTaskBody.setAttribute('id', putId())
    newTaskBody.setAttribute('onClick', 'checkId(this)')
    newTaskBody.setAttribute('id', id)

    let newTaskCheck = document.createElement('input')
    newTaskCheck.type = 'checkbox'
    if (check == true) {
        newTaskCheck.checked = true
    } else {
        newTaskCheck.checked = false
    }
    newTaskCheck.setAttribute('class', 'task__check')
    newTaskCheck.setAttribute('onClick', 'checkBox(this)')

    let newTaskText = document.createElement('div')
    newTaskText.setAttribute('class', 'task__text')
    newTaskText.innerHTML = taskText

    let newTaskDeleteBtn = document.createElement('button')
    newTaskDeleteBtn.setAttribute('class', 'delete__task')
    newTaskDeleteBtn.innerHTML = 'X'

    $allTasks.appendChild(newTaskBody)
    newTaskBody.appendChild(newTaskCheck)
    newTaskBody.appendChild(newTaskText)
    newTaskBody.appendChild(newTaskDeleteBtn)
}


function extractElementsFromStorage () {
    let elemetsFromStorage = allStorage()

    for (const [key, value] of Object.entries(elemetsFromStorage)) {
        let newElement = {key: value,}
        let extractElement = newElement.key

            for(let key in extractElement) {
                let id = key
                let value = JSON.parse(extractElement[key])
                let text = value.taskValue
                let checkOrNot = value.checked
                
                window.onload = createElementsOnLoad(text, id, checkOrNot)
            }
    }
}

extractElementsFromStorage ()


$allTasks.addEventListener('click', e => {
    deleteTask (e.target)
    
})


function deleteTask (element) {
    let getClass = element.className
    let classToCheck = 'delete__task'
    console.log(getClass)

    if (getClass === classToCheck) {
        let elemmentId = element.parentNode.id
        localStorage.removeItem(elemmentId)
        element.parentNode.remove();
    }
}


