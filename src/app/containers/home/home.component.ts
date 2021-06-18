import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { PostsService } from '../../services/posts/posts.service';
import { PostsModel } from '../../services/posts/posts.model';
import { CategoriesModel } from '../../services/categories/categories.model';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  postsLoading$: Observable<boolean>;
  posts$: Observable<PostsModel[]>;
  categories$: Observable<CategoriesModel[]>;

  filtersGroup = this.fb.group({
    categories: this.fb.control(['']),
    keywordSearch: this.fb.control(''),
  });

  subscriptions: Subscription[] = [];

  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.postsLoading$ = this.postsService.getAllPostsResponse.pipe(
      map((res) => res.loading)
    );
    this.categories$ = this.categoriesService.getCategoriesRes.pipe(
      map((res) => res.categories)
    );
    const searchSub: Subscription = this.filtersGroup
      .get('keywordSearch')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((res) => {
        if (res) {
          console.log('Tis getting logged');
          this.searchByTitle(res);
        }
      });
    this.subscriptions.push(searchSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  filterByCategory(value: any): void {
    const categoryId = value.target.value;
    this.posts$ = this.postsService.getAllPostsResponse.pipe(
      map((res) => res.posts.filter((item) => item.category.id === categoryId))
    );
  }

  searchByTitle(term: string): void {
    if (term) {
      this.posts$ = this.postsService
        .postTitleSearch(term)
        .pipe(map((res) => res.posts));
    }
  }

  clearFilters(): void {
    console.log('clear filters');
    this.filtersGroup.get('categories')?.setValue('');
    this.filtersGroup.get('keywordSearch')?.reset();
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.posts$ = this.postsService.getAllPostsResponse.pipe(
      map((res) => res.posts)
    );
  }
}
