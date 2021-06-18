import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CategoriesResponse } from './categories.model';
import { map } from 'rxjs/operators';

const GET_CATEGORIES = gql`
  query allCategoreis {
    queryCategory {
      id
      name
      posts {
        id
        title
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  getCategoriesRes: Observable<CategoriesResponse>;

  constructor(private apollo: Apollo) {
    this.getCategoriesRes = this.apollo
      .watchQuery<any>({
        query: GET_CATEGORIES,
      })
      .valueChanges.pipe(
        map((res) => {
          return {
            loading: res.loading,
            categories: res.data.queryCategory,
          };
        })
      );
  }
}
