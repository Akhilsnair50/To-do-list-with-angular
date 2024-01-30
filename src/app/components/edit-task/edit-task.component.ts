import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Output() onUpdateTask:EventEmitter<Task> = new EventEmitter()
  @Output() closeEdit:EventEmitter<any> = new EventEmitter();

  @Input() taskToEdit:Task|null =null ;
  editForm!: FormGroup;

 
  constructor(private uiService:UiService ,private fb:FormBuilder){
  
  }


  ngOnInit(): void {
    
    this.taskToEdit = this.uiService.getEditTask();

    this.editForm = this.fb.group({
      text: [this.taskToEdit?.text || '',],
      day: [this.taskToEdit?.day || '',],
      reminder: [this.taskToEdit?.reminder || false,],
      });
  }

  onSubmit(){
    const updatedTask: Task = {
     id:this.taskToEdit?.id,
     ...this.editForm.value,
  };

  this.onUpdateTask.emit(updatedTask);

  this.closeEdit.emit(true)
  
  }

}
