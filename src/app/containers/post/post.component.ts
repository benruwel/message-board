import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostsModel } from '../../services/posts/posts.model';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post$: Observable<PostsModel>;
  constructor(private router: Router, private postsService: PostsService) {}

  ngOnInit(): void {
    this.post$ = this.postsService.getPostById(this.getPostId());
  }

  getPostId(): string {
    const urlSegs: string[] = this.router.url.split('/');
    return urlSegs.pop();
  }
}
