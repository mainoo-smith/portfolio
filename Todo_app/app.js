const addForm = document.querySelector('.add');

const list = document.querySelector('.todos')
const search = document.querySelector('.search input');

// Load Todos from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.map(todo => createTemplate(todo.text, todo.completed));
});

const createTemplate = (todo, isCompleted=false) =>{
    const completedClass = isCompleted ? 'completed' : "";
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${completedClass}">${todo}</span>
            <div class="actions">
                    <i class="far fa-check-circle mark-complete"></i>
                    <i class="far fa-trash-alt delete"></i>
                </div>
        </li>`;

    list.innerHTML += html;
}

addForm.addEventListener('submit', e =>{
    e.preventDefault();
    const todo = addForm.add.value.trim();

    if (todo.length){
        createTemplate(todo);
        addTodoToStorage(todo);
        addForm.reset();
    }

});

// delete todos
list.addEventListener('click', e => {
    debugger
    if(e.target.classList.contains('delete')){
        const itemToDelete = e.target.closest('li');
        const itemText = itemToDelete.querySelector('span').textContent.trim();
        itemToDelete.remove();
        removeFromStorage(itemText);
    }
});

// filter todos
const filterTodos = (term) => {
    Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
    .filter((todo)=> todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
    //  console.log(Array.from(list.children));
};


// Keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
    // console.log(lookup);
});

// Add to local storage
const addTodoToStorage = (todo) => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = storedTodos.filter(item => item !== todo);
    updatedTodos.push({text: todo, completed: false});
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

// Remove from local storage
const removeFromStorage = (todo) => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = storedTodos.filter(item => item.text !== todo);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

// Mark item as completed

list.addEventListener('click', e => {
    if(e.target.classList.contains('mark-complete')){
        debugger
        const todoItem = e.target.closest('li');
        const span = todoItem.querySelector('span');
        const itemText = span.textContent.trim();

        span.classList.toggle('completed');
        toggleCompletedInStorage(itemText, span.classList.contains('completed'));
    }
})

/**
 * Toggle state of todo item in local storage
 * @param todo
 * @param boolean: completed or not completed
 */

const toggleCompletedInStorage = (todo, isCompleted) => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = storedTodos.map(item => {
        if(item.text === todo){
            return {...item, completed: isCompleted}
        }
        return item
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));

}
// set timer on items
