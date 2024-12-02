const addForm = document.querySelector('.add');

const list = document.querySelector('.todos')
const search = document.querySelector('.search input');

// Load Todos from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todo => createTemplate(todo));
}

const createTemplate = todo =>{
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
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
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
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
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}
// set timer on items
