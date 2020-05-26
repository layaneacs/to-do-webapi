var api = 'v1/TodoItems'

var inputTodo = document.querySelector('#todo')
var buttonTodo = document.querySelector('button')
var todos = document.querySelector('ul')

var todo = []

function renderTodos(params){
    todos.innerHTML = ""

    for(var item = params.length -1 ; item >= 0; item--){
        var todo = document.createElement('li')
        var todoText = document.createTextNode(params[item].name)
        

        todo.appendChild(todoText)
        todos.appendChild(todo)
    }
}

function getTodos(){
    
    axios.get(api)
        .then(function(response){
            renderTodos(response.data)
        })    
        .catch(function(err) {
            console.log(err)
        })
}

function postTodo(){
    axios.post(api ,{
        name: inputTodo.value,
        isComplete: false
    })
        .then(function(response){            
            getTodos(response.data)
        })
        .catch(function(err) {
            console.log(err)
        })    
}

buttonTodo.onclick = postTodo;

getTodos()