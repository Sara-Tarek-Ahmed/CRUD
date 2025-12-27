import { Component, OnInit } from '@angular/core';
import { TaskService } from './task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.createTask({ title: this.newTaskTitle }).subscribe(() => {
        this.loadTasks();
        this.newTaskTitle = '';
      });
    }
  }

  toggleTask(task: any) {
    task.completed = !task.completed;
    this.taskService.updateTask(task._id, task).subscribe();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}
