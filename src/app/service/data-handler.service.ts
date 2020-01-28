import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {TestData} from '../data/TestData';
import { Task } from '../model/task';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  taskSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  //taskSubject = new Subject<Task[]>();

  constructor() {
    this.fetchTasks();
  }
  getCategories(): Category[] {
    return TestData.categories;
  }

  fetchTasks(){
    this.taskSubject.next(TestData.tasks);
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }



  getTasksByCategory(category: Category): Task[] {
    const tasks = TestData.tasks.filter(task => task.category === category);
    console.log(tasks);
    return tasks;
  }

  fetchTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category);
    console.log(tasks);
    this.taskSubject.next(tasks);
  }





}
