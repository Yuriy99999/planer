import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];
  selected: Category;

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit() {
    //this.categories = this.dataHandlerService.getCategories();
    //console.log(this.categories);
  }

 /* getTasksByCategory(category: Category) {
    this.dataHandlerService.getTasks().filter(task => task.category === category);
  }

  showTasksByCategory(category: Category) {
    this.selected = category;
    this.dataHandlerService.fetchTasksByCategory(category);
  }*/

}
