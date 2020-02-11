import {PriorityDAO} from '../interface/priority-dao';
import {Observable, of} from 'rxjs';
import {Category} from '../../model/category';
import {Priority} from '../../model/priorioty';
import {TestData} from '../../data/TestData';


export class PriorityDAOArrayImpl implements PriorityDAO {
  add(T): Observable<Priority> {
    return undefined;
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(T): Observable<Priority> {
    return undefined;
  }



}

