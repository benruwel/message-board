import { PostsModel } from '../posts/posts.model';

export interface CategoriesModel {
  id: string;
  name: string;
  posts: PostsModel;
}

export interface CategoriesResponse {
  loading: boolean;
  categories: CategoriesModel[];
}
