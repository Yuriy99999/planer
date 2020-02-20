import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input()
  private categories: Category[];

  @Output()
  selectCategory = new EventEmitter<Category>();

  selectedCategory: Category;

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>()

  // добавили категорию
  @Output()
  addCategory = new EventEmitter<string>(); // передаем только название новой категории




  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    //this.dataHandlerService.getAllCategories().subscribe(categories => this.categories = categories);

    console.log(this.categories);

  }

  /*getTasksByCategory(category: Category) {
    this.dataHandlerService.getTasks().filter(task => task.category === category);
  }*/

  showTasksByCategory(category: Category) {

        // если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
        if (this.selectedCategory === category) {
            return;
        }

        this.selectedCategory = category; // сохраняем выбранную категорию

        // вызываем внешний обработчик и передаем туда выбранную категорию
        this.selectCategory.emit(this.selectedCategory);
  }

  // диалоговое окно для добавления категории
  private openAddDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {data: ['', 'Добавление категории', OperType.ADD], width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string); // вызываем внешний обработчик
      }
    });
  }

}
