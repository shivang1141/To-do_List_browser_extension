document.addEventListener("DOMContentLoaded", () => {
    updateTaskCounter();
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const clearCompletedBtn = document.getElementById("clear-completed");

    // Update the task counter after loading saved tasks
    updateTaskCounter();

    clearCompletedBtn.addEventListener("click", () => {
        clearCompletedTasks();
    });

    // Load saved tasks
    chrome.storage.sync.get("todos", ({ todos }) => {
        if (todos) {
            todos.forEach((todo) => {
                addTodoItem(todo.text, todo.completed);
            });
        }
    });

    // Add new task
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (task) {
            addTodoItem(task, false);
            saveTask({ text: task, completed: false });
            todoInput.value = "";
        }
    });

    // Add todo item to the list
    function addTodoItem(task, completed) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;

        const taskText = document.createElement("span");
        taskText.setAttribute("data-task-text", task);
        taskText.textContent = task;
        if (completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#2ecc71";
        }
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "#2ecc71";
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.color = "";
            }
            updateTask(task, checkbox.checked, updateTaskCounter);
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            listItem.remove();
            removeTask(task);
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }

    // Save task to Chrome storage
    function saveTask(task) {
        chrome.storage.sync.get("todos", ({ todos }) => {
            if (todos) {
                todos.push(task);
            } else {
                todos = [task];
            }
            chrome.storage.sync.set({ todos });
        });
    }

    // Update task in Chrome storage
    function updateTask(taskText, completed, callback) {
        chrome.storage.sync.get("todos", ({ todos }) => {
            if (todos) {
                const index = todos.findIndex((t) => t.text === taskText);
                if (index !== -1) {
                    todos[index].completed = completed;
                    chrome.storage.sync.set({ todos }, () => {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    });
                }
            }
        });
    }

    // Remove task from Chrome storage
    function removeTask(taskText) {
        chrome.storage.sync.get("todos", ({ todos }) => {
            if (todos) {
                todos = todos.filter((t) => t.text !== taskText);
                chrome.storage.sync.set({ todos });
            }
        });
        // Update the task counter after removing a task
        updateTaskCounter();
    }

    // Clear completed tasks
    function clearCompletedTasks() {
        chrome.storage.sync.get("todos", ({ todos }) => {
            if (todos) {
                // Filter out the completed tasks from todos
                const notCompletedTasks = todos.filter((t) => !t.completed);

                // Update Chrome storage with the not completed tasks
                chrome.storage.sync.set({ todos: notCompletedTasks });

                // Remove completed tasks from the DOM
                todos.forEach((task) => {
                    if (task.completed) {
                        const taskText = task.text;
                        const listItem = document.querySelector(`span[data-task-text="${taskText}"]`).parentNode;
                        listItem.remove();
                    }
                });
            }
        });
    }


    // Update the task counter
    function updateTaskCounter() {
        chrome.storage.sync.get("todos", ({ todos }) => {
            if (todos) {
                const activeTasks = todos.filter((task) => !task.completed);
                const taskCounter = document.getElementById("task-counter");
                taskCounter.textContent = `Active tasks: ${activeTasks.length}`;
            }
        });
    }

});
