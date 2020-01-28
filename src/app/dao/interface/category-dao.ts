import {CommonDAO} from './common-dao';
import {Category} from '../../model/category';
import {Observable} from 'rxjs';

export interface CategoryDAO extends CommonDAO<Category>{
  search(title: string): Observable<Category>;
}
