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

  addCategory(title:string):Observable<Category>{
    // @ts-ignore
    return this.categoryDaoArray.add(new Category(null, title));

  }

  searchCategories(title: string): Observable<Category[]> {
    return this.categoryDaoArray.search(title);
  }
  // статистика

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedTotalCount(): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(null);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getUncompletedCountInCategory(category);
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return this.taskDaoArray.getTotalCountInCategory(category);
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }



  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.add(priority);
  }

  deletePriority(id: number): Observable<Priority> {
    return this.priorityDaoArray.delete(id);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.update(priority);
  }

}
