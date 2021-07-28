import { NotificationsService } from './../../services/notifications/notifications.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TuiHostedDropdownComponent } from '@taiga-ui/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { MessagesModel } from '../../services/notifications/messages-model';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  @ViewChild(TuiHostedDropdownComponent)
  component?: TuiHostedDropdownComponent;
  readonly items = ['Edit', 'Download'];
  open = false;
  messages$: Observable<MessagesModel[]>;

  constructor(
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    // this.notificationService
    //   .checkAPI()
    //   .pipe(
    //     catchError((err) => {
    //       console.log('Http error', err);
    //       return throwError(err);
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    this.messages$ = this.notificationService.messages$;
  }

  onNotificationClick(): void {
    this.open = false;
    if (this.component && this.component.nativeFocusableElement) {
      this.component.nativeFocusableElement.focus();
    }
  }

  createPost(): void {
    this.router.navigate(['/post/add']);
  }
}
