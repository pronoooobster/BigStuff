import { Injectable } from '@angular/core';
import {Task} from '../Task';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../User';
import { getAuth } from "firebase/auth";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://bigstuffapi.vercel.app/api';
  user?: User | null;

  constructor(private http: HttpClient, public auth: AuthService) {
    
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks?user_id=${ getAuth().currentUser?.uid }`);
  }

  removeTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${task.task_id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/tasks/${task.task_id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    task.user_id=getAuth().currentUser?.uid;
    return this.http.post<Task>(this.apiUrl + '/tasks', task, httpOptions);
  }
}
