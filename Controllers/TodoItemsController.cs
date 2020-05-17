using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        public ActionResult<List<TodoItem>> GetTodoItems()
        {
           return _todoitem.GetTodoItems();
        }

        [HttpGet("{id}")]
        public ActionResult<TodoItem> GetTodoItemId(int id)
        {
            var item = _todoitem.GetTodoItemId(id);
            if(item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpPost]
        public ActionResult<TodoItem> CreateTodoItem(TodoItem item)
        {
            var todoitem = _todoitem.CreateTodoItem(item);
            return todoitem;
        }

        [HttpDelete("{id}")]
        public ActionResult<TodoItem> DeleteTodoItem(int id)
        {
            var todoitem = _todoitem.GetTodoItemId(id);

            if(todoitem == null)
            {
                return NotFound();
            }

            _todoitem.DeleteTodoItem(todoitem);
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<TodoItem> UpdateTodoItem(int id)
        {
            var todoitem = _todoitem.GetTodoItemId(id);

            if(todoitem == null)
            {
                return NotFound();
            }
            
            _todoitem.UpdateTodoItem(todoitem);
            return NoContent();
        }

        


    }
}