import {CommonDAO} from './common-dao';
import {Category} from '../../model/category';
import {Priority} from '../../model/priorioty';
import {Observable} from 'rxjs';
import { Task } from 'src/app/model/task';

export interface TaskDAO extends CommonDAO<Task> {
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;
  getCompletedCountInCategory(category: Category): Observable<number>;
  getUncompletedCountInCategory(category: Category): Observable<number>;
  getTotalCountInCategory(category: Category): Observable<number>;
  getTotalCount(): Observable<number>;
}
