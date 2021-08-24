// <-- Инициализируем статичные кнопки и контейнер для всех записей -->
const button_add = document.querySelector('#todo_button_add');
const div = document.querySelector('.box');
const button_save = document.querySelector('#todo_button_save');


// <-- Основное слушание кнопки "Add" -->
button_add.addEventListener('click', () => {


// <-- Считывание данных с инпутов -->
    let value = document.querySelector('#todo_input').value;
    const valueName = document.querySelector('#todo_input_name').value;

// <-- Проверка на заполненность инпута -->
    if (value !== '' && valueName !== '') {
        value = `${valueName}: ${value}`;

        div.insertAdjacentHTML('beforeend', `
        <div class = 'under_input'>
            <div class="check none"></div>
            <div class="under_input_text">${value}</div>
            <button class = "todo_button todo_button_del">delete</button>
        </div>
    `)
        // <-- Инициализация кнопки "Delete" и навешивание слушателея -->
        let button_delete = document.querySelectorAll('.todo_button_del');
        button_delete = button_delete[button_delete.length-1]
        button_delete.addEventListener('click', (item) => {
            item.path[1].remove()

        })

        // <-- Инициализация кнопки для отметки статуса выполнения -->
        let  check = document.querySelectorAll('.check');
        check = check[check.length-1]
        check.addEventListener('click', (item) => {
            item.target.classList.toggle("none");
            item.target.classList.toggle("clicked");
        })
    }
})

// <-- Слушатель на кнопку "Save"
button_save.addEventListener('click', () => {
    let obj = {
        todoTask: []
    }

    const arrayNodes = document.querySelectorAll('.under_input')
    arrayNodes.forEach((item) => {
        let tempObj = {};
        const text = item.childNodes[3].innerText.split(':').map(item => {
            return item.replace(': ', '')
        })
        console.log(text)
        tempObj.name = text[0];
        tempObj.text = text[1];
        tempObj.check = item.childNodes[1].classList.contains('clicked');
        obj.todoTask.push(tempObj);
    })

    console.log(JSON.stringify(obj))
})