import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from 'src/app/model/task';
import {DataHandlerService} from '../../service/data-handler.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['color', 'id', 'name', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>; // контейнер - источник данных для таблицы

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  //@Input()
  private tasks: Task[];

  @Input('tasks')
  private set setTasks(tasks: Task[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks;
    this.refreshTable();
  }

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  deleteTask = new EventEmitter<Task>();


  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) { }

  ngOnInit() {
   // this.tasks = this.dataHandler.getTasks();
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);

    this.dataSource = new MatTableDataSource();

    this.refreshTable();

  }

  ngAfterViewInit(): void {

    this.addTableObjects();

  }


  private getPriorityColor(task: Task) {

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }

    return '#fff';

  }

  private refreshTable() {
    if (!this.dataSource){ return;}
    this.dataSource.data = this.tasks; // обновить источник данных (т.к. данные массива tasks обновились)

    this.addTableObjects();


    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (task, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.name : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }

        case 'name': {
          return task.name;
        }
      }
    };

  }

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator; // обновить компонент постраничности (кол-во записей, страниц)
  }

  private toConsole(task: Task){

  }

  /*onClickTask(task: any) {
    console.log(task);
  }*/

  onClickTask(task:Task){
    this.updateTask.emit(task);
  }



  openEditTaskDialog(task: Task) {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов

      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }

      if (result as Task) { // если нажали ОК и есть результат
        this.updateTask.emit(task);
        return;
      }

    });
  }
}
