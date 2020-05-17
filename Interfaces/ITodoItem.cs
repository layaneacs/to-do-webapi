using System.Collections.Generic;
using TodoApi.Models;

namespace TodoApi.Interfaces
{
    public interface ITodoItem
    {
         List<TodoItem> GetTodoItems();
    }
}