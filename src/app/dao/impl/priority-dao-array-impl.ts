import {PriorityDAO} from '../interface/priority-dao';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';

export class PriorityDaoArrayImpl implements PriorityDAO{
  add(T): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }
}
