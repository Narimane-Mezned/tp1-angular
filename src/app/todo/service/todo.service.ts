import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly todos = signal<Todo[]>([]);
  private nextId = 1;

  readonly todosByStatus = computed(() => {
    const groups: Record<TodoStatus, Todo[]> = {
      waiting: [],
      'in progress': [],
      done: [],
    };
    for (const todo of this.todos()) {
      groups[todo.status].push(todo);
    }
    return groups;
  });

  addTodo(name: string, content: string): void {
    const todo: Todo = { id: this.nextId++, name, content, status: 'waiting' };
    this.todos.update((todos) => [...todos, todo]);
  }

  updateStatus(id: number, status: TodoStatus): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
    );
  }

  deleteTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }
}
