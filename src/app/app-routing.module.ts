import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { PostComponent } from './containers/post/post.component';
import { CreatePostComponent } from './containers/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/add', component: CreatePostComponent },
  { path: 'post/:id', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
