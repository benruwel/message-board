import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createPost(): void {
    this.router.navigate(['/post/add']);
  }
}
