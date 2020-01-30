
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



  getTaskByCategory(category: Category): Observable<Task[]> {
    return of(TestData.tasks.filter(task => task.category === category));
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

  // поиск задач по параметрам
  // если значение null - параметр не нужно учитывать при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {

    return of(this.searchTodos(category, searchText, status, priority));

  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;


    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }


    return allTasks; // отфильтрованный массив
  }

  update(T): Observable<Task> {
    return undefined;
  }


}
