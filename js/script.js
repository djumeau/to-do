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

    div.classList.add('todo');

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

    fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(newToDo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => addToDOM(data));
}

const toggleCompleted = (e) => {

    e.preventDefault();

    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
        updateToDo(e.target.dataset.id, e.target.classList.contains('done'));
    }
    
}

const updateToDo = (id, completed) => {
    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
        .then(res => res.json())
        .then((data) => console.log(data));
};

const init = () => {
    document.addEventListener('DOMContentLoaded', getToDos);

    document.querySelector('#todo-form').addEventListener('submit', createToDo);

    document.querySelector('#todo-list').addEventListener('click', toggleCompleted);
}

init();