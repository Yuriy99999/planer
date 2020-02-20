import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {TestData} from '../data/TestData';
import { Task } from '../model/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';
import {CategoryDAOArrayImpl} from '../dao/impl/category-daoarray-impl';
import {Priority} from '../model/priorioty';
import {PriorityDAOArrayImpl} from '../dao/impl/priority-dao-array-impl';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

    //private taskDaoArray = new TaskDAOArrayImpl();
    //private categoryDaoArray = new CategoryDAOArrayImpl();


  private taskDaoArray = new TaskDAOArrayImpl();
  private categoryDaoArray = new CategoryDAOArrayImpl();
  private priorityDaoArray = new PriorityDAOArrayImpl();

  constructor() {
  }

    getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }

    getAllCategories(): Observable<Category[]> { //для select
    return this.categoryDaoArray.getAll();
   }

  // поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  getAllPriorities() {
    return this.priorityDaoArray.getAll();
  }

  deleteTask(id: number) {
    return this.taskDaoArray.delete(id);
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDaoArray.delete(id);
  }
}
