const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getToDos = () => {
    fetch(apiURL + "?_limit=5")
        .then(res => res.json())
        .then( data => {
            data.forEach( item => addToDOM(item) );
        });
}

const addToDOM = (item) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(item.title));

    div.setAttribute('data-id', item.id);

    if (item.completed) {
        div.classList.add('done');
    }

    document.getElementById('todo-list').appendChild(div);
}

const createToDo = (e) => {
    e.preventDefault();

    const newToDo = {
        'completed': false,
        'title': e.target.firstElementChild.value
    }
    
    console.log(newToDo);
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getToDos);

    document.querySelector('#todo-form').addEventListener('submit', createToDo);
}

init();