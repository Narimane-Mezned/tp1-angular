import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';

interface TodoColumn {
  status: TodoStatus;
  title: string;
  cssClass: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [FormsModule],
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);

  protected readonly columns: TodoColumn[] = [
    { status: 'waiting', title: 'Waiting', cssClass: 'alert-secondary' },
    {
      status: 'in progress',
      title: 'In Progress Todos',
      cssClass: 'alert-warning',
    },
    { status: 'done', title: 'Done Todos', cssClass: 'alert-success' },
  ];

  protected readonly todosByStatus = this.todoService.todosByStatus;
  protected readonly name = signal('');
  protected readonly content = signal('');
  protected readonly canAdd = computed(
    () => this.name().trim() !== '' && this.content().trim() !== '',
  );

  protected addTodo(): void {
    this.todoService.addTodo(this.name().trim(), this.content().trim());
    this.name.set('');
    this.content.set('');
  }

  protected updateStatus(id: number, status: TodoStatus): void {
    this.todoService.updateStatus(id, status);
  }

  protected deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
