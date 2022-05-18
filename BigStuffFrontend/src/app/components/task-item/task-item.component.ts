import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Task} from '../../Task';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDoneTask: EventEmitter<Task> = new EventEmitter;
  faCheck = faCheck;
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  onDone(task: Task) {
    this.onDoneTask.emit(task);
  }

  onToggle(task: Task) {
    this.onToggleReminder.emit(task);
  }

  parseDate(rawDate: string): Date {
    return new Date(rawDate);
  }
}
