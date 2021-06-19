import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { PostsModel, PostsResponse } from './posts.model';
import { map } from 'rxjs/internal/operators/map';

const GET_ALL_POSTS = gql`
  query allPosts($term: String) {
    queryPost(
      order: { desc: datePublished }
      first: 5
      filter: { title: { anyofterms: $term } }
    ) {
      id
      title
      tags
      datePublished
      category {
        id
        name
      }
      author {
        username
        displayName
        avatarImg
      }
      commentsAggregate {
        count
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  getAllPostsResponse: Observable<PostsResponse>;

  constructor(private apollo: Apollo) {
    this.getAllPostsResponse = this.apollo
      .watchQuery<any>({
        query: GET_ALL_POSTS,
      })
      .valueChanges.pipe(
        map((res) => {
          return {
            loading: res.loading,
            posts: res.data.queryPost,
          };
        })
      );
  }

  postTitleSearch(term: string): Observable<PostsResponse> {
    return this.apollo
      .watchQuery<any>({
        query: GET_ALL_POSTS,
        variables: {
          term,
        },
      })
      .valueChanges.pipe(
        map((res) => {
          return {
            loading: res.loading,
            posts: res.data.queryPost,
          };
        })
      );
  }

  getPostById(postId: string): Observable<PostsModel> {
    return this.getAllPostsResponse.pipe(
      map((res) => res.posts.filter((item) => item.id === postId).pop())
    );
  }
}
