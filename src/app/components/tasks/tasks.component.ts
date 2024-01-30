import { Component ,OnInit} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  
  tasks: Task[] = [];

  constructor(private taskService:TaskService,private uiService:UiService){}

  ngOnInit(): void {
     this.taskService
     .getTasks()
     .subscribe((tasks)=>this.tasks=tasks);
    }

  deleteTask(task:Task){
    this.taskService
    .deleteTask(task)
    .subscribe(
      ()=>(this.tasks = this.tasks.filter((t)=> t.id !== task.id)))
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder;
    // console.log(task);   
    this.taskService.updateTaskReminder(task).subscribe(); 
  }

  addTask(task:Task){
    console.log(task)
    this.taskService.addTask(task).subscribe((task)=>this.tasks.push(task))
  }

  editTask(task:Task){
    this.taskService.saveEditTask(task).subscribe(()=>{
      this.taskService.getTasks().subscribe(tasks=>{
          this.tasks = tasks;
      })
    })
    console.log('successs')
  }
}
