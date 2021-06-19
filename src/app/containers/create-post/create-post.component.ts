import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories/categories.service';
import { Observable } from 'rxjs';
import { CategoriesModel } from '../../services/categories/categories.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  categories$: Observable<CategoriesModel[]>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategoriesRes.pipe(
      map((res) => res.categories)
    );
  }
}
