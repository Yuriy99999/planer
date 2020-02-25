import { Component } from '@angular/core';
import { Task } from './model/task';
import {Category} from './model/category';
import {DataHandlerService} from './service/data-handler.service';
import {Priority} from './model/priorioty';
import {zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planer';
  tasks: Task[];
  categories: Category[];
  private priorities: Priority[]; // все приоритеты
  private selectedCategory: Category = null;

  // поиск
  private searchTaskText = ''; // текущее значение для поиска задач

  // статистика
  private totalTasksCountInCategory: number;
  private completedCountInCategory: number;
  private uncompletedCountInCategory: number;
  private uncompletedTotalTasksCount: number;




  // фильтрация
  private priorityFilter: Priority;
  private statusFilter: boolean;
  private searchCategoryText: string;


  constructor(
    private dataHandler: DataHandlerService, // фасад для работы с данными
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
    this.onSelectCategory(null);
    this.updateTasksAndStat();
    //this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

  private onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.updateTasksAndStat();

  }

  openEditTaskDialog(task: Task) {
    console.log(task);
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
  }

  private onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });


  }

  // поиск задач
  private onSearchTasks(searchString: string) {
    this.searchTaskText = searchString;
    this.updateTasks();
  }

  // фильтрация задач по статусу (все, решенные, нерешенные)
  private onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status;
    this.updateTasks();
  }

  private updateTasks() {
    // @ts-ignore
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter

    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });

  }

  onFilterByPriority(priority: Priority) {
    this.priorityFilter = priority;
    this.updateTasks();
  }



  onUpdateTask(task: Task) {
    console.log(task.name);
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null
      ).subscribe(tasks => {
        this.tasks = tasks;
      });
    });
    this.updateTasksAndStat();

  }

  private onAddTask(task: Task) {

    this.dataHandler.addTask(task).subscribe(result => {

      this.updateTasksAndStat();

    });

  }

  // удаление категории
  private onDeleteCategory(category: Category) {
    // @ts-ignore
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null; // открываем категорию "Все"
      this.onSelectCategory(this.selectedCategory);
    });
    this.updateTasksAndStat();
  }

  // обновлении категории
  private onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory);
    });
  }

  // добавление категории
  private onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(() => this.updateCategories());
  }

  private updateCategories() {
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  // поиск категории
  private onSearchCategory(title: string) {

    this.searchCategoryText = title;

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories;
    });
  }


  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  private updateTasksAndStat() {

    this.updateTasks(); // обновить список задач

    // обновить переменные для статистики
    this.updateStat();

  }

  // обновить статистику
  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount())

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0];
        this.completedCountInCategory = array[1];
        this.uncompletedCountInCategory = array[2];
        this.uncompletedTotalTasksCount = array[3]; // нужно для категории Все
      });
  }
}

