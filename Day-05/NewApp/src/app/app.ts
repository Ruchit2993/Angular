import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('NewApp');
  name = 'Angular';
  count:number =0;
  handleIncrement(){
    this.count = this.count+1
  }
  handleDecrement(){
    this.count = this.count-1
  }
  handleReset(){
    this.count = 0;
  }
  name2 = "";
  displayName = ""; 
  getName(event:Event){
    this.name2 = (event.target as HTMLInputElement).value;
  }
  showName  (){
    this.displayName = this.name2;
  }
  setName(){
    this.displayName = "This is setName function";
    this.name2 = "This is setName function";
  } 
  email="";
  getEmail(val:string){
   console.log(val)
    this.email = val;
  }
  setEmail(){
    this.email = "This is setEmail function";
  }

  task="";
  taskList: {id:number, task:string}[] = []
  
  addTask(){
    this.taskList.push({id:this.taskList.length+1, task:this.task})
    console.log(this.taskList)
  }
  deleteTask(taskId:number){
    this.taskList =  this.taskList.filter(item => item.id !== taskId);
  }
}
