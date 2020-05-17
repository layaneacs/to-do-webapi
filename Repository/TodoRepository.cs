using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using TodoApi.Interfaces;
using TodoApi.Models;

namespace TodoApi.Repository
{
    public class TodoRepository : ITodoItem
    {
        private readonly TodoContext _context;

        public TodoRepository(TodoContext context)
        {
            _context = context;
        }

        // GET api/todoitems
        public List<TodoItem> GetTodoItems()
        {
            return _context.TodoItems.ToList();
        }

        // GET api/todoitems/id
        public TodoItem GetTodoItemId(int id)
        {
            return _context.TodoItems.Where(item => item.Id == id).FirstOrDefault();        
 
        }
        
        // POST 
        public TodoItem CreateTodoItem(TodoItem item)
        {
            //_context.Set<TodoItem>().Add(item);
            _context.TodoItems.Add(item);
            _context.SaveChanges();
            return item;
        }

        // DELETE
        public void DeleteTodoItem(TodoItem item)
        {
            _context.TodoItems.Remove(item);
            _context.SaveChanges();
        }

        // PUT
        public void UpdateTodoItem(TodoItem item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}