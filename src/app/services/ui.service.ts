import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
import { Task } from '../Task';
@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask:boolean =false;
  private subject = new Subject<any>();
  private editTask:Task|null =null  ;
  

  constructor() { }

  toggleAddTask():void{
    this.showAddTask =! this.showAddTask;
    this.subject.next(this.showAddTask);

  }

  onToggle():Observable<any>{
    return this.subject.asObservable();
  }


  toggleEditTask(task:Task):void{
    this.editTask =task;
    this.getEditTask();
    
  }
  

  setTask(task:Task){
    this.editTask = task; 
    console.log(this.editTask)
  }

  getEditTask():Task|null{
    // console.log(this.editTask)
    return this.editTask;
  }
  
}
