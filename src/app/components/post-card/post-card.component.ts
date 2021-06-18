import { Component, Input, OnInit } from '@angular/core';
import { PostsModel } from '../../services/posts/posts.model';

@Component({
  selector: 'post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() item: PostsModel;

  constructor() {}

  ngOnInit(): void {}
}
