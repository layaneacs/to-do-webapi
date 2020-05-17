using System.Collections.Generic;
using System;
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

        public List<TodoItem> GetTodoItems()
        {
            return _context.TodoItems.ToList();
        }
    }
}