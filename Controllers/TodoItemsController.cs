using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Interfaces;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class TodoItemsController : Controller
    {
        public ITodoItem _todoitem { get; set; }
        
        public TodoItemsController(ITodoItem todoitem)
        {
            _todoitem = todoitem;
        }

        [HttpGet]
        public List<TodoItem> GetTodoItems()
        {
           return _todoitem.GetTodoItems();
        }

        [HttpGet("{id}")]
        public TodoItem GetTodoItemId(int id)
        {
            var item = _todoitem.GetTodoItemId(id);
            if(item == null)
            {
                return NotFound();
            }
            return item;
        }


    }
}