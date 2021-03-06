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
    
    if (params[item].isComplete === false){
        var statusText = document.createTextNode("pendente");
        var statusIcon = "fas fa-exclamation-circle icon-pend"
        
    } else {
        var statusText = document.createTextNode("completo")  
        var statusIcon = "fas fa-check-circle icon-comp"     
    }

    status.setAttribute("class", "status")


    var icon = document.createElement("td");     
    icon.setAttribute("class" , "icon-status");

    var iconTag = document.createElement("i")
    iconTag.setAttribute("class" , statusIcon);


    var id = params[item].id;
    

    var edit = document.createElement("td");
    
    var editLink = document.createElement("a");
    editLink.setAttribute("href" , "#")
    editLink.setAttribute("onclick", "editTodoId("+ id +")")

    

    var editText = document.createTextNode("Concluir");
    edit.setAttribute("class", "edit")


    var excluir = document.createElement("td");
    
    var excluirLink = document.createElement('a')    
    excluirLink.setAttribute("href", "#")
    excluirLink.setAttribute('onclick' , 'removeTodo('+ id +')')

    var excluirText = document.createTextNode("x");
    excluir.setAttribute("class" , "remove")
    
    

    todo.appendChild(todoText);
    row.appendChild(todo);

    status.appendChild(statusText);
    row.appendChild(status);

    icon.appendChild(iconTag);
    row.appendChild(icon);

    edit.appendChild(editLink);
    editLink.appendChild(editText);
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

function editTodoId(idTodo) {
  axios
    .get(api + '/' + idTodo)
    .then(function (response) {
      editTodo(response.data.name, idTodo)           
      
    })
    .catch(function (err) {
      console.log(err);
    })    
}

function editTodo(item, id){  
  axios
    .put(api, {
      Id: id,
      name: item,
      isComplete: true
    })
    .then(function (response) {   
      console.log(response)    
      getTodos();  
    })
    .catch(function (err) {
      console.log(err);
    }) 
}



buttonTodo.onclick = postTodo;



getTodos();
