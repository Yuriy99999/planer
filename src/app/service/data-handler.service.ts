import { Injectable } from '@angular/core';
import {Category} from '../model/category';
import {TestData} from '../data/TestData';
import { Task } from '../model/task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDAOArrayImpl} from '../dao/impl/task-daoarray-impl';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

    private taskDaoArray = new TaskDAOArrayImpl();
   // private categoryDaoArray = new CategoryDAOArray();


  constructor() {
  }

    getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll();
  }
}
