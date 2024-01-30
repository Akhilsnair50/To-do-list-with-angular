import { Component ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Task } from 'src/app/Task';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit{
  
  @Input() task!:Task;
  @Output() onDeleteTask:EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder:EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask:EventEmitter<Task> = new EventEmitter();
  @Output() onEditSuccess:EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit;
  isEditing: boolean = false;
  editingTask: Task|null =null ;


  

  constructor(private uiService:UiService,private taskService:TaskService){

  }
  ngOnInit(): void {
  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task)
  }

  onToggle(task:Task){
    this.onToggleReminder.emit(task);
  }

  onEdit(task:Task){
    this.uiService.toggleEditTask(task)
    this.isEditing=!this.isEditing;
    this.editingTask = this.isEditing ? task:null
  
  }
  updateTask(task:Task){
    this.onEditSuccess.emit(task);
  }
   
  closeEdit(){
    this.isEditing=!this.isEditing;
  }

}
