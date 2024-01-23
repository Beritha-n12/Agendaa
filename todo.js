document.addEventListener('DOMContentLoaded', function () {
    // Load todos from local storage on page load
    loadTodos();

    // Add event listener for adding new todo
    document.getElementById('submit').addEventListener('click', function () {
        addTodo();
    });

    // Add event listener for handling todo filters (e.g., All, Active, Completed)
    document.getElementById('all').addEventListener('click', function () {
        filterTodos('all');
    });

    document.getElementById('active').addEventListener('click', function () {
        filterTodos('active');
    });

    document.getElementById('completed').addEventListener('click', function () {
        filterTodos('completed');
    });

    document.getElementById('clear').addEventListener('click', function () {
        clearCompletedTodos();
    });

    // Function to load todos from local storage
    function loadTodos() {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        displayTodos(todos);
    }

    // Function to add a new todo
    function addTodo() {
        var inputElement = document.getElementById('input');
        var todoText = inputElement.value.trim();

        if (todoText !== '') {
            var todos = JSON.parse(localStorage.getItem('todos')) || [];
            var newTodo = {
                text: todoText,
                completed: false
            };

            todos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(todos));
            inputElement.value = '';

            displayTodos(todos);
        }
    }

    // Function to display todos
    function displayTodos(todos) {
        var todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';

        todos.forEach(function (todo, index) {
            var todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.checked = todo.completed;

            // Add event listener to toggle todo completion status
            checkbox.addEventListener('change', function () {
                toggleTodoStatus(index);
            });

            var todoText = document.createElement('p');
            todoText.classList.add('todo-text');
            todoText.textContent = todo.text;

            var deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';

            // Add event listener to delete a todo
            deleteButton.addEventListener('click', function () {
                deleteTodo(index);
            });

            var editButton = document.createElement('button');
            editButton.classList.add('edit');
            editButton.textContent = 'Edit';

            // Add event listener to edit a todo
            editButton.addEventListener('click', function () {
                editTodo(index);
            });

            // Append elements to todoItem
            todoItem.appendChild(checkbox);
            todoItem.appendChild(todoText);
            todoItem.appendChild(deleteButton);
            todoItem.appendChild(editButton);

            // Append todoItem to todosContainer
            todosContainer.appendChild(todoItem);
        });
    }

    // Function to toggle todo completion status
    function toggleTodoStatus(index) {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    // Function to delete a todo
    function deleteTodo(index) {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        loadTodos();
    }

    // Function to edit a todo
    function editTodo(index) {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        var updatedText = prompt('Edit Todo:', todos[index].text);

        if (updatedText !== null) {
            todos[index].text = updatedText;
            localStorage.setItem('todos', JSON.stringify(todos));
            loadTodos();
        }
    }

    // Function to filter todos based on status (All, Active, Completed)
    function filterTodos(status) {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        var filteredTodos = [];

        if (status === 'all') {
            filteredTodos = todos;
        } else if (status === 'active') {
            filteredTodos = todos.filter(function (todo) {
                return !todo.completed;
            });
        } else if (status === 'completed') {
            filteredTodos = todos.filter(function (todo) {
                return todo.completed;
            });
        }

        displayTodos(filteredTodos);
    }

    // Function to clear completed todos
    function clearCompletedTodos() {
        var todos = JSON.parse(localStorage.getItem('todos')) || [];
        var remainingTodos = todos.filter(function (todo) {
            return !todo.completed;
        });

        localStorage.setItem('todos', JSON.stringify(remainingTodos));
        loadTodos();
    }
});
