import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/Category';
import {EditCategoryDialogComponent} from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import {MatDialog} from '@angular/material';

// @ts-ignore
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  @Input()
  categories: Category[];

  // выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>();

  // удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>();

  // изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>();

// добавили категорию
  @Output()
  addCategory = new EventEmitter<string>(); // передаем только название новой категории

  // поиск категории
  @Output()
  searchCategory = new EventEmitter<string>(); // передаем строку для поиска

  @Input()
  selectedCategory: Category;



  // категории с кол-вом активных задач для каждой из них


  // коллекция категорий с кол-вом незавершенных задач для каждой из них
  private categoryMap = new Map<Category, number>();

  // категории с кол-вом активных задач для каждой из них
  selectedCategoryMap: Map<Category, number>;
  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>) {
    this.selectedCategoryMap = categoryMap;
  }

  // кол-во невыполненных задач всего
  @Input()
  uncompletedTotal: number;


  searchCategoryTitle: string;


  constructor(private dataHandler: DataHandlerService,
              private dialog: MatDialog) {}

  indexMouseMove: number;
  // метод вызывается автоматически после инициализации компонента

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);

  }

  showTasksByCategory(category: Category) {

    // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category; // сохраняем выбранную категорию

    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory);
  }


  // сохраняет индекс записи категории, над который в данный момент проходит мышка (и там отображается иконка редактирования)
  private showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

// диалоговое окно для редактирования категории
  private openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.name, 'Редактирование категории'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') { // нажали удалить

        this.deleteCategory.emit(category); // вызываем внешний обработчик

        return;
      }

      if (typeof (result) === 'string') { // нажали сохранить
        category.name = result as string;

        this.updateCategory.emit(category); // вызываем внешний обработчик
        return;
      }
    });
  }
// диалоговое окно для добавления категории

  private openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'Добавление категории'], width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // вызываем внешний обработчик
      }
    });
  }


  // поиск категории

  private search() {


    if (this.searchCategoryTitle == null ) {
      return;
    }

    this.searchCategory.emit(this.searchCategoryTitle);

  }
}
