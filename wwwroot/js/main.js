var api = "v1/TodoItems";

var inputTodo = document.querySelector("#todo");
var buttonTodo = document.querySelector("button");

var todos = document.querySelector(".tarefas");


function renderTodos(params) {
  todos.innerHTML = "";  

  for (var item = params.length - 1; item >= 0; item--) {
    var row = document.createElement("tr");
    
    var todo = document.createElement("td");
    var todoText = document.createTextNode(params[item].name);
    todo.setAttribute("class" , "tarefa")


    var status = document.createElement("td");
    
    if (params[item].isComplete == false){
        var statusText = document.createTextNode("pendente");
    }
    statusText = document.createTextNode("pendente")
    
    status.setAttribute("class", "status")


    var icon = document.createElement("td");
    var iconText = document.createTextNode("test pro icon");
    icon.setAttribute("class" , "icon-status")


    var edit = document.createElement("td");
    var editText = document.createTextNode("Editar");
    edit.setAttribute("class", "edit")


    var excluir = document.createElement("td");
    
    var excluirLink = document.createElement('a')
    var id = params[item].id;
    excluirLink.setAttribute("href", "#")
    excluirLink.setAttribute('onclick' , 'removeTodo('+ id +')')

    var excluirText = document.createTextNode("X");
    excluir.setAttribute("class" , "remove")
    
    

    todo.appendChild(todoText);
    row.appendChild(todo);

    status.appendChild(statusText);
    row.appendChild(status);

    icon.appendChild(iconText);
    row.appendChild(icon);

    edit.appendChild(editText);
    row.appendChild(edit);

    excluir.appendChild(excluirLink);
    excluirLink.appendChild(excluirText);
    row.appendChild(excluir);

    todos.appendChild(row);
  }
}


function getTodos() {
  axios
    .get(api)
    .then(function (response) {
      renderTodos(response.data);
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function (response) {
      console.log(response);
    });
}

function postTodo() {
  axios.post(api, {
      name: inputTodo.value.trim(),
      isComplete: false,
    })
    .then(function (response) {
      getTodos(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });

  inputTodo.value = "";
}

function removeTodo(idTodo) {
    axios.delete(api + '/' + idTodo)
    .then(function (response) {
        console.log(response)
        getTodos()
    })
    .catch(function(err) {
        console.log(err)
    })
}

buttonTodo.onclick = postTodo;

getTodos();
