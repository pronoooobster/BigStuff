import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  date!: Date;
  reminder: boolean = false;
  priority: number = 0;
  showAddTask: boolean = true;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.text) {
      alert("Please add a task!");
      return;
    }
    
    const newTask = {
      user_id: 0,
      task_name: this.text,
      deadline: this.date.toString(),
      reminder: this.reminder,
      priority: this.priority
    };

    this.onAddTask.emit(newTask);

    this.text = '';
    this.date = new Date(0);
    this.reminder = false;
    this.priority = 0;
  }
}
