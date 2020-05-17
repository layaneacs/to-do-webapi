using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Interfaces;

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
        public List<ITodoItem> GetTodoItems()
        {
           return _todoitem.GetTodoItems();
        }



    }
}