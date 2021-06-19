export interface PostsModel {
  id: string;
  title: string;
  text: string;
  tags: string[];
  datePublished: Date | null;
  category: {
    id: string;
    name: string;
  };
  author: {
    username: string;
    displayName: string;
    avatarImg: string;
  };
  commentsAggregate: {
    count: number;
  };
}

export interface PostsResponse {
  loading: boolean;
  posts: PostsModel[];
}
