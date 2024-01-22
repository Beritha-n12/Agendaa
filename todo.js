document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input");
    const submitBtn = document.getElementById("submit");
    const todosContainer = document.getElementById("todos");
    const allBtn = document.getElementById("all");
    const activeBtn = document.getElementById("active");
    const completedBtn = document.getElementById("completed");
    const clearBtn = document.getElementById("clear");

    submitBtn.addEventListener("click", addTodo);

    function addTodo() {
        const todoText = input.value.trim();
        if (todoText !== "") {
            const todoItem = createTodoItem(todoText);
            todosContainer.appendChild(todoItem);
            input.value = "";
        }
    }

    function createTodoItem(todoText) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        const todoTextElement = document.createElement("p");
        todoTextElement.classList.add("todo-text");
        todoTextElement.textContent = todoText;

        const deleteBtn = createButton("Delete", "delete", deleteTodo);
        const editBtn = createButton("Edit", "edit", editTodo);

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoTextElement);
        todoItem.appendChild(deleteBtn);
        todoItem.appendChild(editBtn);

        return todoItem;
    }

    function createButton(text, className, clickHandler) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add(className);
        button.addEventListener("click", clickHandler);
        return button;
    }

    function deleteTodo() {
        const todoItem = this.parentNode;
        todosContainer.removeChild(todoItem);
    }

    function editTodo() {
        const todoTextElement = this.parentNode.querySelector(".todo-text");
        const newText = prompt("Edit todo:", todoTextElement.textContent);
        if (newText !== null) {
            todoTextElement.textContent = newText.trim();
        }
    }

    allBtn.addEventListener("click", filterTodos);
    activeBtn.addEventListener("click", filterTodos);
    completedBtn.addEventListener("click", filterTodos);
    clearBtn.addEventListener("click", clearCompleted);

    function filterTodos() {
        const filterType = this.id;
        const todoItems = todosContainer.getElementsByClassName("todo-item");

        for (const item of todoItems) {
            const checkbox = item.querySelector(".checkbox");
            switch (filterType) {
                case "all":
                    item.style.display = "flex";
                    break;
                case "active":
                    item.style.display = checkbox.checked ? "none" : "flex";
                    break;
                case "completed":
                    item.style.display = checkbox.checked ? "flex" : "none";
                    break;
            }
        }
    }

    function clearCompleted() {
        const todoItems = todosContainer.getElementsByClassName("todo-item");

        for (const item of todoItems) {
            const checkbox = item.querySelector(".checkbox");
            if (checkbox.checked) {
                todosContainer.removeChild(item);
            }
        }
    }
});
