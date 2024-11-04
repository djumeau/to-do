const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const getToDos = () => {
    fetch(apiURL + "?_limit=5")
        .then(res => res.json())
        .then( (data) => {
            data.forEach((item) => {
                const div = document.createElement('div');
                div.appendChild(document.createTextNode(item.title));
                document.getElementById('todo-list').appendChild(div);
            });
        });
}

getToDos();