// <-- Инициализируем статичные кнопки и контейнер для всех записей -->
const button_add = document.querySelector('#todo_button_add');
const div = document.querySelector('.box');
const button_save = document.querySelector('#todo_button_save');

// <-- Создаём счётчик на замыкании для генерации id -->
const createIDFunction = (arg) =>{
    let current = 0;
    return function () {
        current++
        return String(current) + arg;
    }
}

// <-- Создаём функции для генерации id по переданному аргументу -->
const createIdButton = createIDFunction('button')
const createIdDiv = createIDFunction('div')
const createIdCheck = createIDFunction('check')

// <-- Основное слушание кнопки "Add" -->
button_add.addEventListener('click',()=>{

// <-- Генерация id для данного запроса -->
    const buttonId = createIdButton();
    const divId = createIdDiv();
    const checkId = createIdCheck();

// <-- Считывание данных с инпутов -->
    let value = document.querySelector('#todo_input').value;
    const valueName = document.querySelector('#todo_input_name').value!='' ? document.querySelector('#todo_input_name').value : 'Неизвестный пользователь' ;

// <-- Проверка на заполненность инпута -->
    if(value!=='' ){
    value = `${valueName}: ${value}`;

    div.insertAdjacentHTML('beforeend', `
        <div class = 'under_input' id=${divId} >
            <div class="check none" id = ${checkId} ></div>
            <div class="under_input_text">
                ${value} 
            </div>
            <button class = "todo_button todo_button_del" id=${buttonId}>delete</button>
        </div>
    `)
    // <-- Инициализация кнопки "Delete" и навешивание слушателея -->
    const button_delete = document.getElementById(buttonId);
    button_delete.addEventListener('click', ()=>{
        const divDelete = document.getElementById(divId)
        divDelete.remove();
    })
    // <-- Инициализация кнопки для отметки статуса выполнения -->
    const check = document.getElementById(checkId);
    check.addEventListener('click',(item)=>{
        id = item.target.id;
        const currentItem = document.getElementById(id);
        currentItem.classList.toggle("none");
        currentItem.classList.toggle("clicked");
    })
    }
})

// <-- Слушатель на кнопку "Save"
button_save.addEventListener('click',()=>{
    obj = {
        todoTask: []
    }

    const arrayNodes = document.querySelectorAll('.under_input')
    arrayNodes.forEach((item)=>{
        tempObj = new Object();
        const text = item.childNodes[3].innerText.split(':').map(item=>{return item.replace(/ /g,'')})
        tempObj.name = text[0];
        tempObj.text = text[1];
        const flag = item.childNodes[1].classList.contains('clicked');
        tempObj.check = flag;
        obj.todoTask.push(tempObj);
    })

    console.log(JSON.stringify(obj))
})