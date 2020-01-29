
import {Observable, of} from 'rxjs';
// @ts-ignore
import {TaskDAO} from '../interface/TaskDAO';
import {Task} from '../../model/Task';
import {Category} from '../../model/Category';
// @ts-ignore
import {Priority} from '../../model/Priority';
import {TestData} from '../../data/TestData';


export class TaskDAOArrayImpl implements TaskDAO {


  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }




  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return undefined;
  }





  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return undefined;
  }

  update(T): Observable<Task> {
    return undefined;
  }


}
